import React from 'react';
import groupBy from 'lodash.groupby';

import { getCategoriesList, getCategoryItems } from '../api/materials';
import { getUserMaterials } from '../api/account';
import styles from './Storage.css';
import Category from './Category';
import Price from './Price';

export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isReady: false,
      minValue: props.minValue,
      filterItems: props.filterItems,
      categories: [],
      userStorageByCategory: {},
    };
  }

  componentWillMount() {
    getCategoriesList()
      .then(getCategoryItems)
      .then((categories) => this.setState({ categories, isReady: true }));

    if (this.props.apiKey) {
      this.userMaterials(this.props.apiKey);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiKey !== this.props.apiKey) {
      this.userMaterials(nextProps.apiKey);
    }
  }

  userMaterials = (apiKey) => {
    getUserMaterials(apiKey)
      .then((userStorage) => this.setState({ userStorageByCategory: groupBy(userStorage, 'category') }));
  };

  setMinValue = (event) => {
    this.setState({ minValue: event.target.value });
    localStorage.setItem('minValue', event.target.value);
  };

  setFilterItems = (event) => {
    this.setState({ filterItems: event.target.checked });
    localStorage.setItem('filterItems', event.target.checked);
  };

  render() {
    const { minValue, isReady, categories, userStorageByCategory, filterItems } = this.state;

    return (
      <div>
        <div className="row form-inline">
          <div className="form-group">
            <label htmlFor="minValue">
              Minimum sell value: <Price coins={minValue} className={styles.minimalPrice} />
            </label>
            <input
              type="number"
              name="minValue"
              placeholder="Set price in coppers"
              className="form-control"
              value={minValue}
              onChange={this.setMinValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="filterItems">
              Show only filtered items:
            </label>
            <input
              type="checkbox"
              name="filterItems"
              className="form-control"
              checked={filterItems}
              onChange={this.setFilterItems}
            />
          </div>
        </div>
        <hr />
        <div className={`row ${styles.storage}`}>
          {
            isReady ?
              categories
                .sort((a, b) => a.order - b.order)
                .map((category) =>
                  <Category
                    key={category.id}
                    {...category}
                    itemsCount={userStorageByCategory[category.id]}
                    minValue={minValue}
                    filterItems={filterItems}
                  />
                ) :
              <p>Loading...</p>
          }
        </div>
      </div>
    );
  }
}