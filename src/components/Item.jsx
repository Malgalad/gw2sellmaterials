import React from 'react';
import classnames from 'classnames';

import './Item.css';
import Price from './Price';

const Item = ({ icon, name, count, sellsFor, rarity, minValue }) => (
  <div className={classnames('material', rarity, { disabled: count * sellsFor < minValue })}>
    <Price coins={count * sellsFor} className="sellsFor" />
    <span className="count">{ count }</span>
    <img
      src={icon}
      title={name}
      alt={name}
      className="icon"
    />
  </div>
);

export default Item;
