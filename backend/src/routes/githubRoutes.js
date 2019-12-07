import { addHandlersToGithubRouter } from "../router";
import { fetchAndStoreGithubRepoInfoHandler, getGithubRepoInfoHandler } from "../handlers/githubHandlers";
import { verifyLoggedUser } from "../handlers/commonHandlers";

/**
 * This module maps the routes to the different handlers that will process the request 
 * and return a repsonse related to accessing github repos.
 */

addHandlersToGithubRouter('/info/:owner/:repo', 'post', verifyLoggedUser, fetchAndStoreGithubRepoInfoHandler);

addHandlersToGithubRouter('/repos', 'get', verifyLoggedUser, getGithubRepoInfoHandler);