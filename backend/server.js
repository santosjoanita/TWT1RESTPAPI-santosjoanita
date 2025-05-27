const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
app.use(cors());

const port = 3000;
const MONGO_URL = 'mongodb+srv://joaovieitas:123@cursos-alunos.fnksryw.mongodb.net/?retryWrites=true&w=majority&appName=Cursos-Alunos';
const DB_NAME = 'academicos';

MongoClient.connect(MONGO_URL, { useNewUrlParser: true})
    .then(client => {
        db = client.db(DB_NAME);
        alunosCollection = db.collection('alunos');
        cursosCollection = db.collection('cursos');
        app.listen(port, () => {
            console.log('Server is running on http://localhost:${port}');
        });
    })
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.use(express.json());
    
app.get("/", async (req, res) => {
    res.send('<h1>Olá TW ECGM</1>')
})

//Rotas alunos

//listar alunos
app.get("/alunos", async (req, res) => {
    const alunos = await alunosCollection.find().toArray();
    res.json(alunos);
});

//listar aluno especifico (por id)
app.get("/alunos/:id", async (req, res) => {
    console.log(req.params.id);
    const aluno = await alunosCollection.findOne({ _id: ObjectId(req.params.id) });
    console.log(aluno);
    res.json(aluno);
});

//listar alunos especificos (por nome)
app.get("/alunos/nome/:nome", async (req, res) => {
    console.log(req.params.nome);
    const alunos = await alunosCollection.find({ nome: req.params.nome }).toArray();
    console.log(alunos);
    res.json(alunos);
});


//listar cursos
app.get("/cursos", async (req, res) => {
    const cursos = await cursosCollection.find().toArray();
    res.json(cursos);
});

// Adicionar aluno
app.post("/alunos", async (req, res) => {
    const novoAluno = req.body;
    const ultimo = await alunosCollection.find().sort({ cc: -1 }).limit(1).toArray();
    const novoCC = ultimo.length > 0 ? (parseInt(ultimo[0].cc, 10) + 1) : 1;
    novoAluno.cc = novoCC;
    const resultado = await alunosCollection.insertOne(novoAluno);
    res.status(201).json({ _id: resultado.insertedId, ...novoAluno });
});

// Atualizar aluno
app.put("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    const dados = req.body;
    const resultado = await alunosCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: dados }
    );
    if (resultado.matchedCount === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
    }
    res.json({ _id: id, ...dados });
});

// Apagar aluno
app.delete("/alunos/:id", async (req, res) => {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    await alunosCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ msg: "Aluno removido" });
});

function isValidObjectId(id) {
    return /^[a-fA-F0-9]{24}$/.test(id);
}