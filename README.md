# Github-analyser
https://github.com/soumyamishra89/github-analyser

A github repository analyser which takes in owner and repo name, and provides info about the repository. It works on public repositories only

# Prerequisites

  - NodeJS
  - npm (to install the packages for local run)
  - Docker (to run the built application)
  - github oauth app

# How to run
__1. Docker__ (http://localhost:8080)
 ```
 docker run -e CLIENTID= -e CLIENTSECRET= -p 8080:8080 ssmishra89/github-analyser
 ```
 
 __2. Docker compose__ 
 ```
 cd /github-analyser
 docker-compose up github-analyser
 ```
 client id and secret is provided in the docker-compose.yml as a secret file
 
 The default port is 8080. To change the port, it can be passed as environment variable like CLIENTID and CLIENTSECRET.
 e.g.PORT=8000

__3. Local setup:__
 - frontend (http://localhost:3000)
 - backend (http://localhost:8080)

```sh
 unzip github-analyser.zip 
 cd github-analyser
 npm install

 cd backend
 CLIENTID= CLIENTSECRET= npm start
 npm test (to run the tests)
 
 cd frontend
 npm start
 npm test (to run the tests)
 
```
A github oauth app is to be created from which clientID and client secret will be required to run the application.

# Package structure
## backend

 - _src/index.js_: entry file containing app server setup
 - _src/database_: folder containing database setup
 - _src/handlers_: contains the route handlers for the different end points
 - _src/models_: contains the data models with schema validation for users and github repos
 - _src/router_: sets up two router /auth and /github for authorisation and github apis.
 - _src/routes_: contains the mapping of routes to handler using the routers.
 - _src/services_: contains two services. database service for accessing the models and github service for fetching repository info using github rest api.
 - _src/utils_: contains util functions
 - _src/\__mock___: contains the mock data for tests
 - _src/\__tests___: contains the tests

## frontend
 - _src/pages_: contains a single page containing the table and login button
 - _src/components_: contains the react components used in the pages.
 - _src/redux_: contains all the redux related stuff, actions, reducer and store
 - _src/services_: contains module for remote api calls
 - _src/types_: contains typescript types for data 
 - _src/\__mock___: contains the mock data for tests
 - _src/\__tests___: contains the tests

# Design Decisions
 - Frontend is written in _typescript_ and backend in _javascript_. The create-react-app provides simple setup for typescript. Backend is written in javascript to avoid additional manual setup process.
 - babel is used to be able to write with ES6 features (import instead of require).
 - __LokiJS__ is used as an in-memory database as it provided simple setup (simply install and run). But __schm__ package was used to validate the data schema before persisting. This enables replacing LokiJS with MongoDb or other json based database. 
 - Two routers were created to separate auth and github routes. Auth routes provide end point for pinging the server e.g. login status,user login. Github routes provide end point for requesting repository info and summary snapshot from DB.
 - The client id and secret for github oauth app is passed as _environment variable_ to keep it a secret as setting it up locally is simple and can also be used on cloud infrastructure. 
 - __passportjs__ is used for authentication to github app since it provides an unified way of authenticating multiple oauth apps. It can be easily extended to use other oauth login. 
 - __cookies__ are used to identify user session. This way users need not login every time visiting to the same app. Also, additional step of storing the _access token_ on client and sending it wih each request is also not required. The backend server would store the user info in DB and each request can be mapped to the specific user from the cookie session id.
 - __datamodels__ are created with class wherease other services are simply used as modules. This was done to allow datamodels to inherit from a standard abstract model that provides uniform access methods to the database, whereas services are created as standalone modules.
# Limitation
 - The user can login with github account but as of now, logout option is not provided.
 - The app does not differentiate if the provided repository is invalid or private. All kinds of error are shown with similar message.
 - Uses multiple calls to fetch github repository info using githup rest api. Can be optimised.
 - The backend and frontend are served from same domain to avoid CORS issue. Additional setup would be required to make it work separately as standalone backend and frontend applications.
 -  In-memory database needs to be replaced with a persistent one so that data is not lost.