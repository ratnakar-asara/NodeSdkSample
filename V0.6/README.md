# Fabric V0.6 based sample

## How to execute the sample program
## Step 0
As a pre-requisite install docker and docker-compose and create the network with docker-compose available.
Please Refer for [prerequisites](https://github.com/IBM-Blockchain/fabric-images#prerequisites) and [instructions](https://github.com/IBM-Blockchain/fabric-images#getting-started-and-using-docker-compose) for creating the Blockchain network

## Step 1 :

```
git clone https://github.com/ratnakar-asara/NodeSdkSample.git

cd NodeSdkSample

npm install hfc@0.6.5

cd NodeSdkSample/V0.6/src/chaincode_example02

unzip vendor.zip && rm vendor.zip
```


##Step 2:
Start your node program 

```
cd NodeSdkSample/V0.6

$ node hello-blockchain_V0_6.js
```
If everything goes right you should see the below output

```
Enrolled admin successfully

Enrolled JohnDoe successfully

Deploying chaincode ... It will take about "60" seconds to deploy 

[ Chaincode ID :  22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483 ]

Successfully deployed chaincode: request={"chaincodePath":"chaincode_example02","fcn":"init","args":["a","100","b","200"]}, response={"uuid":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483"} 

completed chaincode invoke transaction: request={"chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","fcn":"invoke","args":["a","b","10"]}, response={"result":"Tx 92d039de-ade4-4f1f-ace0-9376f4f32a7f complete"}

Successfully queried  chaincode function: request={"chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","fcn":"query","args":["a"]}, value=90 
```

Now run the program again for invokes/queries

```
$ node hello-blockchain_V0_6.js

Enrolled admin successfully

Enrolled JohnDoe successfully

completed chaincode invoke transaction: request={"chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","fcn":"invoke","args":["a","b","10"]}, response={"result":"Tx aa2b3ad1-dbc5-4dc7-8788-90b91ed69663 complete"}

Successfully queried  chaincode function: request={"chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","fcn":"query","args":["a"]}, value=80 
```

####NOTE:
* To clean the keyValStore and chaincodeID
 
    `node hello-blockchain_V0_6.js --clean [chaincode|all]`
  
 *  clean chaincodeID and deploy again
 
     `node hello-blockchain_V0_6.js --clean chaincode`
        
  * To clean chaincode and keyValStore values
 
       `node hello-blockchain_V0_6.js --clean all`
       
###TroubleShoot
* If you get query failure error as below.
Increase deploy wait time by changing the value of the property "*deployWaitTime*" in **config.json** 

```
Failed to query chaincode, function: request={"chaincodeID":"22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483","fcn":"query","args":["a"]}, error={"error":{"status":"FAILURE","msg":{"type":"Buffer","data":[69,114,114,111,114,58,70,97,105,108,101,100,32,116,111,32,108,97,117,110,99,104,32,99,104,97,105,110,99,111,100,101,32,115,112,101,99,40,67,111,117,108,100,32,110,111,116,32,103,101,116,32,100,101,112,108,111,121,109,101,110,116,32,116,114,97,110,115,97,99,116,105,111,110,32,102,111,114,32,50,50,102,53,56,51,102,54,50,102,50,52,102,50,51,99,52,97,98,51,48,99,55,99,101,52,54,51,99,51,101,55,100,48,54,50,55,54,101,53,56,99,55,52,99,53,97,101,52,99,97,55,53,54,57,48,102,56,56,101,50,52,56,51,32,45,32,76,101,100,103,101,114,69,114,114,111,114,32,45,32,82,101,115,111,117,114,99,101,78,111,116,70,111,117,110,100,58,32,108,101,100,103,101,114,58,32,114,101,115,111,117,114,99,101,32,110,111,116,32,102,111,117,110,100,41]}},"msg":"Error:Failed to launch chaincode spec(Could not get deployment transaction for 22f583f62f24f23c4ab30c7ce463c3e7d06276e58c74c5ae4ca75690f88e2483 - LedgerError - ResourceNotFound: ledger: resource not found)"}
```
