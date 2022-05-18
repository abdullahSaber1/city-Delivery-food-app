import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App/App';
import {StateProvider} from './context/StateProvider';
import {initalState} from './context/initalState';
import reducer from './context/reducer';
import {BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
  <Router>
    <StateProvider reducer={reducer} initalState={initalState}>
      <App />
    </StateProvider>
  </Router>
);
