const Aluno = require('../models/Aluno');

exports.getAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar alunos' });
  }
};

exports.getAlunoById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar aluno' });
  }
};

exports.createAluno = async (req, res) => {
  try {
    const novoAluno = new Aluno(req.body);
    await novoAluno.save();
    res.status(201).json(novoAluno);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar aluno' });
  }
};

exports.updateAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar aluno' });
  }
};

exports.deleteAluno = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndDelete(req.params.id);
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json({ message: 'Aluno apagado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao apagar aluno' });
  }
};
