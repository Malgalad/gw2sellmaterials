import React from 'react';
import keyBy from 'lodash.keyby';
import getProp from 'lodash.get';
import curryRight from 'lodash.curryright';

import './Category.css';
import { getItems } from '../api/items';
import { getPrices } from '../api/prices';
import Item from './Item';
import Price from './Price';

const curriedGetProp = curryRight(getProp);
const getCount = curriedGetProp('count', 0);

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
    const { name, minValue, filterItems, priceCategory } = this.props;
    const getPrice = curriedGetProp(`${priceCategory}.unit_price`, 0);
    let totalCost = 0;
    let filteredItems = 0;

    const renderedItems = items.map((item) => {
      const count = getCount(itemCountById[item.id]);
      const sellsFor = getPrice(itemPricesById[item.id]);
      totalCost += count * sellsFor;

      if (count * sellsFor < minValue && filterItems) {
        totalCost -= count * sellsFor;
        return null;
      }

      filteredItems += 1;

      return <Item
        key={item.id}
        {...item}
        count={count}
        sellsFor={sellsFor}
        minValue={minValue}
      />;
    });

    if ((isReady && totalCost === 0 && this.props.itemsCount) || (filterItems && filteredItems === 0)) {
      return null;
    }

    return (
      <div className="category">
        <h3>
          {name}
          <Price coins={totalCost} className="pull-xs-right m-l-1" />
          </h3>
        {
          isReady ?
            renderedItems :
            <p>Loading...</p>
        }
      </div>
    );
  }
};
