import { getCategoryById } from "./category";

const HARRY_TRUMAN_CAT_ID = 11512;

describe("jService category (getCategoryById)", () => {
  it("gets the categoryById", async () => {
    const result = await getCategoryById(HARRY_TRUMAN_CAT_ID);
    expect(result.id).toBe(11512);
    expect(result.title).toBe("harry truman");
    expect(result.clues_count).toBe(5);
    expect(result.clues).toHaveLength(5);
    expect(result.clues).toEqual([
      {
        id: 87724,
        answer: "vice president",
        question: "In 1945 Harry served just 83 days in this job",
        value: 200,
        airdate: "2009-07-21T12:00:00.000Z",
        category_id: 11512,
        game_id: null,
        invalid_count: null,
      },
      {
        id: 87730,
        answer: '"The buck stops here"',
        question:
          "It was the 4-word motto Truman kept on his desk in the Oval Office",
        value: 400,
        airdate: "2009-07-21T12:00:00.000Z",
        category_id: 11512,
        game_id: null,
        invalid_count: null,
      },
      {
        id: 87736,
        answer: "Missouri",
        question:
          "Each May 8 this state officially celebrates Harry Truman's birthday",
        value: 600,
        airdate: "2009-07-21T12:00:00.000Z",
        category_id: 11512,
        game_id: null,
        invalid_count: null,
      },
      {
        id: 87742,
        answer: "August (of 1945)",
        question:
          'It\'s the month Truman began a famous speech with the line "We have just dropped a new bomb..."',
        value: 800,
        airdate: "2009-07-21T12:00:00.000Z",
        category_id: 11512,
        game_id: null,
        invalid_count: null,
      },
      {
        id: 87748,
        answer: "Thomas Dewey",
        question:
          "He was the last person beaten by Harry Truman in an election",
        value: 1000,
        airdate: "2009-07-21T12:00:00.000Z",
        category_id: 11512,
        game_id: null,
        invalid_count: null,
      },
    ]);
  });
});
