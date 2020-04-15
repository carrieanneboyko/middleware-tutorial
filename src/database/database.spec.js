import { insert, find, reset } from "./";
const jQuestion = {
  id: 118240,
  answer: "Intel",
  question:
    "Shortened to 5 letters from a longer word, it's military information",
  value: 400,
  airdate: "2013-03-14T12:00:00.000Z",
  created_at: "2014-02-14T02:47:39.173Z",
  updated_at: "2014-02-14T02:47:39.173Z",
  category_id: 16168,
  game_id: null,
  invalid_count: null,
  category: {
    id: 16168,
    title: "sounds like a tech brand",
    created_at: "2014-02-14T02:47:38.731Z",
    updated_at: "2014-02-14T02:47:38.731Z",
    clues_count: 10,
  },
};

describe("NeDB Database Test", () => {
  beforeAll(async () => {
    await reset("test");
    return;
  });
  it("writes to database", async () => {
    const res = await insert("test", jQuestion);
    expect(res).toEqual({
      _id: res._id,
      ...jQuestion,
    });
  });
  it("retrieves from database", async () => {
    const res = await find("test", { answer: "Intel" });
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      _id: res[0]._id,
      ...jQuestion,
    });
  });
});
