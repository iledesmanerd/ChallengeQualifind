import { Request, Response } from 'express';
import { PokemonService } from '../core/services/pokemonService';
import { IPokemonCreateDTO, IPokemonUpdateDTO } from '../core/interface/IPokemon';

export class PokemonController {
  private pokemonService: PokemonService;

  constructor() {
    this.pokemonService = new PokemonService();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const pokemons = await this.pokemonService.getAllPokemon();
      res.json(pokemons);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving pokemons', error });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const pokemon = await this.pokemonService.getPokemonById(parseInt(req.params.id, 10));
      if (pokemon) {
        res.json(pokemon);
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving pokemon', error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const pokemonData: IPokemonCreateDTO = req.body;
      const newPokemon = await this.pokemonService.createPokemon(pokemonData);
      res.json(newPokemon);
    } catch (error) {
      res.status(500).json({ message: 'Error creating pokemon', error });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const updateData: IPokemonUpdateDTO = req.body;
      const updatedPokemon = await this.pokemonService.updatePokemon(parseInt(req.params.id, 10), updateData);
      if (updatedPokemon) {
        res.json(updatedPokemon);
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating pokemon', error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.pokemonService.deletePokemon(parseInt(req.params.id, 10));
      res.json({ message: 'Pokemon deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting pokemon', error });
    }
  }
}
