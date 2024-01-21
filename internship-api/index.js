const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");
const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/uploads/images", express.static(path.join("uploads", "images")));
mongoose
  .connect(
    "mongodb+srv://extratdh:Nv8CTcI1vffeaJMJ@cluster0.totsgf6.mongodb.net/"
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(5000, () => {
  console.log(`Listening to 5000`);
});
// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });
// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });
//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-receive", data.msg);
//     }
//   });
// });
