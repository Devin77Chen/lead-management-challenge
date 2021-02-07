import { buildLeads } from "./jobEventsViews";

describe("Helper function - buildLeads test suite", () => {
    test("Given a non-array suburbs object, it should return an empty array", () => {
        expect(buildLeads(null, [], [])).toHaveLength(0);
    });
    test("Given a non-array categories object, it should return an empty array", () => {
        expect(buildLeads([], {}, [])).toHaveLength(0);
    });
    test("Given a non-array jobEvents object, it should return an empty array", () => {
        expect(buildLeads([], [], 3)).toHaveLength(0);
    });
});