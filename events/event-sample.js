// Include the package from npm:
var hfc = require('hfc');
//var hfc = require('../../..');
var util = require('util');
var fs = require('fs');


var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));


// Create a client chain.
var chain = hfc.newChain(config.chainName);

// Configure the KeyValStore which is used to store sensitive keys
// as so it is important to secure this storage.
var keyValStorePath = __dirname + "/" + config.KeyValStore;
chain.setKeyValStore(hfc.newFileKeyValStore(keyValStorePath));
chain.setMemberServicesUrl(config.ca.ca_url);
for (var i = 0; i < config.peers.length; i++) {
    chain.addPeer(config.peers[i].peer_url);
}
chain.eventHubConnect(config.events.events_url);
process.env['GOPATH']= __dirname;
var ccPath = process.env['GOPATH'] + "/src/"+config.deployRequest.chaincodePath

process.on('exit', function() {
    chain.eventHubDisconnect();
});
var chaincodeIDPath = __dirname + "/chaincodeID";
var deployerName = config.users[1].username;
var testChaincodeID;
var deployer;
if (process.argv.length == 4) {
    if (process.argv[2] == "--clean") {
        if (process.argv[3] == "chaincode" && fs.existsSync(chaincodeIDPath)) {
            fs.unlinkSync(chaincodeIDPath);
            console.log("Deleted chaincode ID , Ready to deploy chaincode ");
        } else if (process.argv[3] == "all") {
            if (fs.existsSync(chaincodeIDPath)) {
                fs.unlinkSync(chaincodeIDPath);
                console.log("Deleted the chaincode ID ...");
            }
            try {
                deleteDir(keyValStorePath);
                console.log("Deleted crypto keys , Create new network and Deploy chaincode ... ");
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        console.log("Invalid arguments");
        console.log("USAGE: node event-sample.js --clean [chaincode|all]");
        process.exit();
    }
    console.log("USAGE: node event-sample.js");
    process.exit();
} else if (process.argv.length > 2) {
    console.log("Invalid arguments");
    console.log("USAGE: node event-sample.js [--clean [chaincode|all]]");
    process.exit(2)
}

init();

function init() {
    //Avoid enroll and deploy if chaincode already deployed
    if (!fileExists(chaincodeIDPath)) {
        registerAndEnrollUsers();
    } else {
        // Read chaincodeID and use this for sub sequent Invokes/Queries
        testChaincodeID = fs.readFileSync(chaincodeIDPath, 'utf8');
	chain.getUser(deployerName, function(err, member){
		if (err) throw Error(" Failed to register and enroll " + deployerName + ": " + err);
		deployer = member;
		invoke();
	});
    }
}

function registerAndEnrollUsers() {
    // Enroll "admin" which is already registered because it is
    // listed in fabric/membersrvc/membersrvc.yaml with it's one time password.
    chain.enroll(config.users[0].username, config.users[0].secret, function(err, admin) {
        if (err) throw Error(util.format("ERROR: failed to register %j, Error : %j \n", config.users[0].username, err));
        // Set this user as the chain's registrar which is authorized to register other users.
        chain.setRegistrar(admin);

        console.log("\nEnrolled %s successfully\n", config.users[0].username);

        // registrationRequest
        var registrationRequest = {
            enrollmentID: deployerName,
            affiliation: config.users[1].affiliation
        };
        chain.registerAndEnroll(registrationRequest, function(err, user) {
            if (err) throw Error(" Failed to register and enroll " + deployerName + ": " + err);
            deployer = user;
            console.log("Enrolled %s successfully\n", deployerName);
            //chain.setDeployWaitTime(config.deployWaitTime);
            deployChaincode();
        });
    });
}

function deployChaincode() {
    console.log(util.format("Deploying chaincode ... It will take about %j seconds to deploy \n", chain.getDeployWaitTime()))
    var args = getArgs(config.deployRequest);
    // Construct the deploy request
    var deployRequest = {
        chaincodePath: config.deployRequest.chaincodePath,
        // Function to trigger
        fcn: config.deployRequest.functionName,
        // Arguments to the initializing function
        args: args
    };

    // Trigger the deploy transaction
    var deployTx = deployer.deploy(deployRequest);

    // Print the deploy results
    deployTx.on('complete', function(results) {
        // Deploy request completed successfully
        testChaincodeID = results.chaincodeID;
        console.log(util.format("[ Chaincode ID : ", testChaincodeID + " ]\n"));
        console.log(util.format("Successfully deployed chaincode: request=%j, response=%j \n", deployRequest, results));
        fs.writeFileSync(chaincodeIDPath, testChaincodeID);

        invoke();
    });
    deployTx.on('error', function(err) {
        // Deploy request failed
        console.log(util.format("Failed to deploy chaincode: request=%j, error=%j \n", deployRequest, err));
    });
}

function invoke() {
    var args = getArgs(config.invokeRequest);
    var eh = chain.getEventHub();
    // Construct the invoke request
    var invokeRequest = {
        // Name (hash) required for invoke
        chaincodeID: testChaincodeID,
        // Function to trigger
        fcn: config.invokeRequest.functionName,
        // Parameters for the invoke function
        args: args
    };
    var regid = eh.registerChaincodeEvent(testChaincodeID, "custom-event", function(event) {
        console.log(util.format("Custom event received, payload: %j", event.payload.toString()));
        eh.unregisterChaincodeEvent(regid);
    });

    // Trigger the invoke transaction
    var invokeTx = deployer.invoke(invokeRequest);

    invokeTx.on('complete', function(results) {
        // Invoke transaction completed?
        console.log(util.format("completed chaincode invoke transaction: request=%j, response=%j\n", invokeRequest, results));
        query();
    });
    invokeTx.on('error', function(err) {
        // Invoke transaction submission failed
        console.log(util.format("Failed to submit chaincode invoke transaction: request=%j, error=%j\n", invokeRequest, err));
    });
}

function query() {
    var args = getArgs(config.queryRequest);
    // Construct the query request
    var queryRequest = {
        // Name (hash) required for query
        chaincodeID: testChaincodeID,
        // Function to trigger
        fcn: config.queryRequest.functionName,
        // Existing state variable to retrieve
        args: args
    };

    // Trigger the query transaction
    var queryTx = deployer.query(queryRequest);
    queryTx.on('complete', function(results) {
        // Query completed successfully
        console.log("Successfully queried  chaincode function: request=%j, value=%s \n", queryRequest, results.result.toString());
        process.exit();
    });
    queryTx.on('error', function(err) {
        // Query failed
        console.log("Failed to query chaincode, function: request=%j, error=%j \n", queryRequest, err);
    });
}

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function deleteDir(path) {
    try {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file, index) {
                fs.unlinkSync(path + "/" + file);
            });
            fs.rmdirSync(path);
        }
    } catch (err) {
        return err;
    }
};

function getArgs(request) {
    var args = [];
    for (var i = 0; i < request.args.length; i++) {
        args.push(request.args[i]);
    }
    return args;
}
