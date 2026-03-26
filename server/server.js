require("dotenv").config();
const app = require("./src/app");
const http = require("http");
const connectDB = require("./src/config/db");


const { initSocket } = require("./src/config/socket");

const server = http.createServer(app);
initSocket(server)


const PORT = process.env.PORT || 5000;


connectDB();

server.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
  );
});