const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Router
const testRouter = require('./routes/test');

// Connect Router
app.use('/test', testRouter);

// PORT
app.listen(PORT, () => {
  console.log(`${PORT} 실행 중`);
})