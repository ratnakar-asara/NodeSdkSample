# events-sample
### How to consume custom events from client application (Available from Fabric 0.6)

## It's a 4 step process

### 1. Listening to the right PORT
The event service is enabled at address "localhost:7053"
add the same in your chaincode where you can listen to the events though this port

```
chain.eventHubConnect("localhost:7053");
```

### 2. Get EventHub service
// Get the eventHub service associated the chain

`var eventHub = chain.getEventHub();`

### 3. Use EvenHub service to register to the chaincode and events
//Register on a specific chaincode for a specific events

`eventHub.registerChaincodeEvent(<chaincode ID/name>, <event-name>, <call-back> );`

```

ex: 
var registrationId = eh.registerChaincodeEvent("b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01", "evtsender", function(event) {
        console.log(util.format("Custom event received, payload: %j\n", event.payload.toString()));
});

```

### 4. Unregister chaincodeEvents and disconnect eventHub 
unregister events for chaincode "b16cec7aa4466f57dd18f3c159b85d2962e741824c702136fdfcf616addcec01"

`eventHub.unregisterChaincodeEvent(registrationId)`

And finally , Disconnect when you are done with listening to the events

```
process.on('exit', function() {
    chain.eventHubDisconnect();
});
```


## Now lets see how to execute the sample program provided here
## Step 0
Make sure you have the peer network and configured the same in config.json (change the port & IP accordingly)
Refer for [local-network-setup](https://github.com/hyperledger/fabric/blob/master/docs/Setup/Chaincode-setup.md#running-the-peer-and-ca-1)
## Step1 : 

`vagrant ssh`

## Step 2 :

```
cd /opt/gopath/src/github.com/hyperledger/fabric

git clone https://github.com/ratnakar-asara/NodeSdkSample.git

cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample

npm install hfc

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
