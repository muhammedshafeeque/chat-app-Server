const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./Config/connection");
const userRouter = require("./Routes/userRouter");
const cors=require('cors')
dotenv.config();
app.use(cors())
app.use(express.json())
db.connect((err) => {
  if (err) console.log("connection Error" + err);
  else console.log("Database Connected");
});
app.use('/api/user',userRouter)
const server = app.listen(process.env.PORT, () => {
  console.log("Server runnig On " + process.env.PORT);
});
