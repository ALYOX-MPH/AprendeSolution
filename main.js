// main.js
// Obtener y mostrar libros
async function obtenerYMostrarLibros() {
    try {
        const respuesta = await fetch('http://localhost:3000/libros');
        const libros = await respuesta.json();

        const librosContainer = document.getElementById('librosContainer');
        librosContainer.innerHTML = '';

        libros.forEach((libro) => {
            const libroHTML = `
                <div class="col-md-4 mb-3">
                    <div class="card">
                        <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo}">
                        <div class="card-body">
                            <p class="card-text">${libro.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;

            librosContainer.innerHTML += libroHTML;
        });
    } catch (error) {
        console.error('Error al obtener libros desde el servidor:', error);
    }
}

// Agregar nuevo libro
async function agregarLibro(event) {
    event.preventDefault();
    const form = event.target;

    const nuevoLibro = {
        titulo: form.titulo.value,
        imagen: form.imagen.value,
        descripcion: form.descripcion.value
    };

    try {
        await fetch('http://localhost:3000/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoLibro)
        });

        // Actualizar la lista de libros después de agregar uno nuevo
        obtenerYMostrarLibros();
    } catch (error) {
        console.error('Error al agregar nuevo libro:', error);
    }
}

// Enviar comentario
async function enviarComentario(event) {
    event.preventDefault();
    const form = event.target;

    const nuevoComentario = {
        comentario: form.comentario.value
    };

    try {
        await fetch('http://localhost:3000/foro', {
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
    obtenerYMostrarLibros();

    const agregarForm = document.getElementById('agregarForm');
    agregarForm.addEventListener('submit', agregarLibro);

    const foroForm = document.getElementById('foroForm');
    foroForm.addEventListener('submit', enviarComentario);
});

// Ruta para manejar la solicitud a la raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a AprendeSolution!');
});
