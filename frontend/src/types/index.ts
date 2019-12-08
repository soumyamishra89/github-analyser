export interface AppState {
    githubRepos: GithubRepo[],
    loggedStatus: LoggedStatus,
    isGithubReposLoading: boolean
}

export interface GithubRepo {
    owner: string,
    name: string,
    url: string,
    commits: number,
    openPullRequests: number,
    readme: string,
    requesterId: string, // id of the user who requested to fetch this data
    requestedOn: Date
}

export enum LoggedStatus {
    LOGGED_IN = 'LOGGEDIN',
    LOGGED_OUT = 'LOGGEDOUT'
}

export interface ReduxAction {
    type: ReduxActionType,
    data: any
}

export enum ReduxActionType {
    GITHUB_REPO = 'GITHUB_REPO',
    LOGGED_STATUS = 'LOGGED_STATUS',
    LOADING_GITHUB_REPO = 'LOADING_GITHUB_REPO'
}
