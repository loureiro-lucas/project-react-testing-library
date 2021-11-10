import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('testing "About" page', () => {
  it('page contains the informations about pokedex', () => {
    renderWithRouter(<About />);

    expect(screen
      .getByText(
        /This application simulates a Pokédex/i,
      ))
      .toBeInTheDocument();

    expect(screen
      .getByText(
        /One can filter Pokémons by type/i,
      ))
      .toBeInTheDocument();
  });

  it('there is a "h2" heading withthe text "About Pokédex"', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', { level: 2, name: 'About Pokédex' }));
  });

  it('there is image with the correct url and alt', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');

    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    expect(image.alt).toBe('Pokédex');
  });
});
