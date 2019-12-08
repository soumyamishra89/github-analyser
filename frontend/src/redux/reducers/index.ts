import { combineReducers } from "redux";
import { LoggedStatus, ReduxAction, ReduxActionType, GithubRepo } from "../../types";

function loggedStatusReducer(state: LoggedStatus = LoggedStatus.LOGGED_OUT, action: ReduxAction) {
    switch(action.type) {
        case ReduxActionType.LOGGED_STATUS: return action.data;
        default: return state;
    }
}

function githubReposReducer(state: GithubRepo[] = [], action: ReduxAction) {
    switch(action.type) {
        case ReduxActionType.GITHUB_REPO: return action.data;
        default: return state;
    }
}

function isGithubReposLoadingReducer(state: boolean = false, action: ReduxAction) {
    switch(action.type) {
        case ReduxActionType.LOADING_GITHUB_REPO: return action.data;
        default: return state;
    }
}

export default combineReducers({
    githubRepos: githubReposReducer,
    loggedStatus: loggedStatusReducer,
    isGithubReposLoading: isGithubReposLoadingReducer
});
