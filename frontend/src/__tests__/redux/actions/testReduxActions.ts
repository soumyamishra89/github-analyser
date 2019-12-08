import { getLoggedStatusAction, getGithubReposAction, isGithubReposLoadingAction } from "../../../redux/actions";
import { ReduxActionType, LoggedStatus } from "../../../types";
import mockData from '../../../__mock__/mockData.json';

describe("Test redux action creators", () => {
    describe("getLoggedStatusAction", () => {
    
        it("getLoggedStatusAction Logged in", () => {
            const expectedAction = {
                type: ReduxActionType.LOGGED_STATUS,
                data: LoggedStatus.LOGGED_IN
            }
            expect(getLoggedStatusAction(LoggedStatus.LOGGED_IN)).toEqual(expectedAction);
        })

        it("getLoggedStatusAction Logged out", () => {
            const expectedAction = {
                type: ReduxActionType.LOGGED_STATUS,
                data: LoggedStatus.LOGGED_OUT
            }
            expect(getLoggedStatusAction(LoggedStatus.LOGGED_OUT)).toEqual(expectedAction);
        })
    });

    describe("getGithubReposAction", () => {
    
        it("getGithubReposAction With data", () => {
            const expectedAction = {
                type: ReduxActionType.GITHUB_REPO,
                data: mockData.githubInfo
            }
            expect(getGithubReposAction(mockData.githubInfo)).toEqual(expectedAction);
        })

        it("getGithubReposAction without data", () => {
            const expectedAction = {
                type: ReduxActionType.GITHUB_REPO,
                data:[]
            }
            expect(getGithubReposAction([])).toEqual(expectedAction);
        })
    });

    describe("isGithubReposLoadingAction", () => {
    
        it("isGithubReposLoadingAction loading", () => {
            const expectedAction = {
                type: ReduxActionType.LOADING_GITHUB_REPO,
                data: true
            }
            expect(isGithubReposLoadingAction(true)).toEqual(expectedAction);
        })

        it("isGithubReposLoadingAction not loading", () => {
            const expectedAction = {
                type: ReduxActionType.LOADING_GITHUB_REPO,
                data: false
            }
            expect(isGithubReposLoadingAction(false)).toEqual(expectedAction);
        })
    });
})