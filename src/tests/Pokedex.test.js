import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing pokedex component', () => {
  it('there is a h2 heading with the text "Encountered pokémons"', () => {
    const pokemonsSample = pokemons.slice(0, 2);

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsSample }
        isPokemonFavoriteById={ { 4: false, 10: false, 23: false } }
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Encountered pokémons' }))
      .toBeInTheDocument();
  });

  it('when "next" button is clicked, next pokémon is displayed', () => {
    const pokemonsSample = pokemons.slice(0, 2);

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsSample }
        isPokemonFavoriteById={ { 4: false, 10: false, 23: false } }
      />,
    );

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    expect(nextButton).toBeInTheDocument();

    pokemonsSample.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);

      userEvent.click(nextButton);
    });
  });

  it('only one pokemon is displayed at a time', () => {
    const pokemonsSample = pokemons.slice(0, 2);

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsSample }
        isPokemonFavoriteById={ { 4: false, 10: false, 23: false } }
      />,
    );

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemonsSample.forEach(() => {
      expect((screen.getAllByTestId('pokemon-name')).length).toBe(1);

      userEvent.click(nextButton);
    });
  });

  it('there is one filter button for pokemon type', () => {
    const pokemonsSample = pokemons.slice(0, 2);

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsSample }
        isPokemonFavoriteById={ { 4: false, 10: false, 23: false } }
      />,
    );

    const pokemonTypes = pokemonsSample.reduce((types, { type }) => [...types, type], []);

    pokemonTypes.forEach((type) => {
      expect(screen.getByRole('button', { name: type }))
        .toHaveAttribute('data-testid', 'pokemon-type-button');
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    });
  });

  it('there is always a resset filters button on the page', () => {
    const pokemonsSample = pokemons.slice(0, 2);

    renderWithRouter(
      <Pokedex
        pokemons={ pokemonsSample }
        isPokemonFavoriteById={ { 4: false, 10: false, 23: false } }
      />,
    );

    const resetButton = screen.getByRole('button', { name: 'All' });
    expect(resetButton).toBeInTheDocument();

    const pokemonTypes = pokemonsSample.reduce((types, { type }) => [...types, type], []);
    const sampleFilterButton = screen.getByRole('button', { name: pokemonTypes[1] });
    userEvent.click(sampleFilterButton);
    expect(resetButton).toBeInTheDocument();

    userEvent.click(resetButton);
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemonsSample.forEach((pokemon) => {
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemon.type);

      userEvent.click(nextButton);
    });
  });
});
