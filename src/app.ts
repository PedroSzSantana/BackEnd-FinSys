import  express  from "express"
import routes from "./routes/routes"
import { startConnection } from "./infra/db/mongo/mongodb"

const app = express()
app.use(express.json())
startConnection()
app.use(routes)

export default app