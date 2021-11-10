import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing "Favorite Pokémons" page', () => {
  it('when there is no favorite pokemon, the correct message is displayed', () => {
    renderWithRouter(<FavoritePokemons />);

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('when there is favorite pokemons, it must be displayed', () => {
    const numberOfPokemons = 3;
    const pokemonSample = pokemons.slice(0, numberOfPokemons);

    renderWithRouter(<FavoritePokemons pokemons={ pokemonSample } />);

    pokemonSample.forEach(() => {
      expect(screen.findByTestId('pokemon-name')).resolves.toBeInTheDocument();
    });
  });
});
