import { LoggedStatus } from "../../types";
import { Dispatch } from "redux";
import { getGithubReposAction, getLoggedStatusAction, isGithubReposLoadingAction } from "../../redux/actions";

/**
 * This module provides remote api calls to the server
 */

const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
}

const serverUrl = ''
/**
 * Makes a remote call to fecth the login status of the user.
 * The session is stored as cookie
 */
function pingLoginStatus() {
    return async (dispatch: Dispatch) => {
        const resp = await fetch(serverUrl + '/auth/login-status', Object.assign({method: 'HEAD', defaultOptions}))
        let loggedStatus = LoggedStatus.LOGGED_OUT;
        if (resp.status === 200) {
            loggedStatus = LoggedStatus.LOGGED_IN
        }
        dispatch(getLoggedStatusAction(loggedStatus));       
    }
}

function loadGithubRepos() {
    return async (dispatch: Dispatch) => {
        dispatch(isGithubReposLoadingAction(true));
        const resp = await fetch(serverUrl + '/github/repos', defaultOptions);
        if (resp.status === 200) {
            dispatch(getGithubReposAction(await resp.json()));
        } else {
            alert('Fetching githup repos failed.');
        }
        dispatch(isGithubReposLoadingAction(false));
    }
}

/**
 * This api sends the owner and repo name to remote server for analysis
 */
function postGithubInfo(owner: string, reponame: string) {
    return fetch(serverUrl + `/github/info/${owner}/${reponame}`, Object.assign({method: 'POST', defaultOptions}));
}

export default {
    pingLoginStatus,
    loadGithubRepos,
    postGithubInfo
}