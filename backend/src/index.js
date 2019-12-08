import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import { configureRouters } from './router';
import log from './utils/logging';

function setupExpress() {
    // creating an express server with initial setup
    const app = express();
    // parses the request body whose content-type is json
    app.use(bodyParser.json());
    // sets the session for subsequent requests
    app.use(session({
        secret: process.env.SESSION_SECRET || 'dchashasacjcjo', 
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

    // serves the static frontend files
    const root = path.join(__dirname, 'web/')
    app.use(express.static(root))
    app.use(function(req, res, next) {
        if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('.')) {
            res.sendFile('index.html', { root })
        } else {
            next()
        }
    })  
    if (process.env.NODE_ENV !== 'test') {
        /** initialise server */
        const port = process.env.PORT || 8080; // port provided as env variable or 8080
        const server = app.listen(port, () => log.info(`Application started at port ${port}`));

        // listens on kill command to close the server
        process.on('SIGINT', () => {
            console.log('Received SIGINT. stopping server');
            server.close();
            process.exit();
        });
    }

    
    return app;
}

setupExpress();

export {
    setupExpress
}