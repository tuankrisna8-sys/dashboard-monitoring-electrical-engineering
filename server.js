// ================= MODULE =================
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mqtt = require("mqtt");

// ================= APP =================
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ================= STATIC FILE =================
app.use(express.static("public"));

// ================= MQTT CONFIG =================
const MQTT_BROKER = "mqtt://broker.hivemq.com";

const mqttClient = mqtt.connect(MQTT_BROKER);

// ================= MQTT CONNECT =================
mqttClient.on("connect", () => {
  console.log("✅ MQTT Connected to HiveMQ");

  const topics = [
    // HASNUL
    "sensor/esp32/temperature",
    "sensor/esp32/humidity",
    "sensor/esp32/soil/analog",
    "sensor/esp32/soil/digital",

    // KRISNA
    "sensor/esp32/temperature1",
    "sensor/esp32/humidity1",

    // ARIF
    "esp32/ntc",

    // SITA
    "iot/sensor/suhu",
    "iot/sensor/kelembapan",
    "iot/sensor/waterlevel"
  ];

  topics.forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("❌ Gagal subscribe:", topic);
      } else {
        console.log("📡 Subscribe:", topic);
      }
    });
  });
});

// ================= MQTT MESSAGE =================
mqttClient.on("message", (topic, message) => {
  const payload = message.toString();

  console.log("📩 MQTT:", topic, payload);

  io.emit("mqtt_data", {
    topic: topic,
    value: payload
  });
});

// ================= SOCKET.IO =================
io.on("connection", (socket) => {
  console.log("🖥️ Browser connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Browser disconnected:", socket.id);
  });
});

// ================= SERVER LISTEN =================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
