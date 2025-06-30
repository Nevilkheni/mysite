const fs = require("fs");
const path = require("path");

const fileName = "test.txt";
const filePath = path.join(__dirname, fileName);



console.log(__dirname);

const writeFile = fs.writeFileSync(
  filePath,
  "This is the initial Data",
  "utf-8"
);

console.log(writeFile);


const readFile = fs.readFileSync(filePath, "utf-8");
console.log(readFile.toString());
console.log(readFile);




const appendFile = fs.appendFileSync(
  filePath,
  "\nThis is the updated Data",
  "utf-8"
 );

console.log(appendFile);

// 
const fileDelete = fs.unlinkSync(filePath);
console.log(fileDelete);

const newUpdatedFileName = "updateTest.txt";
const newFilePath = path.join(__dirname, newUpdatedFileName);
const renameFile = fs.renameSync(filePath, newFilePath);
console.log(renameFile);