import githubRepos from "../../models/githubRepos";
import log from "../../utils/logging";

/**
 * This module handles github repo related database queries
 */

async function insertGithubRepo(githubRepo) {
    log.info('insertGithubRepo');
    try {
        await githubRepos.insert(githubRepo);
        return true;
    } catch(err) {
        log.error(err);
        return false;
    }
}

async function findGithubReposByRequesterId(userId) {
    log.info('findGithubReposByRequesterId');
    let githubReposCollection = await githubRepos.findByRequesterId(userId);
    if (Array.isArray(githubReposCollection)) {
        githubReposCollection = githubReposCollection.map(grc => ({
            owner: grc.owner,
            name: grc.name,
            requesterId: grc.requesterId,
            url: grc.url,
            commits: grc.commits,
            openPullRequests: grc.openPullRequests,
            requestedOn: grc.requestedOn,
        }));
    }
    return githubReposCollection;
}

export default {
    insertGithubRepo,
    findGithubReposByRequesterId
}