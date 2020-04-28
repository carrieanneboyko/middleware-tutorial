import { jeopardy } from "./jeopardy";
import db from "../db/index";
import { dbService } from "../db/jeopardy/index";

const testDb = dbService(db.test);
const testRepo = jeopardy(db.test);

describe("jeopardy repository", () => {
  beforeAll(() => {
    testDb.drop();
  });
  describe("getCategoryBypassCache", () => {
    it("gets a repo directly from the api", async () => {
      const result = await testRepo.getCategoryBypassCache(11512);
      expect(result.cache).toBe("bypassed");
      expect(result.clues).toHaveLength(5);
      expect(result.title).toBe("harry truman");
    });
  });
  describe("getCategory", () => {
    describe("gets a category, but does'nt really care where from", () => {
      it("will grab from the API on a cache miss", async () => {
        const result = await testRepo.getCategory("11512");
        expect(result.cache).toBe("miss");
        expect(result.clues).toHaveLength(5);
        expect(result.title).toBe("harry truman");
      });
      it("will grab from the API on a cache hit", async () => {
        const result = await testRepo.getCategory("11512");
        expect(result.cache).toBe(undefined);
        expect(result.clues).toHaveLength(5);
        expect(result.title).toBe("harry truman");
      });
      it("will grab from the database by title if in the DB", async () => {
        const result = await testRepo.getCategory("harry truman");
        expect(result.cache).toBe(undefined);
        expect(result.clues).toHaveLength(5);
        expect(result.title).toBe("harry truman");
      });
      it("will error if searching by title and not in the DB", async () => {
        try {
          const result = await testRepo.getCategory("suck it, trebek!");
          expect(true).toBeFalse(); // this line should not run.
        } catch (err) {
          expect(err.toString()).toBe(
            "Error: No results for title: suck it, trebek! in db"
          );
        }
      });
    });
  });
});
