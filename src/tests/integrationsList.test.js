import React from 'react';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe('tela de listagem de integrações', () => {
  describe('ao clicar na categoria 1, suas integrações são renderizadas', () => {
    it('número de integrações da categoria 1', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons.length).toBe(2);
    });

    it('primeira integração da categoria 1', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons[0]).toHaveTextContent(/empresa 1/i);
    });

    it('segunda integração da categoria 1', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/1');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons[1]).toHaveTextContent(/empresa 2/i);
    });
  });

  describe('ao clicar na categoria 2, suas integrações são renderizadas', () => {
    it('número de integrações da categoria 2', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/2');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons.length).toBe(2);
    });

    it('primeira integração da categoria 2', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/2');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons[0]).toHaveTextContent(/empresa 3/i);
    });

    it('segunda integração da categoria 2', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/2');

      const integrationButtons = await screen.findAllByTestId("integration-button");
      expect(integrationButtons[1]).toHaveTextContent(/empresa 4/i);
    });
  });

  describe('modal de detalhes da integração', () => {
    it('segunda integração da categoria 2', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/2');

      const integrationDetailsButton = await screen.findAllByText(/ver mais/i);
      userEvent.click(integrationDetailsButton[1]);

      const integrationEmail = await screen.findByText(/responsavel@email.com/i);
      expect(integrationEmail).toBeInTheDocument();
    });
  });
});
