import React from 'react';

import { renderService } from '../constants/endpoints';
import styles from './Item.css';
import Price from './Price';

export default class Item extends React.Component {
  render() {
    const { icon, name, count, sellsFor, rarity, minValue } = this.props;
    const coins = count * sellsFor;

    return (
      <div className={`${styles.material} ${styles[rarity.toLowerCase()]} ${coins < minValue ? styles.disabled: ''}`}>
        <Price coins={coins} className={styles.sellsFor} />
        <span className={styles.count}>{ count }</span>
        <img
          src={`${renderService}/${icon.signature}/${icon.file_id}.png`}
          title={name}
          className={styles.icon}
        />
      </div>
    );
  }
};
