import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('testing pokemon details page', () => {
  const NEXT_POKEMON = 'next-pokemon';
  const MORE_DETAILS = 'More details';
  it('pokemon detailed info is displayed', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByTestId(NEXT_POKEMON);
    userEvent.click(nextPokemonButton);
    const moreDetailsLink = screen.getByText(MORE_DETAILS);
    userEvent.click(moreDetailsLink);

    expect(screen
      .getByRole('heading', { level: 2, name: `${pokemons[1].name} Details` }));

    expect(moreDetailsLink).not.toBeInTheDocument();

    expect(screen
      .getByRole('heading', { level: 2, name: 'Summary' }));

    const SUMMARY_TEXT = /The flame on its tail shows the strength of its life force./i;
    expect(screen
      .getByText(SUMMARY_TEXT)).toBeInTheDocument();
  });

  it('there is a maps session in the page', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByTestId(NEXT_POKEMON);
    userEvent.click(nextPokemonButton);
    const moreDetailsLink = screen.getByText(MORE_DETAILS);
    userEvent.click(moreDetailsLink);

    expect(screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${pokemons[1].name}` }));

    pokemons[1].foundAt.forEach(({ location, map }) => {
      expect(screen.getByText(location)).toBeInTheDocument();

      const locationImages = screen.getAllByAltText(`${pokemons[1].name} location`);

      const thisLocationImage = locationImages
        .find((image) => image.src === map);

      expect(thisLocationImage).toBeInTheDocument();

      expect(thisLocationImage).toHaveAttribute('alt', `${pokemons[1].name} location`);
    });
  });

  it('user can favorite pokemon', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByTestId(NEXT_POKEMON);
    userEvent.click(nextPokemonButton);
    const moreDetailsLink = screen.getByText(MORE_DETAILS);
    userEvent.click(moreDetailsLink);

    const favoriteCheckbox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteCheckbox).toBeInTheDocument();
  });
});
