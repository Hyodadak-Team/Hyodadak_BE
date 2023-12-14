const express = require("express");
const cors = require("cors");

require("dotenv").config();
// require('./controllers/mongoConnect'); -> mongo connect 확인

const app = express();

const { PORT } = process.env;
const {specs, swaggerUi} = require('./config/swagger');

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs))
// PORT
app.listen(PORT, () => {
  console.log(`${PORT} 실행 중`);
});
