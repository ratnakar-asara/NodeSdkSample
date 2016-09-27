# tlasca sample

## Step1 : 

`vagrant ssh`

## Step 2 :

```
cd /opt/gopath/src/github.com/hyperledger/fabric

git clone https://github.com/ratnakar-asara/NodeSdkSample.git

cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample

npm install hfc@0.6.1

cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/tlsca/src/chaincode_example02

unzip vendor.zip  

rm vendor.zip

```

## Step 3: 
Modify **/etc/hosts** file by appending a new alias entry **tlsca** 

`sudo vi /etc/hosts`

```
127.0.0.1    localhost 			tlsca
```

## Step 4: 
Start member service in one terminal and a peer from another terminal with below commands  :

```
cd $GOPATH/src/github.com/hyperledger/fabric

make peer

make membersrvc

MEMBERSRVC_CA_SERVER_TLS_CERT_FILE=/var/hyperledger/production/.membersrvc/tlsca.cert MEMBERSRVC_CA_SERVER_TLS_KEY_FILE=/var/hyperledger/production/.membersrvc/tlsca.priv membersrvc

CORE_PEER_TLS_ENABLED=true CORE_PEER_TLS_CERT_FILE=/var/hyperledger/production/.membersrvc/tlsca.cert  CORE_PEER_TLS_KEY_FILE=/var/hyperledger/production/.membersrvc/tlsca.priv  CORE_PEER_TLS_SERVERHOSTOVERRIDE=tlsca CORE_PEER_PKI_TLS_ENABLED=true CORE_PEER_PKI_TLS_ROOTCERT_FILE=/var/hyperledger/production/.membersrvc/tlsca.cert CORE_PEER_PKI_TLS_SERVERHOSTOVERRIDE=tlsca peer node start
```

##Step 5:
Start your node program 

```
cd /opt/gopath/src/github.com/hyperledger/fabric/NodeSdkSample/tlsca

$ node tlsca_sample.js
```
If everything goes right you should see the below output

```
Enrolled admin successfully

Enrolled JohnDoe successfully

Deploying chaincode ... It will take about "60" seconds to deploy 

[ Chaincode ID :  827bdb5ad53bbc866565c77662abccfb5ddc815ef6ad61e4e6713f80be506f52 ]

Successfully deployed chaincode: request={"chaincodePath":"chaincode_example02","fcn":"init","args":["a","100","b","200"],"certificatePath":"/var/hyperledger/production/.membersrvc/tlsca.cert"}, response={"uuid":"827bdb5ad53bbc866565c77662abccfb5ddc815ef6ad61e4e6713f80be506f52","chaincodeID":"827bdb5ad53bbc866565c77662abccfb5ddc815ef6ad61e4e6713f80be506f52"} 

completed chaincode invoke transaction: request={"chaincodeID":"827bdb5ad53bbc866565c77662abccfb5ddc815ef6ad61e4e6713f80be506f52","fcn":"invoke","args":["a","b","10"]}, response={"result":"Tx 5f7b7960-bbf7-45f5-8ab1-e59b19305cc4 complete"}

Successfully queried  chaincode function: request={"chaincodeID":"827bdb5ad53bbc866565c77662abccfb5ddc815ef6ad61e4e6713f80be506f52","fcn":"query","args":["a"]}, value=90 
```
