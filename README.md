Trabalho Prático nº 1 — TWT1RESTAPI
Joanita Santos

📌 Tema: Consumo e Implementação de APIs RESTful
🎯 Objetivo
Consolidar os conhecimentos em desenvolvimento web, através da criação, consumo e implementação de APIs RESTful, usando tecnologias do ecossistema JavaScript:

Node.js + Express

MongoDB / MongoDB Atlas

JSON-Server

Fetch API

Swagger (opcional)

O projeto simula o ciclo completo de desenvolvimento de uma aplicação web com front-end e back-end separados, incluindo testes e deploy.

🔗 Links do Projeto
🌐 Front-end (Vercel): https://twt-1-restpapi-santosjoanita.vercel.app

🔧 API (Render): [A ser adicionado em breve]

🗂 Estrutura do Projeto
plaintext
Copy
Edit
projeto-raiz/
│
├── /frontend/        ← Interface web (HTML/CSS/JS)
├── /backend/         ← API real com Node.js + MongoDB
├── /mock-server/     ← API simulada com JSON-Server
├── /mock-data/       ← Ficheiro bd.json com os dados
├── /tests/           ← Coleção de testes Postman
├── README.md         ← Instruções e links
└── .gitignore, etc.



🧩 Etapas do Trabalho
✅ Parte 1: Base de Dados em JSON
Criação do ficheiro bd.json com:

Lista de alunos: nome, apelido, curso, anoCurricular

Lista de cursos: nomeDoCurso

📁 Diretório: /mock-data/
📄 Entregável: bd.json

✅ Parte 2: API Simulada com JSON-Server + Testes
Configuração do json-server com o bd.json

Testes de endpoints no Postman

Exportação da coleção de testes

📁 Diretório: /mock-server/
📄 Entregáveis:

Scripts de configuração (ex: package.json)

Coleção .json dos testes no /tests/

✅ Parte 3: Interface Web (CRUD de Alunos)
Página web funcional onde é possível:

Visualizar alunos

Adicionar aluno

Editar aluno

Apagar aluno

Utilização da Fetch API com async/await

📁 Diretório: /frontend/
📄 Entregável: Página ligada à API (simulada ou real)

✅ Parte 4: API RESTful Real (Node.js + MongoDB)
Migração dos dados para o MongoDB Atlas

Implementação da API real com Express e mongoose

Estrutura RESTful com organização MVC (bónus)

📁 Diretório: /backend/
📄 Entregável: Código funcional da API com instruções

✅ Parte 5: Deploy
Front-end feito na plataforma Vercel

Back-end (API real) será feito na plataforma Render

A interface foi ajustada para consumir a nova API (quando estiver ativa)

Render: https://twt1restapi-santosjoanita.onrender.com/
Vercel: https://twt-1-restpapi-santosjoanita.vercel.app/
📄 Entregável:

Links públicos no README.md

Código ajustado com URL correta da API

🟡 Parte 6 (Bónus): Documentação com Swagger
Documentação dos endpoints da API com Swagger

Rota /api-docs incluída

📁 Diretório: /backend/docs/
📄 Entregável: Interface Swagger acessível e funcional

🌿 Sugestão de Branches (Git)
Branch	Descrição
main	Versão estável e final do projeto
dev	Desenvolvimento geral
frontend	Interface do utilizador (HTML/JS)
api	API real com Node e MongoDB
deploy	Versão adaptada para Vercel/Render

📝 Critérios de Avaliação
Critério	Peso
Base de dados JSON	10%
API simulada e testada (Postman)	10%
Interface web funcional	30%
Qualidade da API real (Node.js)	30%
Integração entre front e back-end	10%
Deploy funcional	10%
Bónus (MVC)	+5%
Bónus (Swagger)	+5%

📌 Entrega
A entrega é feita via GitHub Classroom

O repositório deve conter:

Código completo e funcional

Ficheiro README.md com todas as instruções

Links para o front-end (Vercel) e API (Render)