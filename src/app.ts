import { Express } from 'express';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import controllers from './controllers';

// setup
const app: Express = express();
app.set('PORT', process.env.PORT);
// other configs goes here

// middlewares goes here
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

// routes goes here
controllers(app);

// starting server
app.listen(app.get('PORT'), () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${app.get('PORT')}`);
});

