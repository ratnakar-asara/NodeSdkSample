# NodeSdkSample

A sample program to demonstrate few basic NodeSdk Apis

* enroll

```
var hfc = require('hfc');
var chain = hfc.newChain("chainTest");

chain.enroll("test_user0", "MS9qrN8hFjlE", cb); // *cb - callback function
```

* registerAndEnroll

```
        var registrationRequest = {
            enrollmentID: userName,
            account: "group1",
            affiliation: "00001"
        };
        chain.registerAndEnroll(registrationRequest, cb) ...
```

* deploy
```
    var deployRequest = {
        chaincodePath: "github.com/chaincode_example02/",
        // Function to trigger
        fcn: "init",
        // Arguments to the initializing function
        args: ["a", "100", "b", "200"]
    };

    // Trigger the deploy transaction
    var deployTx = user.deploy(deployRequest);
    deployTx.on('complete', cb);
    deployTx.on('error', cb);
```

* invoke
```
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

    invokeTx.on('complete',cb);
    invokeTx.on('error', cb);
```
* query

```
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
    queryTx.on('complete', cb);
    queryTx.on('error', cb);
```

* Install `hfc` with `npm install` command
  
  ```
  npm install hfc
  ```
  
  if you want to install specific version as below , hfc@0.5.0
  
  ```
  npm install hfc@0.5.0
  ```
  
* Excute the program using the below command
  ```
  node hello-blockchain.js
  ```

##NOTE: 
   * As a pre-requisite you must install **NodeJS**
   * You must have a `Fabric Network Setup` to start using the hfc apis

##Troubleshoot:
   * Change the port numbers if you face issues while deploying chaincode
      
