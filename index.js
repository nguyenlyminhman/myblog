let express = require("express");
let config = require("config");
let bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.json());
app.set("views",__dirname+"/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname+"/public"));


let controller = require(__dirname + "/apps/controllers");


app.use(controller);
let host = config.get("server.host");
let port = config.get("server.port");

app.listen(port, host, () => {
    console.log("Server is running on port", port);
})