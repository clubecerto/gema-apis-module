import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App'

describe('tela de listagem de categorias', () => {
  it('todos botões de categorias são renderizados', async () => {
    renderWithRouter(<App />)

    const categoryButtons = await screen.findAllByTestId("category-button");

    expect(categoryButtons.length).toBe(2);
  });

  it('primeiro botão tem o texto correto', async () => {
    renderWithRouter(<App />)

    const categoryButtons = await screen.findAllByTestId("category-button");

    expect(categoryButtons[0]).toHaveTextContent(/categoria 1/i);
  });

  it('segundo botão tem o texto correto', async () => {
    renderWithRouter(<App />)

    const categoryButtons = await screen.findAllByTestId("category-button");

    expect(categoryButtons[1]).toHaveTextContent(/categoria 2/i);
  });
});
