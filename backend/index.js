import express from 'express'
import dotenv  from 'dotenv'
import route from './routes/route.js';
import { connectDb } from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "https://zygobiteauthsystem.vercel.app",
    credentials:true
}))
app.use(cookieParser())
app.use('/', route)

const port = process.env.PORT || 5000 ;
app.listen(port, ()=>{
    connectDb()
    console.log(`server connected on port ${port}`)
})