import { APP_PORT } from './config'
import app from './app'
import './db'

app.listen(APP_PORT)
console.log('Server: '+APP_PORT)