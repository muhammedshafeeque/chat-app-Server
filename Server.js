const express = require("express");
const dotenv = require("dotenv");
const app = express();
const db = require("./Config/connection");
const userRouter = require("./Routes/userRouter");
const chatRouter = require("./Routes/chatRouter");
const messageRouter = require("./Routes/messageRouter");
const cors = require("cors");
const { protect } = require("./Functions/webToken");
dotenv.config();
app.use(cors());
app.use(express.json());
db.connect((err) => {
  if (err) console.log("connection Error" + err);
  else console.log("Database Connected");
});
app.use("/api/user", userRouter);
app.use("/api/chat", protect, chatRouter);
app.use("/api/message", protect, messageRouter);
const Server = app.listen(process.env.PORT, () => {
  console.log("Server runnig On " + process.env.PORT);
});
const io = require("socket.io")(Server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to Socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (chat) => {
    socket.join(chat);
    console.log("User Joind Room :" + chat);
  });
  socket.on("new message", (newMessageRecived) => {
    var chat = newMessageRecived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user.userId == newMessageRecived.sender._id) return;
      socket.in(user.userId).emit("message recieved", newMessageRecived);
    });
  });
});
