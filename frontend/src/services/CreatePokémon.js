const API_URL = 'http://localhost:5001/api/pokemon'; // Replace with your backend API URL

const postPokemon = async (pokemon) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemon),
    });

    if (!response.ok) {
      throw new Error('Failed to create new Pokémon');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { postPokemon };
