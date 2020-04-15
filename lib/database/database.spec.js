"use strict";

var _ = require("./");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const UNIQUE_TEST_NUMBER = Math.random().toString();
const jQuestion = {
  id: 118240,
  answer: "Intel",
  question: "Shortened to 5 letters from a longer word, it's military information",
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
    clues_count: 10
  },
  uniqueTestNumber: UNIQUE_TEST_NUMBER
};
describe("NeDB Database Test", () => {
  beforeAll( /*#__PURE__*/_asyncToGenerator(function* () {
    yield (0, _.reset)("test");
    return;
  }));
  it("writes to database", /*#__PURE__*/_asyncToGenerator(function* () {
    const res = yield (0, _.insert)("test", jQuestion);
    expect(res).toEqual({
      _id: res._id,
      ...jQuestion
    });
  }));
  it("retrieves from database", /*#__PURE__*/_asyncToGenerator(function* () {
    const res = yield (0, _.find)("test", {
      answer: "Intel"
    });
    expect(res).toHaveLength(1);
    expect(res[0]).toEqual({
      _id: res[0]._id,
      ...jQuestion
    });
  }));
});