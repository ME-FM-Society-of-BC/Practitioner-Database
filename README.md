# Practitioner-Database-Server
This repository holds the MEFM Practitioner Database application. The technology stack comprises:
- Java REST server hosted on Google App Engine, backed by Google Datastore
- React/Redux front end

The code is organized as a Java maven project holding the Java REST server web application, with an additional client folder containing the React client application. Note that creating and bundling the client code is not performed by the maven build. Refer to the Building section for more details.  

## Background
This is a volunteer project undertaken by the contributors to assist the ME/FM Society of BC (https://www.mefm.bc.ca/). It provides a public forum for patients with Myalgic Encephalomyelitis (ME) and/or Fibromyalgia (FM) to share information. The current version is a non localized English application for use in Canadian provinces. 

## Building
Ensure that you have the following installed:

- Maven, version 3.0 or later 
- Node.js
- JDK 8+

For now, building the complete application is a three step process:
1. Build the client by running the build-client.bat script 
2. Copy the build artifacts into the server webapp folder with install-client.bat. 
2. Run maven 

## Running in Eclipse
1. Install Google Cloud Tools for Eclipse. Instructions at https://cloud.google.com/eclipse/docs/
2. Install Lombok. Instructions at https://projectlombok.org/setup/eclipse

