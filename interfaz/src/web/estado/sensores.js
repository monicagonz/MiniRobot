
const socket = new WebSocket('ws://IP_DEL_ESP32:81'); // ip del esp32


const ultrasonidoElement = document.getElementById('ultrasonido');
const infrarrojoElement = document.getElementById('infrarrojo');
const voltajeElement = document.getElementById('voltaje');
const bateriaProgress = document.getElementById('bateria-progress');


socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // Ultrasonido (distancia en cm)
  ultrasonidoElement.textContent = `${data.ultrasonido} cm`;
  ultrasonidoElement.className = data.ultrasonido <= 20 ? 'text-danger' : 'text-success';
  
  // Infrarrojo (obstáculo)
  infrarrojoElement.innerHTML = data.infrarrojo 
    ? '<i class="fas fa-exclamation-triangle"></i> Obstáculo detectado' 
    : '<i class="fas fa-check"></i> Libre';
  infrarrojoElement.className = data.infrarrojo ? 'text-warning' : 'text-success';
  
  // Voltaje (batería)
  voltajeElement.textContent = `${data.voltaje.toFixed(2)} V`;
  bateriaProgress.style.width = `${(data.voltaje / 4.2) * 100}%`; 
  bateriaProgress.className = data.voltaje <= 3.3 ? 'progress-bar bg-danger' : 'progress-bar bg-success';
};
