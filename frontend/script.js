const apiUrl = 'http://localhost:3000/alunos';

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

async function fetchAlunos() {
  try {
    const res = await fetch(apiUrl);
    const alunos = await res.json();
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
    li.textContent = `${aluno.nome} ${aluno.apelido} — ${aluno.curso} (Ano: ${aluno.anocurso}) - Idade: ${aluno.idade}`;

    // Botão Editar
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Editar';
    btnEdit.addEventListener('click', () => {
      startEditAluno(aluno);
    });

    // Botão Apagar
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Apagar';
    btnDelete.addEventListener('click', () => {
      deleteAluno(aluno.id);
    });

    li.appendChild(btnEdit);
    li.appendChild(btnDelete);

    alunosList.appendChild(li);
  });
}

function startEditAluno(aluno) {
  editMode = true;
  inputId.value = aluno.id;
  inputNome.value = aluno.nome;
  inputApelido.value = aluno.apelido;
  inputCurso.value = aluno.curso;
  inputAnoCurso.value = aluno.anocurso;
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

  // Validação idade mínima
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
      // Editar aluno
      const id = inputId.value;
      const res = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!res.ok) throw new Error('Erro ao atualizar aluno');
      cancelEdit();
    } else {
      // Adicionar novo aluno
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alunoData)
      });
      if (!res.ok) throw new Error('Erro ao adicionar aluno');
      form.reset();
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

// Carregar alunos quando a página abrir
fetchAlunos();
