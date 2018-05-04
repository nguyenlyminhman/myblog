let express = require("express");
let config = require("config");
let bodyParser = require("body-parser");
var session = require("express-session");
let socket = require("socket.io");

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))



app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");
app.use("/static", express.static(__dirname + "/public"));


let controller = require(__dirname + "/apps/controllers");


app.use(controller);
let host = config.get("server.host");
let port = config.get("server.port");

let server = app.listen(port, host, () => {
    console.log("Server is running on port", port);
});

let io = socket(server);