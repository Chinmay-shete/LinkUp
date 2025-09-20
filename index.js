const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const path = require("path");

const http = require("http");
const socketIo = require("socket.io"); 
const srever = http.createServer(app);
const io = socketIo(srever);
io.on("connection",function(socket){
    console.log("new connection")
})


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.listen("3000");
