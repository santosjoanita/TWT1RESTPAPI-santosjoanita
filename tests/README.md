# Testes da API — Postman

Este diretório contém a coleção de testes Postman utilizada para validar os endpoints da API de alunos e cursos.

## Como usar

1. Abra o Postman.
2. Importe o ficheiro `postman-collection.json` localizado neste diretório.
3. Execute os testes para validar as operações CRUD:
   - Listar alunos
   - Adicionar aluno
   - Editar aluno
   - Apagar aluno
   - Listar cursos

## Dicas
- Certifique-se de que o backend (API) está em execução antes de testar.
- Pode alterar a variável de ambiente no Postman para testar localmente (`http://localhost:3000`) ou em produção (`https://twt1restapi-santosjoanita.onrender.com`).

## Estrutura
- `postman-collection.json`: Coleção de requisições e testes automatizados.
- `README.md`: Este ficheiro de instruções.

---

> Para mais detalhes sobre os endpoints, consulte a documentação Swagger em `/api-docs` ou o README principal do projeto.

