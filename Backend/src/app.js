import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();


app.use(express.json());
app.use(cookieParser());


// using cors here for getting API calls from frontend

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// import all routes here
import authRouter from './routes/auth.routes.js';
import interviewRouter from './routes/interview.routes.js';


// using imported routes here

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);


export default app;