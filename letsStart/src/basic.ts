// javascript ver import
// const express = require('express');
// const app = express();

// typescript ver import
import * as express from 'express';
const app: express.Express = express();

const port: number = 8000;

app.listen(port, () => {
  console.log('server connect');
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.post('/test', (req, res) => {
  res.send({ person: 'min' });
});
