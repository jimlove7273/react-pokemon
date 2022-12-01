import { useState, useCallback } from "react";
import axios from "axios";

const url = "https://pokeapi.co/api/v2";

export const usePokedex = (
  pageCount = 4,
  isNetworkSlow = false,
  isServiceDown = false
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [pokemon, setPokemon] = useState([]);

  const fetchPokemon = useCallback(() => {
    setIsLoading(true);
    setError("");
    debugger;
    axios
      .get(`${url}/pokemon?limit=${pageCount}&offset=${pokemon.length}`)
      .then((res) => {
        const { data } = res;
        const getPokemonPromises = data?.results.map(({ url }) => {
          return axios.get(url);
        });
        return Promise.all(getPokemonPromises);
      })
      .then((res) => {
        const fetchedPokemon = res?.map(({ data }) => {
          return {
            id: data?.id,
            name: data?.name,
            image: data?.sprites?.front_default,
            types: data?.types.map(({ type: { name } }) => name)
          };
        });

        // mocking network speed and service availability
        const resPromise = new Promise((resolve, reject) => {
          const delay = isNetworkSlow ? 5000 : 0;
          setTimeout(() => {
            if (isServiceDown) {
              reject();
            } else {
              resolve([...pokemon, ...fetchedPokemon]);
            }
          }, delay);
        });

        return resPromise;
      })
      .then((pokemon) => {
        debugger;
        console.log("pokemon in API: ", pokemon);
        setPokemon(pokemon || []);
      })
      .catch((err) => {
        setError(err?.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    fetchPokemon,
    pokemon,
    isLoading,
    error
  };
};
