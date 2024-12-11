// Función principal para obtener y mostrar los Pokémon
async function fetchPokemonList() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';
    const container = document.getElementById('pokemon-container');

    try {
        // Solicitar los datos de los primeros 20 Pokémon
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error al obtener la lista de Pokémon: ${response.status}`);
        }

        const data = await response.json();

        // Obtener los detalles
        for (const pokemon of data.results) {
            try {
                const detailsResponse = await fetch(pokemon.url);
                if (!detailsResponse.ok) {
                    throw new Error(`Error al obtener detalles de ${pokemon.name}: ${detailsResponse.status}`);
                }

                const details = await detailsResponse.json();

                // Crear una card para cada Pokémon
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${details.sprites.front_default}" alt="${pokemon.name}" />
                    <h3>${pokemon.name}</h3>
                `;
                container.appendChild(card);

            } catch (error) {
                console.error(`Error al obtener detalles del Pokémon: ${error.message}`);
            }
        }
    } catch (error) {
        console.error(`Error al obtener la lista de Pokémon: ${error.message}`);
    }
}

// Ejecutar la función al cargar el script
fetchPokemonList();
