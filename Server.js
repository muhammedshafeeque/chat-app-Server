const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./Config/connection");
const userRouter = require("./Routes/userRouter");
const chatRouter=require('./Routes/chatRouter')
const messageRouter=require('./Routes/messageRouter')
const cors=require('cors');
const { protect } = require("./Functions/webToken");
dotenv.config();
app.use(cors())
app.use(express.json())
db.connect((err) => {
  if (err) console.log("connection Error" + err);
  else console.log("Database Connected");
});
app.use('/api/user',userRouter)
app.use('/api/chat',protect,chatRouter)
app.use('/api/message',protect,messageRouter)
const server = app.listen(process.env.PORT, () => {
  console.log("Server runnig On " + process.env.PORT);
});
