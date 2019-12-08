import githubservices from "../../services/githubservices";
import mockData from "../../__mock__/mockData.json";
import request from 'supertest';
import { setupExpress } from "../..";
import githubRepos from "../../models/githubRepos";

jest.mock("../../handlers/commonHandlers");
        
const app = setupExpress();
describe("Test github apis", () => {
    beforeAll(() => {
        const fetchGitHubRepoInfoMock = jest.spyOn(githubservices, 'fetchGitHubRepoInfo');
        // mock data from github service
        fetchGitHubRepoInfoMock.mockImplementation((owner, repo) => {
            if (owner === 'facebook' && repo === 'react') {
                return {...mockData.githubInfo[0]}
            } else {
                return {
                    error: true,
                    status: 404
                }
            }
        });

        const { verifyLoggedUser } = require("../../handlers/commonHandlers");
        // the user login status is mocked to test data entry. 
        verifyLoggedUser.mockImplementation((req, res, next) => {
            // the user is added by passport, hence its mocked for testing
            req.user = {id: '2346'};
            next();
        })
    });

    beforeEach(() => {
        // clears the database before each test
        githubRepos.removeAll();
    })

    describe("Test /github/info/:owner/:repo", () => {
        it("Success", (done) => {
            const resp = request(app)
            .post('/github/info/facebook/react');

            resp.expect(202, done);
        });

        it("Error", (done) => {
            const resp = request(app)
            .post('/github/info/facebook/reac');

            resp.expect(404, done);
        })
    })

    describe("Test /github/repos", () => {
        beforeEach(() => {
            // adds data to be tested for get call
            githubRepos.insert({...mockData.githubInfo[0]});
        });

        it("Success", (done) => {
            const resp = request(app)
            .get('/github/repos');

            resp.expect(function(res) {
                expect(res.body).toHaveLength(1);
            })
            resp.expect(200, done);
        });

        
    })
})