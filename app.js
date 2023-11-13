const express = require("express");
const cors = require("cors");

require("dotenv").config();
// require('./controllers/mongoConnect'); -> mongo connect 확인

const app = express();

const { PORT } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
const testRouter = require("./routes/test");
const noticeRouter = require("./routes/notice");
const registerRouter = require("./routes/register");

// Connect Router
app.use("/test", testRouter);
app.use("/notice", noticeRouter);
app.use("/register", registerRouter);
// PORT
app.listen(PORT, () => {
  console.log(`${PORT} 실행 중`);
});
