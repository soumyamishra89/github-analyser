import { fetchAndStoreGithubRepoInfoHandler, getGithubRepoInfoHandler } from "../handlers/githubHandlers";
import mock from "../__mock__/mock";
import githubservices from "../services/githubservices";
import mockData from "../__mock__/mockData.json";
import githubRepos from "../models/githubRepos";

describe("Testing Github handlers", () => {
    beforeAll(() => {
        const fetchGitHubRepoInfoMock = jest.spyOn(githubservices, 'fetchGitHubRepoInfo');
        // mock data from github service
        fetchGitHubRepoInfoMock.mockImplementation((owner, repo) => {
            if (owner === 'facebook' && repo === 'react') {
                return {...mockData.githubInfo}
            } else {
                return {
                    error: true,
                    status: 404
                }
            }
        });
    });

    beforeEach(() => {
        // clears the database before each test
        githubRepos.removeAll();
    });

    it("Test fetchAndStoreGithubRepoInfoHandler success", async () => {
        const request = mock.mockRequest('', {owner: 'facebook', repo: 'react'});        

        const response = mock.mockResponse();
        await fetchAndStoreGithubRepoInfoHandler(request, response);
        expect(response.statusCode).toEqual(202);
    });

    it("Test fetchAndStoreGithubRepoInfoHandler error", async () => {
        const request = mock.mockRequest('', {owner: 'facebook', repo: 'reat'});        

        const response = mock.mockResponse();
        await fetchAndStoreGithubRepoInfoHandler(request, response);
        expect(response.statusCode).toEqual(404);
    });

    it("Test getGithubRepoInfoHandler success", async () => {
        let request = mock.mockRequest('', {owner: 'facebook', repo: 'react'});
        let response = mock.mockResponse();
        // fetch and store repo first before getting it.
        await fetchAndStoreGithubRepoInfoHandler(request, response);

        // create a new request and response mock;
        request = mock.mockRequest('', {}, {}, {user: {id: '2346'}});
        response = mock.mockResponse();
        await getGithubRepoInfoHandler(request, response);
        expect(response.statusCode).toEqual(200);
        expect(response.data).toHaveLength(1);
    });
})