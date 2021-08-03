import  express from 'express';
import { routes } from './routes/routes';
import bodyParser from 'body-parser';
const app = express();


// app.use(express.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(routes)



app.listen(3333, () => {
    console.log("server running");  
})
export default app;