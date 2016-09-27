# NodeSdkSample

Sample programs to demonstrate basic NodeSdk Apis

## Fabric 0.5 based Hello world program 
###V0.5/hello-blockchain_V0_5.js
A sample program to demonstrate apis Enroll, enroll and register new user, Deploy , Invoke and Query (chaincode_example02)

* Install `hfc` with `npm install` command
  
  ```
  npm install hfc@0.5.x
  ```
  
  Current latest version is hfc@0.5.3
  
* Excute the program using the below command
  ```
  node hello-blockchain_V0_5.js
  ```

## Fabric 0.6 based Sample programs
###1. V0.6/hello-blockchain_V0_6.js
A sample program to demonstrate apis Enroll, enroll and register new user, Deploy , Invoke and Query (chaincode_example02)

* Install `hfc` with `npm install` command
  
  ```
  npm install hfc@0.6.x
  ```
  
  Current latest version is hfc@0.6.1
  
* Excute the program using the below command
  ```
  node hello-blockchain_V0_6.js
  ```

* To clean the keyValStore and chaincodeID
  ```
  node hello-blockchain_V0_6.js --clean [chaincode|all]
  
  To clean chaincode and start the deploy again
        node hello-blockchain_V0_6.js --clean chaincode 
  To clean chaincode and keyValStore values
        node hello-blockchain_V0_6.js --clean all 

  ```

###2. tlsca/tlsca_sample.js

A sample program with tlsca enabled on non-bluemix/Local network 

Follow the instructions mentioned [here](https://github.com/ratnakar-asara/NodeSdkSample/tree/master/tlsca)

###3. events/event-sample.js

A sample program to demonstrate **Custome events**

Follow the instructions mentioned [here](https://github.com/ratnakar-asara/NodeSdkSample/tree/master/events)


##NOTE: 
   * As a pre-requisite you must install **NodeJS**
   * You must have a `Fabric Network Setup` to start using the hfc apis

##Troubleshoot:
   * Change port numbers if you face issues while deploying chaincode
      
