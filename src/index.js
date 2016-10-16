import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

render(
  <App
    apiKey={localStorage.getItem('apiKey')}
    minValue={localStorage.getItem('minValue')}
    filterItems={localStorage.getItem('filterItems')}
  />,
  document.querySelector('#root')
);
