import { getCategories } from "./categories";

describe("jService categories", () => {
  it("gets the categories", async () => {
    const result = await getCategories(10, 0);
    expect(result).toHaveLength(10);
    expect(result.map((cat) => `${cat.id}:${cat.title}`)).toEqual([
      "11531:mixed bag",
      '11532:let\'s "ch"at',
      "5412:prehistoric times",
      "11496:acting families",
      "11498:world city walk",
      "11499:tough-pourri",
      "11500:visualliteration",
      "11504:quotations from bartlett's",
      "11542:fill in the history _____",
      "11544:the state it's in",
    ]);
  });
  it("gets the next five categories", async () => {
    const result = await getCategories(5, 10);
    expect(result).toHaveLength(5);
    expect(result.map((cat) => `${cat.id}:${cat.title}`)).toEqual([
      '11521:"hot" stufff',
      "7580:animal words & phrases",
      "11522:you're in this foreign country if...",
      "11523:the secret lives of teachers",
      "11512:harry truman",
    ]);
  });
});
