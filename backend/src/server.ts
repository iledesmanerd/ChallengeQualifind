import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './infrastructure/data-source';
import { PokemonController } from './controllers/pokemonController';

const app = express();
const port = 5001;
const pokemonController = new PokemonController();

app.use(cors());

app.use(bodyParser.json());

AppDataSource.initialize().then(() => {
  console.log('Connected to database');

  app.get('/api/pokemon', (req, res) => pokemonController.getAll(req, res));
  app.get('/api/pokemon/:id', (req, res) => pokemonController.getById(req, res));
  app.post('/api/pokemon', (req, res) => pokemonController.create(req, res));
  app.put('/api/pokemon/:id', (req, res) => pokemonController.update(req, res));
  app.delete('/api/pokemon/:id', (req, res) => pokemonController.delete(req, res));

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}).catch(error => {
  console.log('Error connecting to database', error);
});

