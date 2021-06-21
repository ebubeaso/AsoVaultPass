const app = require("./index");
const port = 9900;
// listen on port 9900;
app.listen(port, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`We are now listening for connections on port ${port}`)
});