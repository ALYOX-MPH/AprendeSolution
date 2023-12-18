const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    archivo: {
        nombre: String,
        mimetype: String,
        tamaño: Number,
        path: String,
    },
});

const Libro = mongoose.model('Libro', libroSchema);

module.exports = Libro;
