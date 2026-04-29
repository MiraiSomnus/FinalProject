import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml'
import fs from 'fs';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import filmRoutes from './routes/filmRoutes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
if (process.env !== 'test') app.use(morgan('tiny'));

let specs;
try{
specs = yaml.load(fs.readFileSync('./docs/openapi.yaml', 'utf8'));
}
catch(error){
console.log('Failed to load OpenAPI specifications', error);
process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/films',filmRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = 'Internal Server Error';
  }
  res.status(err.status).json({ error: err.message });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

export default app;

