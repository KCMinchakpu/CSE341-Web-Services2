const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Book API',
    description: 'This is an API for Creating, Updating and Deleting Books Details in a Database'
  },
  host: 'localhost:8085',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);