import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';

describe('Testa a página de Configurações da aplicação', () => {
  it('Testa se o título está presente', () => {
    renderWithRouterAndRedux(<App />, {}, '/settings');

    const settingsTitle = screen.getByRole('heading', { level: 1, name: /configurações/i });
    expect(settingsTitle).toBeInTheDocument();
  });
});
