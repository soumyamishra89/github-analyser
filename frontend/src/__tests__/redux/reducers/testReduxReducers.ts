import reducers from '../../../redux/reducers';
import { ReduxActionType, LoggedStatus } from "../../../types";
import mockData from '../../../__mock__/mockData.json';

describe("Test redux reducers", () => {
    describe("loggedStatusReducer", () => {
    
        it("loggedStatusReducer Logged in", () => {
            const expectedReducer = {
                githubRepos: [],
                loggedStatus: LoggedStatus.LOGGED_IN,
                isGithubReposLoading: false
            }
            expect(reducers(undefined, {type: ReduxActionType.LOGGED_STATUS, data: LoggedStatus.LOGGED_IN})).toEqual(expectedReducer);
        })

        it("loggedStatusReducer Logged out", () => {
            const expectedReducer = {
                githubRepos: [],
                loggedStatus: LoggedStatus.LOGGED_OUT,
                isGithubReposLoading: false
            }
            expect(reducers(undefined, {type: ReduxActionType.LOGGED_STATUS, data: LoggedStatus.LOGGED_OUT})).toEqual(expectedReducer);
        })
    });

    describe("githubReposReducer", () => {
    
        it("githubReposReducer with data", () => {
            const expectedReducer = {
                githubRepos: mockData.githubInfo,
                loggedStatus: LoggedStatus.LOGGED_OUT,
                isGithubReposLoading: false
            }
            expect(reducers(undefined, {type: ReduxActionType.GITHUB_REPO, data: mockData.githubInfo})).toEqual(expectedReducer);
        })

        it("githubReposReducer without data", () => {
            const expectedReducer = {
                githubRepos: [],
                loggedStatus: LoggedStatus.LOGGED_OUT,
                isGithubReposLoading: false
            }
            expect(reducers(undefined, {type: ReduxActionType.GITHUB_REPO, data: undefined})).toEqual(expectedReducer);
        })
    });

    describe("isGithubReposLoadingReducer", () => {
    
        it("isGithubReposLoadingReducer loading", () => {
            const expectedReducer = {
                githubRepos: [],
                loggedStatus: LoggedStatus.LOGGED_OUT,
                isGithubReposLoading: true
            }
            expect(reducers(undefined, {type: ReduxActionType.LOADING_GITHUB_REPO, data: true})).toEqual(expectedReducer);
        })

        it("isGithubReposLoadingReducer not loading", () => {
            const expectedReducer = {
                githubRepos: [],
                loggedStatus: LoggedStatus.LOGGED_OUT,
                isGithubReposLoading: false
            }
            expect(reducers(undefined, {type: ReduxActionType.LOADING_GITHUB_REPO, data: false})).toEqual(expectedReducer);
        })
    });
})