import errorMessages from "../utils/errorMessages";
import githubservices from "../services/githubservices";
/**
 * This module contains handlers for allowing users to access github data, persist them and read them.
 */

 /**
  * Handles the request to fetch github repository info.
  * @param {*} req 
  * @param {*} res 
  */
 export function fetchGithubRepoInfoHandler(req, res) {   
    const { owner, repo } = req.params;
    if (!owner || !repo) {
        res.status(403).json({
            error: errorMessages.invalidRequest
        });
        return;
    }

    githubservices.fetchGitHubRepoInfo(owner, repo, req.user)
 }