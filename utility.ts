import fs from "fs";

const log = (message: string) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync("app.log", `${timestamp} - ${message}\n`);
};

log("Task API called");
