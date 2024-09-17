import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.mongoUrl as string);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
process.on("unhandledRejection", () => {
  console.log("😡 UnhandledRejection is detected in server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log("😡 uncaughtException is detected in server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
