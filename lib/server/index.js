"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _simpleLogger = _interopRequireDefault(require("./middleware/simpleLogger"));

var _userIs = _interopRequireDefault(require("./middleware/userIs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const launchServer = port => {
  const app = (0, _express.default)();
  app.use(_simpleLogger.default);
  app.get('/hello-world', (req, res) => {
    res.send('Hello World!');
  });
  (0, _userIs.default)(app);
  return app.listen(port, () => {
    console.log(`Application listening on port ${port}`);
  });
};

var _default = launchServer;
exports.default = _default;