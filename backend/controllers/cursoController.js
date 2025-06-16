const Curso = require('../models/Curso');

exports.getCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar cursos' });
  }
};
