export interface IPokemon {
    id: number;
    name: string;
    type: string;
    level: number;
  }
  
  export interface IPokemonCreateDTO {
    name: string;
    type: string;
    level: number;
  }
  
  export interface IPokemonUpdateDTO {
    name?: string;
    type?: string;
    level?: number;
  }