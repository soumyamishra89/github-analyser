import Octokit from '@octokit/rest';
import log from '../../utils/logging';
import utils from '../../utils/utils';
/**
 * This module provides services to fecth data from github repo 
 */

async function fetchGitHubRepoInfo(owner, repo, user) {
    log.info('fetchGitHubRepoInfo');
    const { id, access_token } = user;
    const octokit = Octokit({
        auth: access_token
    });

    try {
        const repoInfo = await octokit.repos.get({
            owner,
            repo
        });
        const commits = await octokit.repos.listCommits({
            owner,
            repo,
            per_page: 1
        });
        
        const pullRequests = await octokit.pulls.list({
            owner,
            repo,
            per_page: 1,
            state: 'open'
        });

        const readme = await octokit.repos.getReadme({
            owner,
            repo
        });

        // extractNumberOfPagesFromLink is used to find the number of commits and requests as the data is fetched 1 per page, 
        // hence total number of pages corresponds to total count
        return {
            owner,
            name: repo,
            url: repoInfo.data.html_url,
            openPullRequests: utils.extractNumberOfPagesFromLink(pullRequests.headers.link),
            commits: utils.extractNumberOfPagesFromLink(commits.headers.link),
            readme: readme.data.html_url,            
            requesterId: id,
        }
    } catch(err) {
        log.error(err);
        return {
            error: true,
            status: err.status,
            message: err.name
        };
    }
}

export default {
    fetchGitHubRepoInfo
}