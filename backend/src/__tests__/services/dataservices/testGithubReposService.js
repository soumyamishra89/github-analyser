import mockData from "../../../__mock__/mockData.json";
import githubRepos from "../../../models/githubRepos";
import githubReposService from "../../../services/dataservices/githubReposService.js";

describe("Test github repo services", () => {

    beforeEach(() => {
        // clears the database before each test
        githubRepos.removeAll();
        mockData.githubInfo.forEach(d => githubRepos.insert(d));
    })

    describe("Test insertGithubRepo", () => {
        it("Success", async () => {
            expect(await githubReposService.insertGithubRepo(mockData.githubInfo[0])).toEqual(true);
        });

        it("Failed", async () => {
            expect(await githubReposService.insertGithubRepo({
                owner: 'facebook',
                repo: 'react'
            })).toEqual(false);
        });        
    })

    describe("Test findGithubReposByRequesterId", () => {
        it("fetch one", async () => {
            expect(await githubReposService.findGithubReposByRequesterId("2346")).toHaveLength(1);
        });

        it("fetch 0", async () => {
            expect(await githubReposService.findGithubReposByRequesterId("236")).toHaveLength(0);
        });
        
    })
})