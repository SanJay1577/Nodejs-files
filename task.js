//Updating the document withe process.argv

const [, , num] = process.argv;
const fs = require("fs"); // inbuild package-file system.
const niceQuote = "Make everyday a little less oridinary";
for (let i = 1; i <= +num; i++) {
  fs.writeFile(`./backup/text-${[i]}.html`, niceQuote, (err) => {
    console.log("Completed Writing!!!");
  });
}

//Deleting theh document 

fs.readdir("./backup", (err, data) => {
    console.log(data);
  for (let j = 0; j < data.length; j++) {
    const directory = `./backup/${data[j]}`;
    fs.unlink(directory, (err) => {
      console.log("Deleted Sucessfully");
    });
  }
});
