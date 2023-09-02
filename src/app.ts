import { Express } from 'express';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import controllers from './controllers';

// setup
const app: Express = express();
app.set('PORT', 3555);
// other configs goes here

// middlewares goes here
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes goes here

// starting server
app.listen(app.get('PORT'), () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${app.get('PORT')}`);
});

