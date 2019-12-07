import errorMessages from "../utils/errorMessages";
import githubservices from "../services/githubservices";
import githubReposService from "../services/dataservices/githubReposService";
/**
 * This module contains handlers for allowing users to access github data, persist them and read them.
 */

 /**
  * Handles the request to fetch github repository info using github apis and store it in local db.
  * @param {*} req 
  * @param {*} res 
  */
 export async function fetchAndStoreGithubRepoInfoHandler(req, res) {   
    const { owner, repo } = req.params;
    if (!owner || !repo) {
        res.status(403).json({
            error: errorMessages.invalidRequest
        });
        return;
    }

    const githubRepoInfo = await githubservices.fetchGitHubRepoInfo(owner, repo, req.user);
    // in case of error fetching information, return the error message
    if (githubRepoInfo.error) {
        res.status(githubRepoInfo.status || 403).json({
            error: githubRepoInfo.name || errorMessages.invalidRequest
        });        
    } else {        
        githubReposService.insertGithubRepo(githubRepoInfo);
        res.status(202).json({
            success: true
        });
    }
}

/**
  * Handles the request to read from the stored github repos.
  * @param {*} req 
  * @param {*} res 
  */
 export async function getGithubRepoInfoHandler(req, res) {   
    const { id } = req.user;
  
    const githubReposOfRequester = await githubReposService.findGithubReposByRequesterId(id);
    if (Array.isArray(githubReposOfRequester)) {
        // sort in reverse chronological order
        githubReposOfRequester.sort((gr1, gr2) => +gr2.requestedOn - +gr1.requestedOn);
    }
    res.status(202).json(githubReposOfRequester);
    
 }