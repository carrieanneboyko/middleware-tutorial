// node fs imports
import path from "path";
// module imports
import dotenv from "dotenv";
// local imports
import launchServer from "./server";

dotenv.config({ path: path.join(__dirname, "../.env") });
const PORT = process.env.PORT;

const main = (port) => {
  const server = launchServer(port);
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
