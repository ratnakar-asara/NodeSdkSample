// Include the package from npm:
var hfc = require('hfc');
var util = require('util');
var fs = require('fs');

// Get the peer and member services addresses
var PEER_ADDRESS         = process.env.PEER_ADDRESS;
var MEMBERSRVC_ADDRESS   = process.env.MEMBERSRVC_ADDRESS;

// Create a client chain.
var chain = hfc.newChain("targetChain");

// Configure the KeyValStore which is used to store sensitive keys
// as so it is important to secure this storage.
// do a mkdir ~/tmp  (dont check if fails..just so it is there
chain.setKeyValStore(hfc.newFileKeyValStore('./keyValStore'));

chain.setMemberServicesUrl("grpc://" + MEMBERSRVC_ADDRESS);
var peer = chain.addPeer("grpc://" + PEER_ADDRESS);

var testChaincodeID;

// Enroll "admin" which is already registered because it is
// listed in fabric/membersrvc/membersrvc.yaml with it's one time password.
chain.enroll("admin", "Xurw3yU9zI0l", function(err, user1) {
    if (err) return console.log(util.format("ERROR: failed to register admin, Error : %j \n", err));
    // Set this user as the chain's registrar which is authorized to register other users.
    chain.setRegistrar(user1);

    console.log("\nEnrolled admin successfully\n");

    var userName = "JohnDoe";
        // registrationRequest
        var registrationRequest = {
            enrollmentID: userName,
            account: "bank_a",
            affiliation: "00001"
        };
        chain.registerAndEnroll(registrationRequest, function(err, user) {
            if (err) throw Error(" Failed to register and enroll " + userName + ": " + err);

            console.log("Enrolled %s successfully\n", userName);

            chain.setDeployWaitTime(60);
            chain.setInvokeWaitTime(10);
            deployChaincode(user);
        });
});

function deployChaincode(user) {
    console.log(util.format("Deploying chaincode ... It will take about %j seconds to deploy \n", chain.getDeployWaitTime()))
        // Construct the deploy request
    var deployRequest = {
        chaincodePath: "chaincode_example02",
        // Function to trigger
        fcn: "init",
        // Arguments to the initializing function
        args: ["a", "100", "b", "200"]
    };

    // Trigger the deploy transaction
    var deployTx = user.deploy(deployRequest);

    // Print the deploy results
    deployTx.on('complete', function(results) {
        // Deploy request completed successfully
        testChaincodeID = results.chaincodeID;
        console.log(util.format("[ Chaincode ID : ", testChaincodeID+" ]\n"));
        console.log(util.format("Successfully deployed chaincode: request=%j, response=%j \n", deployRequest, results));

        invokeOnUser(user);
    });
    deployTx.on('error', function(err) {
        // Deploy request failed
        console.log(util.format("Failed to deploy chaincode: request=%j, error=%j \n", deployRequest, err));
    });
}

function invokeOnUser(user) {
    // Construct the invoke request
    var invokeRequest = {
        // Name (hash) required for invoke
        chaincodeID: testChaincodeID,
        // Function to trigger
        fcn: "invoke",
        // Parameters for the invoke function
        args: ["a", "b", "1"]
    };

    // Trigger the invoke transaction
    var invokeTx = user.invoke(invokeRequest);

    invokeTx.on('submitted', function(results) {
        // Invoke transaction submitted successfully
        console.log(util.format("submitted chaincode invoke transaction: request=%j, response=%j\n", invokeRequest, results));
    });
    invokeTx.on('complete', function(results) {
        // Invoke transaction completed?
        console.log(util.format("completed chaincode invoke transaction: request=%j, response=%j\n", invokeRequest, results));
        queryUser(user);
    });
    invokeTx.on('error', function(err) {
        // Invoke transaction submission failed
        console.log(util.format("Failed to submit chaincode invoke transaction: request=%j, error=%j\n", invokeRequest, err));
    });
}

function queryUser(user) {
    // Construct the query request
    var queryRequest = {
        // Name (hash) required for query
        chaincodeID: testChaincodeID,
        // Function to trigger
        fcn: "query",
        // Existing state variable to retrieve
        args: ["a"]
    };

    // Trigger the query transaction
    var queryTx = user.query(queryRequest);

    queryTx.on('complete', function(results) {
        // Query completed successfully
        console.log("Successfully queried  chaincode function: request=%j, value=%s \n", queryRequest, results.result.toString());
    });
    queryTx.on('error', function(err) {
        // Query failed
        console.log("Failed to query chaincode, function: request=%j, error=%j \n", queryRequest, err);
    });
}
