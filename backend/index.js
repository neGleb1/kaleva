import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('*', function(req, res){
    res.status(404).json({ message: 'Resource not found' });
});

app.use((err, req, res, next) => {
    const status = err.status ? err.status : 500;
    const message = status === 500 ? "Something went wrong, try again later" : err.message;
    const errors = err.error;
    res.status(status).json({ status, message, error: errors });
});

const port = process.env.PORT;
app.listen(port);

export {pool};