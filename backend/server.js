const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const MONGO_URL = 'mongodb+srv://santosjoana:Joana133@cluster0.ilmtzyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'Academicos';

let db, alunosCollection, cursosCollection;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB com Mongoose'))
  .catch(err => console.error('Erro ao conectar com Mongoose', err));

// Controllers
const alunoController = require('./controllers/alunoController');
const cursoController = require('./controllers/cursoController');

// Rotas Alunos
app.get('/alunos', alunoController.getAlunos);
app.get('/alunos/:id', alunoController.getAlunoById);
app.post('/alunos', alunoController.createAluno);
app.put('/alunos/:id', alunoController.updateAluno);
app.delete('/alunos/:id', alunoController.deleteAluno);

// Rotas Cursos
app.get('/cursos', cursoController.getCursos);

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Lista todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   apelido:
 *                     type: string
 *                   curso:
 *                     type: string
 *                   anoCurricular:
 *                     type: integer
 *                   idade:
 *                     type: integer
 */
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

// Swagger (docs/swagger.js)
require('./docs/swagger')(app);

app.get("/", (req, res) => {
  res.send('<h1>Olá TW ECGM</h1>');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
