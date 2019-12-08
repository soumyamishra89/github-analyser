# Github-analyser

A github repository analyser which takes in owner and repo name, and provides info about the repository. It works on public repositories only

# Prerequisites

  - NodeJS
  - npm (to install the packages for local run)
  - Docker (to run the built application)
  - github oauth app

# How to run

 ## Local setup:
 ### frontend (http://localhost:3000)
 ### backend (http://localhost:8080)
After unzipping the file,
goto /github-analyser/frontend/pages/HomePage.tsx and replace href="/auth/github-login" with href="http://localhost:8080/auth/github-login" in line 22 to be able to run frontend and backend as separate servers for development purpose
```sh
 unzip github-analyser.zip 
 cd github-analyser
 npm install

 cd backend
 CLIENTID= CLIENTSECRET= npm start (CLIENTID and CLIENTSECRET from github oauth app is required)
 
 cd frontend
 npm start
```
A github oauth app is to be created which from which clientID and client secret will be required to run the application.

## run from docker (http://localhost:8080)
 ```
 docker run -e CLIENTID="" CLIENTSECRET="" -p 8080:8080 ssmishra89/github-analyser
 
 or 
 
 docker run --env-file ./env.list -p 8080:8080 ssmishra89/github-analyser
 
 or cd /github-analyser
 in docker-compose.yml provide the missing CLIENTID and CLIENT secret and run
 docker-compose up github-analyser
 ```
 where ./env.list file contains the CLIENTID and CLIENTSECRET
 The default port is 8080. The app will be available at http://localhost:8080.
 To change the port it can passed as environment variable like CLIENTID and CLIENTSECRET.
 e.g.PORT=8000

# Package structure
## backend

 - src/index.js: entry file containing app server setup
 - src/database: folder containing database setup
 - src/handlers: contains the route handlers for the different end points
 - src/models: contains the data models with schema validation for users and github repos
 - src/router: sets up two router /auth and /github for authorisation and github apis.
 - src/routes: contains the mapping of routes to handler using the routers.
 - src/services: contains two services. database service for accessing the models and github service for fetching repository info using github rest api.
 - src/utils: contains util functions

## frontend
 - src/pages: contains a single page containing the table and login button
 - src/redux: contains all the redux related stuff, actions, reducer and store
 - src/services: contains module for remote api calls
 - src/types: contains typescript types for data 

# Design Decisions and Assumptions
 - Frontend is written in typescript and backend in javascript. The create-react-app provides simple setup for typescript. Backend is written in javascript to avoid additional manual setup process.
 - babel is used to be able to write with ES6 features (import instead of require).
 - __LokiJS__ is used as an in memory database as it provided simple setup (simply install and run). But __schm__ package was used to validate the data schema before persisting. This enables replacing LokiJS with mongoDb or other json based database. 
 - Two routers were created to separate auth routes and github routes. Auth routes provided end point for pinging the server for login status and to allow user to login. github router porived end point for requesting repository info and summary snapshot from DB.
 - The client id and secret for github oauth app is passed as environment variable to keep it a secret. environment variables provides convenient way of hiding the secret. For local setup it provided an easy setup with nodejs. 
 - passportjs is used for authentication to github app since it provides an unified way of authenticating multiple oauth apps. It can be easily extended to use other login methodology. 
 - cookies are used to identify user session. This way users need not login every time visiting to the same app. Also, additional step of storing the access_token on client and sending it wih each request is also not required. The backend server would store the user info in DB and each request can be mapped to the specific user from the cookie session id.
 - datamodels are created with class wherease other services are simply used as modules. This was done to allow datamodels to inherit a standard abstract model helping in providing uniform access methods to the database. whereas services are created as standalone modules.
# Limitation
 - The user can login with github account but as of now, logout option is not provided.
 - The app does not differentiate if the provided repository is invalid or private. For both the cases it displays similar message to the user.
 - Uses multiple calls to fetch github repsoitory info using githup rest api. Can be optimised.
 - The backend and frontend are served from same domain to avoid CORS issue. Additionaly cookies are used for identifying user session. This prevents the app to be deployed separately as standalone backend and frontend applications. This will not help if a native mobile application is used as client application. The cookie based session needs to be replaced with bearer token to identify user action.