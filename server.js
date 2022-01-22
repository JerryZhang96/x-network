require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket
const server = require("http").createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  SocketServer(socket);
});

// Create peer server
ExpressPeerServer(server, { path: "/" });

// Routes
app.use(process.env.API_PREFIX, require("./routes/authRouter"));
app.use(process.env.API_PREFIX, require("./routes/userRouter"));
app.use(process.env.API_PREFIX, require("./routes/postRouter"));
app.use(process.env.API_PREFIX, require("./routes/commentRouter"));
app.use(process.env.API_PREFIX, require("./routes/notifyRouter"));
app.use(process.env.API_PREFIX, require("./routes/messageRouter"));

const URI = process.env.MONGODB_URL;

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log("Server is running on port", port);
});
