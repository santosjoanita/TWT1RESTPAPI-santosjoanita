// script.js
const apiUrl = 'https://twt1restapi-santosjoanita.onrender.com/alunos';

const form = document.getElementById('aluno-form');
const alunosList = document.getElementById('alunos-list');

const inputId = document.getElementById('aluno-id');
const inputNome = document.getElementById('nome');
const inputApelido = document.getElementById('apelido');
const inputCurso = document.getElementById('curso');
const inputAnoCurso = document.getElementById('anoCurso');
const inputIdade = document.getElementById('idade');

const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-edit');

let editMode = false;
let alunosCache = [];

async function fetchAlunos() {
  console.log('fetchAlunos foi chamado');
  try {
    const res = await fetch(apiUrl);
    const alunos = await res.json();
    alunosCache = alunos;
    renderAlunos(alunos);
  } catch (error) {
    alert('Erro ao buscar alunos.');
    console.error(error);
  }
}

function renderAlunos(alunos) {
  alunosList.innerHTML = '';

  alunos.forEach(aluno => {
    const li = document.createElement('li');

    // Info div
    const infoDiv = document.createElement('div');
    infoDiv.className = 'aluno-info';
    infoDiv.textContent = `${aluno.nome} ${aluno.apelido} — ${aluno.curso} (Ano: ${aluno.anoCurso || aluno.anocurso}) - Idade: ${aluno.idade} `;

    // Actions div
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'aluno-actions';

    // Botão Editar
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';
    btnEdit.addEventListener('click', () => {
      startEditAluno(aluno);
    });

    // Botão Apagar
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Apagar';
    // Use aluno._id or aluno.id, whichever exists
    const alunoId = aluno._id || aluno.id;
    btnDelete.addEventListener('click', () => {
      if (alunoId) {
        deleteAluno(alunoId.toString());
      } else {
        alert('ID do aluno não encontrado!');
      }
    });

    actionsDiv.appendChild(btnEdit);
    actionsDiv.appendChild(btnDelete);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);
    alunosList.appendChild(li);
  });
}

function startEditAluno(aluno) {
  editMode = true;
  // Use aluno._id or aluno.id, whichever exists
  const alunoId = aluno._id || aluno.id;
  inputId.value = alunoId ? alunoId.toString() : '';
  inputNome.value = aluno.nome;
  inputApelido.value = aluno.apelido;
  inputCurso.value = aluno.curso;
  inputAnoCurso.value = aluno.anoCurso || aluno.anocurso;
  inputIdade.value = aluno.idade;

  submitBtn.textContent = 'Guardar';
  cancelBtn.style.display = 'inline-block';
}

function cancelEdit() {
  editMode = false;
  form.reset();
  inputId.value = '';
  submitBtn.textContent = 'Adicionar';
  cancelBtn.style.display = 'none';
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (parseInt(inputIdade.value) < 18) {
    alert('A idade mínima é 18 anos.');
    return;
  }

  const alunoData = {
    nome: inputNome.value.trim(),
    apelido: inputApelido.value.trim(),
    curso: inputCurso.value.trim(),
    anocurso: Number(inputAnoCurso.value),
    idade: Number(inputIdade.value)
  };

  try {
    if (editMode) {
      const id = inputId.value;
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!res.ok) throw new Error('Erro ao atualizar aluno');
      // Do not call cancelEdit() here, so the form keeps the data
    } else {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!res.ok) throw new Error('Erro ao adicionar aluno');
      form.reset();
      // Show success message
      const msg = document.getElementById('success-message');
      msg.textContent = 'Aluno adicionado com sucesso';
      msg.style.display = 'block';
      setTimeout(() => { msg.style.display = 'none'; }, 2500);
    }
    fetchAlunos();
  } catch (error) {
    alert(error.message);
    console.error(error);
  }
});

cancelBtn.addEventListener('click', cancelEdit);

async function deleteAluno(id) {
  if (confirm('Tem a certeza que deseja apagar este aluno?')) {
    try {
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        alert('Erro ao apagar aluno!');
      } else {
        fetchAlunos();
      }
    } catch (error) {
      alert('Erro na comunicação com o servidor.');
      console.error(error);
    }
  }
}

// Preencher dropdown de cursos
async function preencherCursos() {
  try {
    // Try frontend path first (for Vercel/public hosting)
    let res = await fetch('bdcursos.json');
    if (!res.ok) {
      // fallback to mock-data for local/dev
      res = await fetch('/mock-data/bdcursos.json');
    }
    const cursos = await res.json();
    inputCurso.innerHTML = '<option value="">Selecione um curso</option>';
    cursos.forEach(curso => {
      const opt = document.createElement('option');
      opt.value = curso.nomeDoCurso;
      opt.textContent = curso.nomeDoCurso;
      inputCurso.appendChild(opt);
    });
  } catch (e) {
    console.error('Erro ao carregar cursos:', e);
  }
}

document.getElementById('sort-az').addEventListener('click', () => {
  const sorted = [...alunosCache].sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
  renderAlunos(sorted);
});

fetchAlunos();
preencherCursos();
