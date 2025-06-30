// const fs = require("fs");
// const path = require("path");

// const directoryPath = __dirname; 

// fs.promises
//     .readdir(directoryPath)
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err)); 




const fs = require("fs"); 
const filepath1 = __dirname; 

fs.promises
    .readdir(filepath1)
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
