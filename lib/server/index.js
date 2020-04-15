"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config({
  path: _path.default.join(__dirname, '../../.env')
});

const PORT = process.env.PORT;
console.log(_path.default.join(__dirname, '../../.env'));
console.log(PORT);

const executeServer = () => {
  console.log(PORT);
};

var _default = executeServer;
exports.default = _default;