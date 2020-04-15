"use strict";

var _server = _interopRequireDefault(require("./server"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("process.env.NODE_ENV before:", process.env.NODE_ENV);

if (process.env.NODE_ENV === undefined) {
  _dotenv.default.config({
    path: path.join(__dirname, '../../.env')
  });

  console.log("process.env.NODE_ENV after:", process.env.NODE_ENV);
}

(0, _server.default)();