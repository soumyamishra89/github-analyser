import mockData from "../../../__mock__/mockData.json";
import users from "../../../models/users.js";
import usersService from "../../../services/dataservices/usersService.js";

describe("Test User service", () => {

    beforeEach(() => {
        // clears the database before each test
        users.removeAll();
        mockData.users.forEach(u => users.insertOrUpdate(u));
    })

    describe("Test insertOrUpdateUser", () => {
        it("Success", async () => {
            expect(await usersService.insertOrUpdateUser(mockData.users[0])).toEqual(true);
        });

        it("Failed", async () => {
            expect(await usersService.insertOrUpdateUser({
                id: 'facebook',
                name: 'react'
            })).toEqual(false);
        });        
    })

    describe("Test getUserForId", () => {
        it("fetch one", async () => {
            const user = await usersService.getUserForId("2346")
            expect(user.name).toEqual("ssm");
            expect(user.email).toEqual("someone@something.com");
        });

        it("fetch 0", async () => {
            expect(await usersService.getUserForId("236")).toEqual(null);
        });
        
    })
})