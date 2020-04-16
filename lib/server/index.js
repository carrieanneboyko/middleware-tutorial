"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const launchServer = port => {
  const app = (0, _express.default)();
  return app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
};

var _default = launchServer;
exports.default = _default;