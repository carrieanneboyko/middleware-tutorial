import { getCategories } from "./categories";

describe("jService categories", () => {
  it("gets the categories", async () => {
    const result = await getCategories(10, 0);
    expect(result).toHaveLength(10);
    expect(result.map((cat) => cat.title)).toEqual([
      "mixed bag",
      'let\'s "ch"at',
      "prehistoric times",
      "acting families",
      "world city walk",
      "tough-pourri",
      "visualliteration",
      "quotations from bartlett's",
      "fill in the history _____",
      "the state it's in",
    ]);
  });
  it("gets the next five categories", async () => {
    const result = await getCategories(5, 10);
    expect(result).toHaveLength(5);
    expect(result.map((cat) => cat.title)).toEqual([
      '"hot" stufff',
      "animal words & phrases",
      "you're in this foreign country if...",
      "the secret lives of teachers",
      "harry truman",
    ]);
  });
});
