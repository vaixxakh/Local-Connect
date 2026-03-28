const { Server } = require("socket.io");
const Booking = require("../models/Booking");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);


    socket.on("join-booking-room", (bookingId) => {
      if (!bookingId) return;

      socket.join(bookingId);
      console.log(`📦 Joined room: ${bookingId}`);
    });


    socket.on("booking-status-update", ({ bookingId, status }) => {
      if (!bookingId || !status) return;

      io.to(bookingId).emit("booking-status", status);
    });


    socket.on("send-message", ({ bookingId, message }) => {
      if (!bookingId || !message) return;

      io.to(bookingId).emit("receive-message", message);
    });


    socket.on("send-location", async (data) => {
      try {
        const { bookingId, lat, lng } = data;

       
        if (!bookingId || lat === undefined || lng === undefined) {
          return;
        }

        console.log("📍 Provider Location:", lat, lng);

        
        await Booking.findByIdAndUpdate(bookingId, {
          providerLocation: {
            type: "Point",
            coordinates: [lng, lat], 
          },
        });


        io.to(bookingId).emit("live-location", {
          lat,
          lng,
          timestamp: Date.now(),
        });

      } catch (error) {
        console.error("❌ Location error:", error.message);
      }
    });


    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
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