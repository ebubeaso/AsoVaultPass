/*
This simple JavaScript file reads the credentials that you have
added into a file known as creds.txt, located in the directory
../creds. When it uses readFileSync, it puts every line on that file on a newline,
where the \n character is used. You can verify this by storing the result
of readFileSync to a variable and then using the split method on that variable. 
Thus, a good workaround is to use the .replace() string method to replace the \n and the
carriage return \r to commas, like ",". Thus, after using readFileSync,
you can use .replace(/(\r\n|\n|\r)/gm, ",")) to better format the parsed data.
 */
const fs = require("fs");

const readCreds = () => {
    try {
        var data = fs.readFileSync("../creds/creds.txt", "utf-8");
        var creds = data.replace(/(\r\n|\n|\r)/gm, ",");
        return creds.split(",");
    } catch(err) {
        console.error(err);
    }
}
module.exports = {readCreds}