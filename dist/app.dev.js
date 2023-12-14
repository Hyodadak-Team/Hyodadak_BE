"use strict";

var express = require("express");

var cors = require("cors");

require("dotenv").config(); // require('./controllers/mongoConnect'); -> mongo connect 확인


var app = express();
var PORT = process.env.PORT;

var _require = require("./config/swagger"),
    specs = _require.specs,
    swaggerUi = _require.swaggerUi; // app.set('views', './views')


app.set("view engine", "ejs");
app.use(express["static"]("public"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); // Router

var testRouter = require("./routes/test");

var noticeRouter = require("./routes/notice");

var registerRouter = require("./routes/join");

var boardRouter = require("./routes/board");

var loginRouter = require("./routes/login"); // Connect Router


app.use("/test", testRouter);
app.use("/notice", noticeRouter);
app.use("/board", boardRouter);
app.use("/login", loginRouter);
app.use("/join", registerRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs)); // PORT

app.listen(PORT, function () {
  console.log("".concat(PORT, " \uC2E4\uD589 \uC911"));
});