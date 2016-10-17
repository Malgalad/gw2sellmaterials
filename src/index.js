import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import { getItem } from './services/localStorage';

render(
  <App
    apiKey={getItem('apiKey')}
    minValue={getItem('minValue')}
    filterItems={getItem('filterItems')}
  />,
  document.querySelector('#root')
);
