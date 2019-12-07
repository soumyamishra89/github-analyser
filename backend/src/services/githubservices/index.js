import Octokit from '@octokit/rest';
import log from '../../utils/logging';
/**
 * This module provides services to fecth data from github repo 
 */

async function fetchGitHubRepoInfo(owner, repo, user) {
    log.info('fetchGitHubRepoInfo');
    const { id, access_token } = user;
    const octokit = Octokit({
        auth: access_token
    });
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

    return {
        url: repoInfo.data.html_url,
        openPullRequest: extractCountFromLink(pullRequests.headers.link),
        commits: extractCountFromLink(commits.headers.link),
        readme: readme.data.html_url
    }
}

/**
 * Extracts the count from the link. 
 * It extracts the total number of pages in a link which corresponds to the count as the data fetched per page is 1
 * @param {*} links 
 */
function extractCountFromLink(links) {
    const linksArray = links.split(',');
    const lastLink = linksArray.find(la => la.includes('rel="last"'));
    if (lastLink) {
        const pageMatches = lastLink.match(/&page=[0-9]+/g);
        if (pageMatches.length === 1 && pageMatches[0].includes('=')) {
            return pageMatches[0].split('=')[1];
        }
    }
    return 0;
}

export default {
    fetchGitHubRepoInfo
}