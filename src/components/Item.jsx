import React from 'react';
import classnames from 'classnames';

import { renderService } from '../constants/endpoints';
import styles from './Item.css';
import Price from './Price';

const Item = ({ icon, name, count, sellsFor, rarity, minValue }) => (
  <div className={classnames(styles.material, styles[rarity], { [styles.disabled]: count * sellsFor < minValue })}>
    <Price coins={count * sellsFor} className={styles.sellsFor} />
    <span className={styles.count}>{ count }</span>
    <img
      src={`${renderService}/${icon.signature}/${icon.file_id}.png`}
      title={name}
      className={styles.icon}
    />
  </div>
);

export default Item;
