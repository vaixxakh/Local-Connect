const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-booking-room", (bookingId) => {
      socket.join(bookingId);
      console.log(`Joined room: ${bookingId}`);
    });

    socket.on("booking-status-update", ({ bookingId, status }) => {
      io.to(bookingId).emit("booking-status", status);
    });
    socket.on("send-message", ({ bookingId, message }) => {
      io.to(bookingId).emit("receive-message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
   socket.on("send-location", ({ bookingId, lat, lng }) => {
  if (!bookingId || !lat || !lng) return;

  console.log("📍 RECEIVED:", lat, lng);

  io.to(bookingId).emit("live-location", {
    lat,
    lng,
    timestamp: Date.now(), 
  });
});
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = {
  initSocket,
  getIO,
};