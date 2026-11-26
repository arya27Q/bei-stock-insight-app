import fs from "fs";

if (fs.existsSync("src/generated")) {
  fs.mkdirSync("dist/generated", { recursive: true });
  fs.cpSync("src/generated", "dist/generated", { recursive: true, force: true });
  console.log("Successfully copied generated files to dist/generated");
}
