import express from 'express';
import router from './src/router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js'; // live swagger spec
import swaggerDocument from './swagger.json' with { type: 'json' }; // node swagger.js




const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
} else {

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});



export default app;