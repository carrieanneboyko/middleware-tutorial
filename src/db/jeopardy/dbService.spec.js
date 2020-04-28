import { dbService } from "./index";
import db from "../index";
import mockCategories from "./__mockdata__/categories.json";
import mockCategoriesAndClues from "./__mockdata__/categories_clues.json";

const testDb = dbService(db.test);

describe("dbService", () => {
  beforeAll(() => {
    testDb.drop();
  });
  describe("create", () => {
    describe("dbService.create.category", () => {
      it("creates a category", async () => {
        const result = await testDb.create.category(mockCategories[0]);
        expect(result).toEqual({
          _id: result._id,
          clues_count: 5,
          id: 11512,
          title: "harry truman",
        });
      });
      it("won't re-insert with the same id", async () => {
        try {
          const result = await testDb.create.category(mockCategories[0]);
          expect(true).toBeFalse(); // this line should not execute;
        } catch (err) {
          console.log(err.toString());
          expect(err.toString()).toBe(
            "Error: Can't insert key 11512, it violates the unique constraint"
          );
        }
      });
    });
    describe("dbService.create.categories", () => {
      it("creates multiple categories", async () => {
        const result = await testDb.create.category(mockCategories.slice(1));
        expect(result).toEqual([
          {
            _id: result[0]._id,
            clues_count: 5,
            id: 11513,
            title: "contract killings",
          },
          {
            _id: result[1]._id,
            clues_count: 5,
            id: 11514,
            title: "sham, wow!",
          },
        ]);
      });
    });
  });
});
