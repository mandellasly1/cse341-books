
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: 'A simple API for working with books'
    },
    servers: [
      {
        url: '/',
        description: 'Current server'
      }
    ]
  },
  apis: ['./src/router.js', './app.js'] // files to scan for @openapi comments
};

const swaggerSpec = swaggerJsdoc(options);




// Export the spec so app.js can import it
export default swaggerSpec;

