import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { configureRouters } from './router';
import log from './utils/logging';

function setupExpress() {
    // creating an express server with initial setup
    const app = express();
    // parses the request body whose content-type is json
    app.use(bodyParser.json());
    // sets the session for subsequent requests
    app.use(session({
        secret: process.env.SESSION_SECRET, 
        resave: false,
        saveUninitialized: false
    }));
    /** Passport configure */
    const passport = require('./auth/passport').default;
    app.use(passport.initialize());
    app.use(passport.session());
    /** Router configure */
    configureRouters(app);
    require('./routes/authRoutes'); //configures the auth routes
    require('./routes/githubRoutes');
    /** initialise server */
    const port = process.env.PORT || 8080; // port provided as env variable or 8080
    app.listen(port, () => log.info(`Application started at port ${port}`))
}

setupExpress();