const express = require("express");
const cors = require("cors");

const swaggerUi = require('swagger-ui-express');

require("dotenv").config();
// require('./controllers/mongoConnect'); -> mongo connect 확인

const app = express();

const { PORT } = process.env;

// app.set('views', './views')
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
const testRouter = require("./routes/test");
const noticeRouter = require("./routes/notice");
const registerRouter = require("./routes/join");
const boardRouter = require("./routes/board");

// Connect Router
app.use("/test", testRouter);
app.use("/notice", noticeRouter);
app.use("/board", boardRouter);

app.use("/join", registerRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(require('./config/swaggerDoc')));
// PORT
app.listen(PORT, () => {
  console.log(`${PORT} 실행 중`);
});
