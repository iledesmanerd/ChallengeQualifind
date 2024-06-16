import { Pokemon } from '../../infrastructure/entity/pokemon.entity';
import { PokemonRepository } from '../../infrastructure/repositories/pokemonRepository';
import { IPokemonCreateDTO, IPokemonUpdateDTO } from '../interface/IPokemon';

export class PokemonService {
  private pokemonRepository: PokemonRepository;

  constructor() {
    this.pokemonRepository = new PokemonRepository();
  }

  async getAllPokemon(): Promise<Pokemon[]> {
    return await this.pokemonRepository.findAll();
  }

  async getPokemonById(id: number): Promise<Pokemon | null> {
    return await this.pokemonRepository.findById(id);
  }

  async createPokemon(pokemonData: IPokemonCreateDTO): Promise<Pokemon> {
    const newPokemon = new Pokemon();
    newPokemon.name = pokemonData.name;
    newPokemon.type = pokemonData.type;
    newPokemon.level = pokemonData.level;
    return await this.pokemonRepository.create(newPokemon);
  }

  async updatePokemon(id: number, updateData: IPokemonUpdateDTO): Promise<Pokemon | null> {
    return await this.pokemonRepository.update(id, updateData);
  }

  async deletePokemon(id: number): Promise<void> {
    await this.pokemonRepository.delete(id);
  }
}

