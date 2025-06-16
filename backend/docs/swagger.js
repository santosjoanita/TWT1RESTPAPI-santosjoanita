const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Alunos',
      version: '1.0.0',
      description: 'Documentação da API de Alunos',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor local' },
      { url: 'https://twt1restapi-santosjoanita.onrender.com', description: 'Servidor Render' }
    ],
  },
  apis: ['../backend/server.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
