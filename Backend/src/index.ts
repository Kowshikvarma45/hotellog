import { Hono } from 'hono'
import { Mainrouter } from './routes'
import { cors } from 'hono/cors'

const app = new Hono()
app.use(cors())

app.route('/api/v1',Mainrouter)


export default app
