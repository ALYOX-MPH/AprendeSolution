const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');  // Agregamos el módulo 'path' para manejar rutas

const app = express();
const PORT = 3071;

mongoose.connect('mongodb://localhost:27017/librosDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a la base de datos MongoDB');
});

const libroSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    imagen: String,
    archivo: {
        nombre: String,
        mimetype: String,
        tamaño: Number,
        path: String,
    },
});

const Libro = mongoose.model('Libro', libroSchema);

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'front')));


app.post('/api/libros', upload.single('archivo'), async (req, res) => {
    try {
        const nuevoLibro = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen,
        };

        const archivo = req.file;

        if (archivo) {
            nuevoLibro.archivo = {
                nombre: archivo.originalname,
                mimetype: archivo.mimetype,
                tamaño: archivo.size,
                path: archivo.path,
            };
        }

        const libroGuardado = await Libro.create(nuevoLibro);

        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        console.error('Error al agregar el libro:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/api/libros', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener la lista de libros:', error);
        res.status(500).send('Error interno del servidor');
    }
});

// Ruta para agregar un nuevo libro
app.post('/agregar.html', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar un nuevo libro' });
    }
});

// Ruta para el foro (simulación, puedes expandir esto según tus necesidades)
app.post('/foro', (req, res) => {
    const comentario = req.body.comentario;
    // Aquí puedes almacenar el comentario en la base de datos o realizar otras acciones.
    res.json({ mensaje: 'Comentario recibido' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
