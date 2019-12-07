import passport from '../auth/passport';
import { addHandlersToAuthRouter } from "../router";
import { githubCallbackHandler, loginstatusHandler } from "../handlers/authHandlers";

/**
 * This module maps the routes to the different handlers that will process the request and return a repsonse
 */

addHandlersToAuthRouter('/github-login', 'get', passport.authenticate('github'));

addHandlersToAuthRouter('/github-oauth-callback', 'get', passport.authenticate('github'), githubCallbackHandler);

addHandlersToAuthRouter('/login-status', 'head', loginstatusHandler);