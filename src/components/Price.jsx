import React from 'react';

import './Price.css';
import { renderService } from '../constants/endpoints';
import icons from '../constants/icons';

const Price = ({ coins, className }) => {
  const gold = Math.floor(coins / 10000);
  const silver = Math.floor((coins - gold * 10000) / 100);
  const copper = coins - gold * 10000 - silver * 100;

  return (
    <span className={className}>
      {
        gold > 0 &&
        <span className="amount">
          { gold }
          <img
            src={`${renderService}/${icons.ui_coin_gold.signature}/${icons.ui_coin_gold.file_id}.png`}
            className="coin"
            alt="Gold"
            title="Gold"
          />
        </span>
      }
      {
        silver > 0 &&
        <span className="amount">
          { silver }
          <img
            src={`${renderService}/${icons.ui_coin_silver.signature}/${icons.ui_coin_silver.file_id}.png`}
            className="coin"
            alt="Silver"
            title="Silver"
          />
        </span>
      }
      {
        copper > 0 &&
        <span className="amount">
          { copper }
          <img
            src={`${renderService}/${icons.ui_coin_copper.signature}/${icons.ui_coin_copper.file_id}.png`}
            className="coin"
            alt="Copper"
            title="Copper"
          />
        </span>
      }
    </span>
  );
};

export default Price;
