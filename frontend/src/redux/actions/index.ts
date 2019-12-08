import { LoggedStatus, ReduxAction, ReduxActionType, GithubRepo } from "../../types";

/**
 * This module provides the actions to be dispatched to redux store
 */


export function getLoggedStatusAction(loggedStatus: LoggedStatus): ReduxAction {
    return {
        type: ReduxActionType.LOGGED_STATUS,
        data: loggedStatus
    };
}

export function getGithubReposAction(githubRepos: GithubRepo[]): ReduxAction {
    return {
        type: ReduxActionType.GITHUB_REPO,
        data: githubRepos
    };
}

export function isGithubReposLoadingAction(isGithubReposLoading: boolean): ReduxAction {
    return {
        type: ReduxActionType.LOADING_GITHUB_REPO,
        data: isGithubReposLoading
    };
}