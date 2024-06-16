import { AppDataSource } from '../data-source';
import { Repository } from 'typeorm';
import { Pokemon } from '../entity/pokemon.entity';

export class PokemonRepository {
  private repository: Repository<Pokemon>;

  constructor() {
    this.repository = AppDataSource.getRepository(Pokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return await this.repository.find();
  }

  async findById(id: number): Promise<Pokemon | null> {
    return await this.repository.findOneBy({ id });
  }

  async create(pokemon: Pokemon): Promise<Pokemon> {
    return await this.repository.save(pokemon);
  }

  async update(id: number, updateData: Partial<Pokemon>): Promise<Pokemon | null> {
    const pokemon = await this.repository.findOneBy({ id });
    if (!pokemon) return null;
    this.repository.merge(pokemon, updateData);
    return await this.repository.save(pokemon);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
