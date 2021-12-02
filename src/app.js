import express from 'express'
import morgan from 'morgan'
import apiRoutes  from './routes/api.routes'
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()
// Only development
app.use(morgan('dev'))
// Request format json
app.use(express.json())

app.get('/', (req,res) => {
  res.json('welcome api with node js')  
})

app.use('/api/auth', apiRoutes)

export default app