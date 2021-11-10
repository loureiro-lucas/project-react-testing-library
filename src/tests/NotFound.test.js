import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('test "NotFound" page', () => {
  it('there is a "h2" heading with the correct text', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', { level: 2, name: /Page requested not found/ }));
  });

  it('there is a image with the correct URL', () => {
    renderWithRouter(<NotFound />);

    const images = screen.getAllByRole('img');

    expect(images[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
