import React, { useState, useEffect } from "react";
import { usePokedex } from "../../services/pokedexApi";
import "./styles.css";

// Link for pokedex reference
// https://www.pokemon.com/us/pokedex/

// interface Pokemon {
//    id: Number;
//    name: String;
//    types: String[];
//    image: String;
// }

const Pokedex = () => {
  const {
    fetchPokemon,
    pokemon = [],
    isLoading = false,
    error = "",
  } = usePokedex();

  const [value, setValue] = useState(0);

  const useForceUpdate = () => {
    console.log("here", value)
    setValue((value) => value + 1);
  }
  
  useEffect(() => {
    fetchPokemon();
  }, [value]);
  
  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }

  return (
    <div className="App">
      <div className="centerText">
      <h1>Hello from the Pokemons</h1>
      <p>Value: {value}</p>

      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Something's Wrong</h1>}
      </div>

      <div className="pokemons">
        <div className="pokemongrid">
          {!isLoading && pokemon.map((pokemonrec, i) => (
            <div key={i}>
              <img src={pokemonrec.image} alt={pokemonrec.name} />
              <div className="pokemon-id">#{addLeadingZeros(pokemonrec.id, 3)}</div>
              <div className="pokemon-name">{pokemonrec.name}</div>
              <div className="pokemon-type">
                {pokemonrec.types.map((type, i) => {
                  return <div key={i} className={`type type-${type}`}>{type}</div>;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="load-more-area">
        <div className="load-more" onClick={useForceUpdate}>Load more Pokemon</div>
      </div>
    </div>
  );
};

export default Pokedex;
