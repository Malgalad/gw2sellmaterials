import React from 'react';
import keyBy from 'lodash.keyby';
import getProp from 'lodash.get';

import styles from './Category.css';
import { getItems } from '../api/items';
import { getPrices } from '../api/prices';
import Item from './Item';

export default class Category extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isReady: false,
      items: [],
      itemPricesById: {},
      itemCountById: keyBy(props.itemsCount, 'id'),
    };

  }

  componentWillMount() {
    Promise.all([
      getItems(this.props.items),
      getPrices(this.props.items)
    ])
      .then(([items, prices]) => this.setState({ items, itemPricesById: keyBy(prices, 'id'), isReady: true }));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.itemsCount !== this.props.itemsCount) {
      this.setState({ itemCountById: keyBy(nextProps.itemsCount, 'id') })
    }
  }

  render() {
    const { isReady, items, itemCountById, itemPricesById } = this.state;
    const { name, minValue, filterItems } = this.props;

    return (
      <div className={styles.category}>
        <h3>{name}</h3>
        {
          isReady ?
            items
              .map((item) => {
                const count = getProp(itemCountById[item.id], 'count', 0);
                const sellsFor = getProp(itemPricesById[item.id], 'sells.unit_price', 0);

                if (count * sellsFor < minValue && filterItems) {
                  return null;
                }

                return <Item
                  key={item.id}
                  {...item}
                  count={count}
                  sellsFor={sellsFor}
                  minValue={minValue}
                />;
              }) :
            <p>Loading...</p>
        }
      </div>
    );
  }
};
