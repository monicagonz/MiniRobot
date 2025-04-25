// app.js
const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');
const flecha = document.getElementById('flecha');
const direccionText = document.getElementById('direccion');

let posX = 250; // Posición inicial (centro del canvas)
let posY = 250;
let angulo = 0; // Ángulo actual (0 = arriba)

// Dibujar mapa inicial
function dibujarMapa() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dibujar robot (círculo)
  ctx.beginPath();
  ctx.arc(posX, posY, 15, 0, Math.PI * 2);
  ctx.fillStyle = '#007BFF';
  ctx.fill();
  
  // Dibujar dirección (línea)
  ctx.beginPath();
  ctx.moveTo(posX, posY);
  ctx.lineTo(
    posX + 30 * Math.sin(angulo * Math.PI / 180),
    posY - 30 * Math.cos(angulo * Math.PI / 180)
  );
  ctx.strokeStyle = '#FF0000';
  ctx.lineWidth = 3;
  ctx.stroke();
}

// Actualizar posición basada en datos del ESP32
function actualizarPosicion(comando) {
  switch (comando) {
    case 'MOVER_ADELANTE':
      posX += 10 * Math.sin(angulo * Math.PI / 180);
      posY -= 10 * Math.cos(angulo * Math.PI / 180);
      direccionText.textContent = "Avanzando";
      break;
    case 'GIRAR_IZQUIERDA':
      angulo -= 90;
      flecha.style.transform = `rotate(${angulo}deg)`;
      direccionText.textContent = "Girando izquierda";
      break;
    case 'GIRAR_DERECHA':
      angulo += 90;
      flecha.style.transform = `rotate(${angulo}deg)`;
      direccionText.textContent = "Girando derecha";
      break;
  }
  dibujarMapa();
}

// Ejemplo: Simular comando desde WebSocket
const socket = new WebSocket('ws://192.168.1.100:81');
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.comando) {
    actualizarPosicion(data.comando);
  }
};