const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nomeDoCurso: { type: String, required: true }
});

module.exports = mongoose.model('Curso', CursoSchema);
