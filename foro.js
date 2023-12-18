// foro.js
// Configuración del formulario del foro en el frontend

async function enviarComentario(event) {
    event.preventDefault();
    const form = event.target;

    const nuevoComentario = {
        comentario: form.comentario.value
    };

    try {
        await fetch('http://localhost:3071/foro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoComentario)
        });

        // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito, etc.
    } catch (error) {
        console.error('Error al enviar comentario:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const foroForm = document.getElementById('foroForm');
    foroForm.addEventListener('submit', enviarComentario);
});
