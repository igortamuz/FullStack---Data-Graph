import cors from 'cors'
import express from 'express';
import dotenv from 'dotenv';
import { participationRouter } from './routers'; 
import { connect } from './database/db';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.get('/status', (_req, res) => res.send('OK!'));
app.use('/participation', participationRouter); 

async function startServer() {
  try {
    await connect(); 
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server running on port: ${port}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

export { app };
startServer();
