import { Switch, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
