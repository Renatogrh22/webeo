const ledButton = document.getElementById("ledButton");
const label = document.getElementById("label");
const ipAddressInput = document.getElementById("ipAddressInput"); // Nuevo campo de entrada para la dirección IP

let isOn = false; // Estado inicial del LED (apagado)

let webSocket;

function connectToWebSocket(ipAddress) {
    webSocket = new WebSocket('ws://' + ipAddress + ':puerto');

    webSocket.onopen = function(event) {
        console.log('Conexión WebSocket abierta');
    };

    webSocket.onmessage = function(event) {
        console.log('Mensaje recibido: ' + event.data);
    };
}

// Manejar el clic del botón de conexión
connectButton.addEventListener("click", () => {
    const ipAddress = ipAddressInput.value.trim();
    if (isValidIpAddress(ipAddress)) {
        connectToWebSocket(ipAddress);
    } else {
        alert("Direccion IP no valida. Por favor, ingrese una direccion IP valida.");
    }
});

ledButton.addEventListener("click", () => {
    if (webSocket.readyState === WebSocket.OPEN) {
        isOn = !isOn; // Cambia el estado del LED al hacer clic en el botón

        let value = isOn ? "ON" : "OFF"; // Determina el mensaje a enviar basado en el estado actual del LED
        webSocket.send(value); // Envía el mensaje al ESP32 para controlar el LED
        ledButton.value = isOn ? "Apagar" : "Encender"; // Actualiza el valor del botón
        label.textContent = isOn ? "Encendido" : "Apagado"; // Actualiza el texto de la etiqueta
        ledButton.classList.toggle('off'); // Alterna la clase CSS para cambiar el estilo visual

    } else {
        alert("Conexión WebSocket no disponible. Por favor, conéctese antes de intentar encender/apagar el LED.");
    }
});

function isValidIpAddress(ipAddress) {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][09]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipPattern.test(ipAddress);
}





// ledButton.addEventListener("click", () => {
//     if (webSocket.readyState === WebSocket.OPEN) {
//         isOn = !isOn; // Cambia el estado del LED al hacer clic en el botón

//         if (isOn) {
//             // Cambia las propiedades CSS al estado de encendido
//             ledButton.classList.remove("off");
//             ledButton.value = "Apagar";
//             label.textContent = "Encendido";

//             // Envía mensaje al ESP32 para encender el LED
//             webSocket.send("ON");
//         } else {
//             // Cambia las propiedades CSS al estado de apagado
//             ledButton.classList.add("off");
//             ledButton.value = "Encender";
//             label.textContent = "Apagado";

//             // Envía mensaje al ESP32 para apagar el LED
//             webSocket.send("OFF");
//         }
//     } else {
//         alert("Conexión WebSocket no disponible. Por favor, conéctese antes de intentar encender/apagar el LED.");
//     }
// });