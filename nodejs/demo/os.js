

const os = require("os");

console.log("Operating System Info:");
console.log("Platform:", os.platform());       
console.log("Architecture:", os.arch());       
console.log("Total Memory:", os.totalmem());   
console.log("Free Memory:", os.freemem());     
console.log("Uptime:", os.uptime(), "seconds");
console.log("CPU Info:", os.cpus());          
console.log("Home Directory:", os.homedir()); 
console.log("Temporary Folder:", os.tmpdir());