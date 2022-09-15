import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testa a página de configurações da aplicação', () => {
  it('1 - Testa se o título está presente', () => {
    renderWithRouterAndRedux(<App />, {}, '/settings');

    const settingsTitle = screen.getByRole('heading', { level: 1, name: /settings/i });
    expect(settingsTitle).toBeInTheDocument();
  });
});
