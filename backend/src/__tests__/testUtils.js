import utils from "../utils/utils";

describe("Test utils module", () => {
    it("Test extractNumberOfPagesFromLink valid", () => {
        const link = `<https://api.github.com/resource?page=2>; rel="next",
        <https://api.github.com/resource?page=5>; rel="last"`;

        expect(Number(utils.extractNumberOfPagesFromLink(link))).toEqual(5);
    });

    it("Test extractNumberOfPagesFromLink invalid", () => {
        const link = `<https://api.github.com/resource?page=2>; rel="next",
        <https://api.github.com/resource>; rel="last"`;

        expect(Number(utils.extractNumberOfPagesFromLink(link))).toEqual(0);
    });
})