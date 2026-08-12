
const formulario = document.getElementById('formularioGuild');
const statusMsg = document.getElementById('statusMessage');

// FUNCIÓN PARA MOSTRAR MENSAJES (Sin alertas molestas)
function mostrarMensaje(texto, tipo) {
    statusMsg.textContent = texto;
    statusMsg.className = tipo; // 'error' o 'success'
    statusMsg.classList.remove('hidden');
}

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Captura de datos
    const personaje = document.getElementById('personaje').value.trim();
    const clase = document.getElementById('clase').value;
    const resets = parseInt(document.getElementById('resets').value, 10);
    const webhookUrl = 'https://discord.com/api/webhooks/1536988431509495921/ZSq7hSUTawa3z_-yujh61wGmjNO1kpoO7UgE3rCMWBRfcSB7Zy44RGyusR-Ry_R44yHA'; // <--- PEGA TU URL AQUÍ

    // Validación
    if (personaje.length < 3) {
        mostrarMensaje('El nombre debe tener al menos 3 caracteres.', 'error');
        return;
    }
    if (isNaN(resets) || resets < 0) {
        mostrarMensaje('Ingresa un número de resets válido.', 'error');
        return;
    }

    // Preparar el envío
    const payload = {
        embeds: [{
            title: "⚔️ Nuevo Recluta: BLESSED",
            color: 0x00d4ff,
            fields: [
                { name: "Personaje", value: personaje, inline: true },
                { name: "Clase", value: clase, inline: true },
                { name: "Resets", value: resets.toString(), inline: true }
            ],
            footer: { text: "Bricourt Networks System" }
        }]
    };

    try {
        const res = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            mostrarMensaje('¡Postulación enviada con éxito!', 'success');
            formulario.reset();
        } else {
            throw new Error('Error de servidor');
        }
    } catch (err) {
        mostrarMensaje('Hubo un error al enviar. Revisa el Webhook.', 'error');
    }
});
