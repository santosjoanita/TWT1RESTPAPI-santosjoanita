# Documentação Swagger da API

A documentação Swagger da API está disponível em `/api-docs` quando o servidor está em execução.

## Exemplo de documentação (OpenAPI 3.0)

```yaml
openapi: 3.0.0
info:
  title: API de Alunos
  version: 1.0.0
  description: Documentação da API de Alunos
servers:
  - url: http://localhost:3000
    description: Servidor local
  - url: https://twt1restapi-santosjoanita.onrender.com
    description: Servidor Render
paths:
  /alunos:
    get:
      summary: Lista todos os alunos
      responses:
        '200':
          description: Lista de alunos
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    _id:
                      type: string
                    nome:
                      type: string
                    apelido:
                      type: string
                    curso:
                      type: string
                    anoCurricular:
                      type: integer
                    idade:
                      type: integer
```


