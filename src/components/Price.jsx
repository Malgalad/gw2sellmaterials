import React from 'react';

import style from './Price.css';
import { renderService } from '../constants/endpoints';
import icons from '../constants/icons';

export default class Price extends React.Component {
  render() {
    const { coins, className } = this.props;
    const gold = Math.floor(coins / 10000);
    const silver = Math.floor((coins - gold * 10000) / 100);
    const copper = coins - gold * 10000 - silver * 100;

    return (
      <span className={className}>
        {
          gold > 0 &&
          <span className={style.amount}>
            { gold }
            <img
              src={`${renderService}/${icons.ui_coin_gold.signature}/${icons.ui_coin_gold.file_id}.png`}
              className={style.coin}
              title="Gold"
            />
          </span>
        }
        {
          silver > 0 &&
          <span className={style.amount}>
            { silver }
            <img
              src={`${renderService}/${icons.ui_coin_silver.signature}/${icons.ui_coin_silver.file_id}.png`}
              className={style.coin}
              title="Silver"
            />
          </span>
        }
        {
          copper > 0 &&
          <span className={style.amount}>
            { copper }
            <img
              src={`${renderService}/${icons.ui_coin_copper.signature}/${icons.ui_coin_copper.file_id}.png`}
              className={style.coin}
              title="Copper"
            />
          </span>
        }
      </span>
          );
          }
        };
