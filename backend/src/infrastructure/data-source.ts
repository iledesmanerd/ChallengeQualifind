import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Pokemon } from './entity/pokemon.entity';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DATABASE || "pokemon",
  synchronize: false,
  logging: false,
  migrationsRun: true,
  entities: [Pokemon],
  migrations: [__dirname + '/migrations/*.{ts,js}'], // Adjust the path to your migrations folder
  migrationsTableName: 'history',
});