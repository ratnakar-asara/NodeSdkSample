# events-sample

## Step1 : 

`vagrant ssh`

## Step 2 :

```
cd /opt/gopath/src/github.com/hyperledger/fabric

git clone https://github.com/ratnakar-asara/NodeSdkSample.git

cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/events/src/eventsender

unzip vendor.zip 

rm vendor.zip

```

## Step 3: 

Start member service in one terminal and start a peer in another terminal with below commands  :

```
membersrvc

peer node start
```

##Step 4:
Start your node program 

```
cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/events

$ node events-sample.js
```
If everything goes right you should see the below output

```
$ node event-sample.js

Enrolled admin successfully

Enrolled JohnDoe successfully

Deploying chaincode ... It will take about 30 seconds to deploy 

[ Chaincode ID :  b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01 ]

Successfully deployed chaincode: request={"chaincodePath":"eventsender","fcn":"init","args":[]}, response={"uuid":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01"} 

completed chaincode invoke transaction: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"invoke","args":["hello","world"]}, response={"result":"Tx 6f1659d4-605d-4a4a-8d42-e39ddb9a977d complete"}

Custom event received, payload: "Event 0,hello,world"

Successfully queried  chaincode function: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"query","args":[]}, value={"NoEvents":"1"} 


```

Now one more here is the output:

```
$ node event-sample.js
completed chaincode invoke transaction: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"invoke","args":["hello","world"]}, response={"result":"Tx df82b7d5-a3f1-4b23-a94f-fc7c57485567 complete"}

Custom event received, payload: "Event 1,hello,world"

Successfully queried  chaincode function: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"query","args":[]}, value={"NoEvents":"2"}
```
