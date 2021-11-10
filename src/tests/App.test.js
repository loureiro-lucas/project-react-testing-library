import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('top page navigation links', () => {
  it('if there is a link with the text "Home"', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: 'Home' }));
  });

  it('if there is a link with the text "About"', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: 'About' }));
  });

  it('if there is a link with the text "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: 'Favorite Pokémons' }));
  });
});

describe('redirect when clicking on links', () => {
  it('if clicking on the "Home" link the page is redirected to "/"', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    expect(screen.getByRole('heading', { name: 'Encountered pokémons' }))
      .toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('if clicking on the "About" link the page is redirected to "/about"', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: 'About' }));

    expect(screen.getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it(
    'if clicking on the "Favorite Pokémons" link the page is redirected to "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);

      userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

      expect(screen.getByRole('heading', { name: 'Favorite pokémons' }))
        .toBeInTheDocument();

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );

  it(
    'if the app is redirected to the "Not Found" page when an unknown URL is aces',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/test');

      expect(screen.getByRole('heading', { name: /Page requested not found/i }))
        .toBeInTheDocument();

      const { pathname } = history.location;
      expect(pathname).toBe('/test');
    },
  );
});
