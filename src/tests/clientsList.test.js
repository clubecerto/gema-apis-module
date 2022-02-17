import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('tela de listagem de clientes', () => {
  describe('ao clicar na primeira integração, seus clientes são renderizadas', () => {
    it('quantidade de clientes', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1/1');

      const clientNames = await screen.findAllByTestId("client-name");
      expect(clientNames.length).toBe(2);
    });

    it('primeiro cliente da primeira integração apresenta nome correto', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1/1');

      const clientNames = await screen.findAllByTestId("client-name");
      expect(clientNames[0]).toHaveTextContent(/cliente 1/i);
    });

    it('segundo cliente da quarta integração apresenta nome correto', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/2/4');

      const clientNames = await screen.findAllByTestId("client-name");
      expect(clientNames[1]).toHaveTextContent(/cliente 8/i);
    });
  });

  describe('modal de detalhes do cliente', () => {
    it('segunda integração da categoria 2', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1/1');

      const clientDetailsButtons = await screen.findAllByText(/ver mais/i);
      userEvent.click(clientDetailsButtons[1]);

      const clientEmail = await screen.findByText(/responsavelteste@email.com/i);
      expect(clientEmail).toBeInTheDocument();
    });
  });
});
