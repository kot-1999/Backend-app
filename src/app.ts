import express from 'express';
import v1 from './api/v1';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/patients', v1());

export default app;