const fs = require("fs"); // inbuild package-file system. 
fs.readFile("./awesome.txt", "utf-8", (err, data)=>{
    console.log(data);
})
//utf-8 stands for the computer to allow all charset
// orelse it will take the value of hexadecimal. 

// // to createFile 
const niceQuote = "Make everyday a little less oridinary"; 
fs.writeFile ("./cool.txt",niceQuote, (err)=>{
    console.log("Completed Writing!!!"); 
} )

const bulkQuote ="Live more, worry less"; 

const [, , num1 ] = process.argv;


// to add files : to the exisiting file 

const newQuote = "\nMake everyday a less oridinary"; 
fs.appendFile ("./fun.html",newQuote, (err)=>{
    console.log("Completed Updating!!!"); 
} )
 // delete all files inside the backup : 
// to read the files
// fs.readdir("./backup", (err, data)=>{
//     console.log(data); 
// })

