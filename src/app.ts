import type { Express } from 'express'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import 'dotenv/config'
import controllers from './controllers'
import path from 'path'

import { injectResponseTypes } from './middlewares/response.middleware';

import { create } from 'express-handlebars'

const hbs = create({
  layoutsDir: path.join(__dirname, './views/layouts'),
  partialsDir: path.join(__dirname, './views/partials'),
  extname: '.hbs',
  defaultLayout: 'main'
})

// setup
const app: Express = express()
app.set('PORT', process.env.PORT)
// other configs goes here
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './views'))

// middlewares goes here
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(injectResponseTypes)
app.use(express.static(path.join(__dirname, './public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// routes goes here
controllers(app)

// starting server
app.listen(app.get('PORT'), () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${app.get('PORT')}`)
})
