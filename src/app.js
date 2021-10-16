import express from 'express';
import { v4 } from 'uuid';

const app = express();

app.use(express.json());

app.set('PORT', process.env.PORT || 3000);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/tasks', (req, res) => {
  res.send([]);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send('Bad request');
  }

  res.send({
    description,
    title,
    id: v4()
  });
});

export default app;
