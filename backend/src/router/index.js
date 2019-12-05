import express from 'express';

const authRouter = express.Router();
const githubRouter = express.Router();

export function configureRouters(app) {
    app.use('/auth', authRouter);
    app.use('github', githubRouter);
}

/**
 * 
 * @param {*} route The api route to register. This would contain the endpoints for allowing users to authenticate/login to services
 * @param {*} method HTTP request method
 * @param  {...any} handlers the handlers that will process the request and return a response
 */
export function addHandlersToAuthRouter(route, method, ...handlers) {
    authRouter.route(route)[method.toLowerCase()](...handlers);
}

/**
 * 
 * @param {*} route The api route to register. This would contain the endpoints for allowing users to access github apis and process them
 * @param {*} method HTTP request method
 * @param  {...any} handlers the handlers that will process the request and return a response
 */
export function addHandlersToGithubRouter(route, method, ...handlers) {
    githubRouter.route(route)[method.toLowerCase()](...handlers);
}
