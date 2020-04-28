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
  describe("read", () => {
    describe("category/categoryByTitle/categoryById", () => {
      it("reads a category", async () => {
        const result = await testDb.read.category({ id: 11512 });
        expect(result).toHaveLength(1);
        expect(result).toEqual([
          {
            _id: result[0]._id,
            clues_count: 5,
            id: 11512,
            title: "harry truman",
          },
        ]);
        const resultByTitle = await testDb.read.category({
          title: "harry truman",
        });
        expect(result).toHaveLength(1);
        expect(resultByTitle).toEqual([
          {
            _id: resultByTitle[0]._id,
            clues_count: 5,
            id: 11512,
            title: "harry truman",
          },
        ]);
      });
      it("reads all categories", async () => {
        const result = await testDb.read.category({});
        expect(result).toHaveLength(3);
      });
      it("read.categoryById", async () => {
        const result = await testDb.read.categoryById(11512);
        expect(result).toEqual([
          {
            _id: result[0]._id,
            clues_count: 5,
            id: 11512,
            title: "harry truman",
          },
        ]);
      });
      it("read.categoryByTitle", async () => {
        const result = await testDb.read.categoryByTitle("harry truman");
        expect(result).toEqual([
          {
            _id: result[0]._id,
            clues_count: 5,
            id: 11512,
            title: "harry truman",
          },
        ]);
      });
    });
    describe("search", () => {
      it("read.searchCategories", async () => {
        const result = await testDb.read.searchCategories("ha");
        expect(result.map((entry) => entry.title)).toEqual([
          "harry truman",
          "sham, wow!",
        ]);
        const resultRegex = await testDb.read.searchCategoriesByRegex(/ha/);
        expect(resultRegex.map((entry) => entry.title)).toEqual([
          "harry truman",
          "sham, wow!",
        ]);
      });
    });
  });
  describe("update", () => {
    describe("update.category", () => {
      it(`updates the category`, async () => {
        const trumanClues = mockCategoriesAndClues[0].clues;
        const result = await testDb.update.category(
          { title: "harry truman" },
          { clues: trumanClues }
        );
        expect(result).toEqual({
          _id: result._id,
          clues_count: 5,
          id: 11512,
          title: "harry truman",
          clues: mockCategoriesAndClues[0].clues,
        });
        const dataInDb = await testDb.read.categoryByTitle("harry truman");
        expect(dataInDb).toEqual([
          {
            _id: result._id,
            clues_count: 5,
            id: 11512,
            title: "harry truman",
            clues: mockCategoriesAndClues[0].clues,
          },
        ]);
      });
    });
  });
});
