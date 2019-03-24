# Practitioner-Database-Server
This repository holds the MEFM Practitioner Database application. The server is a Google App Engine application. The client is a React application. 

## Build Prerequisites
1. Maven, version 3.0 or later 
2. Node.js
3. JDK 8+

## Building
For now building the complete application is a three step process:
1. Build the client by running the build-client.bat script 
2. Copy the build artifacts into the server webapp folder with install-client.bat. 
2. Run maven 

## Eclipse
1. Install Google Cloud Tools for Eclipse. Instructions at https://cloud.google.com/eclipse/docs/
2. Install Lombok. Instructions at https://projectlombok.org/setup/eclipse
