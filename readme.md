# React Pokemon

This was from one of technical interviews where I was asked to render a list of Pokemons.

**Notes:**
**_/src/services/pokedexApi.tsx_** :: this file was created and act like an API endpoint. It uses axios to get data from the pokemon endpoint, and use promises to return the data to the calling components. The returned data includes:

- **id**: pokemon id
- **name**: name of the pokemon
- **image**: the pokemon image
- **types**: pokemon's type or power

I was tasked to modify the two files in the screens folder:

- **index.jsx**: this renders the output on the screen
- **styles.css**: this is the stylesheet for the above component

### What Works?

The data was fetched correctly and renders onto the page. The pokemons are displayed using CSS grid to be responsive. It also has color-coded powers and types for each pokemon.

### What doesn't work (yet to come)?

The "Load More Pokemons" button doesn't seem to work. When the fetchPokemon function is called, the state variable "pokemon" returns nothing even though there are pokemons displayed on the screen.

## Checking it out

You are welcome to check it out and give me feedback. I use yarn as its package manager.

    $ yarn
    $ yarn dev
