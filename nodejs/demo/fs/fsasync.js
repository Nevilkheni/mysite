const fs = require("fs");
const path = require("path");

const fileName = "test.txt";
const filePath = path.join(__dirname, fileName);

// fs.writeFile(filePath, "this is the data", "utf-8", (err) => {
//     if (err) {
//         console.log("Error writing file:", err);
//     } else {
//         console.log("File has been saved successfully!");
//     }
// });



// fs.readFile(filePath, "utf-8", (err, data) => {
//     if (err) console.error(err);
//     else console.log(data); 
// });