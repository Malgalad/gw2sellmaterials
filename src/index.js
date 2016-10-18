import React from 'react';
import { render } from 'react-dom';

import App from './components/App';
import { getItem } from './services/localStorage';

render(
  <App
    apiKey={getItem('apiKey')}
    minValue={getItem('minValue', 0)}
    filterItems={getItem('filterItems')}
    priceCategory={getItem('priceCategory', 'sells')}
  />,
  document.querySelector('#root')
);
