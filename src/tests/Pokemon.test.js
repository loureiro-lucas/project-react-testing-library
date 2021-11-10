import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('testing Pokemon component', () => {
  it('a card with pokemon info is redered', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[1] }
        isFavorite
      />,
    );

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Charmander');

    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Fire');

    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 8.5 kg');

    const pokemonImage = screen.getByAltText('Charmander sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemons[1].image);
  });

  it('theres a "more details" link', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[1] }
        isFavorite
      />,
    );

    const moreDetailsLink = screen.getAllByRole('link', { name: 'More details' })[0];
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pokemons[1].id}`);
  });

  it('page is redirected to more details page when link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getAllByRole('button', { name: 'Próximo pokémon' })[0]);
    userEvent.click(screen.getAllByRole('link', { name: 'More details' })[0]);

    const pageTitle = screen
      .getByRole('heading', { level: 2, name: `${pokemons[1].name} Details` });

    expect(pageTitle)
      .toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[1].id}`);
  });

  it('there is a star icon in favorite pokemons', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[1] }
        isFavorite
      />,
    );

    const favoriteStar = screen
      .getByAltText(`${pokemons[1].name} is marked as favorite`);

    expect(favoriteStar).toBeInTheDocument();
    expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
