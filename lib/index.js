"use strict";

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// node fs imports
// module imports
// local imports
_dotenv.default.config({
  path: _path.default.join(__dirname, "../.env")
});

const PORT = process.env.PORT;

const main = port => {
  const server = (0, _server.default)(port);
  process.on("exit", () => {
    console.log(`\nServer closing on port ${port}`);
    server.close();
    console.log(`Server closed. Goodbye!`);
  });
  process.on("SIGINT", () => {
    process.exit();
  });
};

main(PORT);