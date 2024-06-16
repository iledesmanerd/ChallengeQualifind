import { useState } from 'react';
import { postPokemon } from '../services/CreatePokémon';
import { toast } from 'react-toastify';

const usePokemonForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [level, setLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPokemon = { name, type, level };
    setIsLoading(true);

    try {
    
     await postPokemon(newPokemon);

      // Reset form
      setName('');
      setType('');
      setLevel(0);
      toast.success('Pokémon created successfully!');
    } catch (error) {
      toast.error('Failed to create new Pokémon. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    type,
    setType,
    level,
    setLevel,
    isLoading,
    handleSubmit,
  };
};

export default usePokemonForm;
