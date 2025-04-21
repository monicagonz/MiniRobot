

const socket = new WebSocket('ws://ip-del-esp32:81');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  document.getElementById('bateria').textContent = `${data.bateria}%`;
  document.getElementById('conexion').textContent = data.conexion ? '✔️' : '❌';
};