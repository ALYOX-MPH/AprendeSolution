// agre.js
// Configuración del formulario de agregar libros en el frontend

async function agregarLibro(event) {
    event.preventDefault();
    const form = event.target;

    const nuevoLibro = {
        titulo: form.titulo.value,
        imagen: form.imagen.value,
        descripcion: form.descripcion.value
    };

    try {
        await fetch('http://localhost:3071/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoLibro)
        });

        // Puedes agregar lógica adicional aquí, como mostrar un mensaje de éxito, etc.
    } catch (error) {
        console.error('Error al agregar nuevo libro:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const agregarForm = document.getElementById('agregarForm');
    agregarForm.addEventListener('submit', agregarLibro);
});
