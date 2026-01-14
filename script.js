console.log("SCRIPT.JS AKTIF");

const socket = io();

socket.on("mqtt_data", (data) => {
  console.log("DATA MASUK:", data);

  const topic = data.topic;
  const value = data.value.toString().trim();

  // ===== HASNUL =====
  if (topic === "sensor/esp32/temperature") {
    document.getElementById("tempHasnul").innerText = value + " °C";
  }

  if (topic === "sensor/esp32/humidity") {
    document.getElementById("humHasnul").innerText = value + " %";
  }

  if (topic === "sensor/esp32/soil/analog") {
    document.getElementById("soilAnalog").innerText = value;
  }

  if (topic === "sensor/esp32/soil/digital") {
    const v = value.toUpperCase();
    let status = "-";

    if (v === "BASAH") status = "Basah";
    if (v === "KERING") status = "Kering";

    document.getElementById("soilStatus").innerText = status;
  }

  // ===== KRISNA =====
  if (topic === "sensor/esp32/temperature1") {
    document.getElementById("temp1").innerText = value + " °C";
  }

  if (topic === "sensor/esp32/humidity1") {
    document.getElementById("hum1").innerText = value + " %";
  }

  // ===== ARIF =====
  if (topic === "esp32/ntc") {
    document.getElementById("ntcTemp").innerText = value + " °C";
  }

  // ===== SITA =====
  if (topic === "iot/sensor/suhu") {
    document.getElementById("sitaTemp").innerText = value + " °C";
  }

  if (topic === "iot/sensor/kelembapan") {
    document.getElementById("sitaHum").innerText = value + " %";
  }

  if (topic === "iot/sensor/waterlevel") {
    document.getElementById("waterLevel").innerText = value;
  }
});
