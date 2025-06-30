const path = require("path");

console.log("Directory Name:", __dirname);
console.log("File Name:", __filename);

const filepath = path.join("folder", "student", "txt");
console.log("Joined Path:", filepath);

const parsedata = path.parse(filepath); // ✅ Fixed typo
const resolvedpath = path.resolve(filepath);
const extname = path.extname(filepath);
const basename = path.basename(filepath);
const dirname = path.dirname(filepath);

console.log({ parsedata, resolvedpath, extname, basename, dirname });
