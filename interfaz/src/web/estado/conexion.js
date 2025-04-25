

const socket = new WebSocket('ws://IP_DEL_ESP32:81'); // IP del ESP32

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const conexionElement = document.getElementById('conexion');
  
  if (data.conexion) {
    conexionElement.innerHTML = '<i class="fas fa-wifi"></i> Conectado';
    conexionElement.className = 'text-success';
  } else {
    conexionElement.innerHTML = '<i class="fas fa-wifi-slash"></i> Desconectado';
    conexionElement.className = 'text-danger';
  }
};


socket.onerror = (error) => {
  console.error('Error en WebSocket:', error);
  document.getElementById('conexion').textContent = 'Error de conexión';
};