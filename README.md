# Trabalho prático 1

## Descrição

Este é um projeto de API RESTful para gerenciar alunos e cursos. A API permite realizar operações CRUD em alunos.

**Autora:** Joana Santos

## Como usar

### Instalação

1. Clone este repositório.
2. Navegue até a pasta do projeto.
3. Execute `npm install` para instalar as dependências.

### Configuração

1. Adicione a variável `MONGO_URI` com a URL de conexão do MongoDB Atlas, ou edite diretamente a constante no `server.js`.

### Execução

1. Execute `npm start` para iniciar o servidor backend.
2. A API estará disponível em `http://localhost:3000`.

### Endpoints principais

#### Alunos
- `GET /alunos`: Lista todos os alunos.
- `GET /alunos/:id`: Obtém um aluno pelo ID.
- `POST /alunos`: Cria um novo aluno.
- `PUT /alunos/:id`: Atualiza um aluno pelo ID.
- `DELETE /alunos/:id`: Apaga um aluno pelo ID.

#### Cursos
- `GET /cursos`: Lista todos os cursos.

### URLs de Produção

- Frontend: https://santosjoanita.vercel.app/
- API: https://twt1restapi-santosjoanita.onrender.com/

---

> Para mais detalhes sobre a estrutura, documentação Swagger e exemplos de uso, consulte os diretórios `/backend/docs` e `/mock-data`.