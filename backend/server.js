const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const MONGO_URL = 'mongodb+srv://santosjoana:Joana133@cluster0.ilmtzyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'Academicos';

let db, alunosCollection, cursosCollection;

MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db(DB_NAME);
    alunosCollection = db.collection('Alunos');
    cursosCollection = db.collection('Cursos');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

function isValidObjectId(id) {
  return /^[a-fA-F0-9]{24}$/.test(id);
}

app.get("/", (req, res) => {
  res.send('<h1>Olá TW ECGM</h1>');
});

// Listar todos os alunos
app.get("/alunos", async (req, res) => {
  try {
    const alunos = await alunosCollection.find().toArray();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter alunos" });
  }
});

// Listar aluno específico por ID
app.get("/alunos/:id", async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const aluno = await alunosCollection.findOne({ _id: new ObjectId(id) });
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(aluno);
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar aluno" });
  }
});

// Listar alunos por nome (exato)
app.get("/alunos/nome/:nome", async (req, res) => {
  const nome = req.params.nome;
  try {
    const alunos = await alunosCollection.find({ nome: nome }).toArray();
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao consultar alunos por nome" });
  }
});

// Listar cursos
app.get("/cursos", async (req, res) => {
  try {
    const cursos = await cursosCollection.find().toArray();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter cursos" });
  }
});

// Adicionar novo aluno
app.post("/alunos", async (req, res) => {
  const novoAluno = req.body;
  try {
    const resultado = await alunosCollection.insertOne(novoAluno);
    res.status(201).json({ _id: resultado.insertedId, ...novoAluno });
  } catch (err) {
    res.status(500).json({ error: "Erro ao adicionar aluno" });
  }
});

// Atualizar aluno por ID
app.put("/alunos/:id", async (req, res) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  const dados = req.body;
  try {
    const resultado = await alunosCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: dados }
    );
    if (resultado.matchedCount === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json({ _id: id, ...dados });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

// Apagar aluno por ID
app.delete("/alunos/:id", async (req, res) => {
  const id = req.params.id;
    console.log("ID recebido no DELETE:", id);  // <-- ADICIONA ISTO
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const resultado = await alunosCollection.deleteOne({ _id: new ObjectId(id) });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json({ msg: "Aluno removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao apagar aluno" });
  }
});
