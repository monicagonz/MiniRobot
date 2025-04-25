// En tu app.js
let gamepad; // Almacena el control detectado

// Escuchar conexión/desconexión del control
window.addEventListener("gamepadconnected", (e) => {
  gamepad = e.gamepad;
  console.log("Control conectado:", gamepad.id);
  document.getElementById("gamepad-status").textContent = "🟢 Conectado";
});

window.addEventListener("gamepaddisconnected", (e) => {
  console.log("Control desconectado");
  document.getElementById("gamepad-status").textContent = "🔴 Desconectado";
  gamepad = null;
});

function leerGamepad() {
    if (!gamepad) return;
  
    const ejes = gamepad.axes; // Joysticks
    const botones = gamepad.buttons; // Botones
  
    // Joystick izquierdo (ejes 0 y 1)
    const joystickX = ejes[0]; // -1 (izquierda) a 1 (derecha)
    const joystickY = ejes[1]; // -1 (arriba) a 1 (abajo)
  
    // Botones (A, B, etc.)
    const botonA = botones[0].pressed;
    const botonB = botones[1].pressed;
  
    // Enviar comandos al robot según las entradas
    if (joystickY < -0.5) {
      enviarComando("MOVER_ADELANTE");
    } else if (joystickY > 0.5) {
      enviarComando("MOVER_ATRAS");
    }
  
    if (botonA) {
      enviarComando("ENCENDER_LUZ");
    }
  }
  
  // Función para enviar comandos al ESP32 via WebSocket
  function enviarComando(comando) {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ comando }));
    }
  }
  
  // Actualizar estado del control en cada frame
  function updateLoop() {
    leerGamepad();
    requestAnimationFrame(updateLoop);
  }
  updateLoop();