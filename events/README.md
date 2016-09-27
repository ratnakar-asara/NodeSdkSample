# events-sample

## Step1 : 

`vagrant ssh`

## Step 2 :

```
cd /opt/gopath/src/github.com/hyperledger/fabric

git clone https://github.com/ratnakar-asara/NodeSdkSample.git

cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/events/src/eventsender

extract vendor.zip and **delete** vendor.zip

```

## Step 3: 
Change the **/etc/hosts** file by adding a new entry **events**

`sudo vi /etc/hosts`

```
127.0.0.1    localhost 			events
```

## Step 4: 

Start member service in one terminal and start a peer in another terminal with below commands  :

```
membersrvc

peer node start
```

##Step 5:
Start your node program 

```
cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/	events

$ node events-sample.js
```
If everything goes right you should see the below output

```
node event-sample.js 

Enrolled admin successfully

Enrolled JohnDoe successfully

Deploying chaincode ... It will take about 30 seconds to deploy 

[ Chaincode ID :  b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01 ]

Successfully deployed chaincode: request={"chaincodePath":"eventsender","fcn":"init","args":[]}, response={"uuid":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01"} 

completed chaincode invoke transaction: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"invoke","args":["hello","world"]}, response={"result":"Tx 07cb51b9-abf5-4bc6-b14d-c14d252072cd complete"}

Successfully queried  chaincode function: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"query","args":[]}, value={"NoEvents":"1"} 
```

Another run now is :

```
$ node event-sample.js 
completed chaincode invoke transaction: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"invoke","args":["hello","world"]}, response={"result":"Tx 24a52c0f-b1ce-4e11-a05a-cbfd6fd4a712 complete"}

Successfully queried  chaincode function: request={"chaincodeID":"b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01","fcn":"query","args":[]}, value={"NoEvents":"2"}
```
