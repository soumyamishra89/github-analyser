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
    return githubRepos.findByRequesterId(userId);
}

export default {
    insertGithubRepo,
    findGithubReposByRequesterId
}