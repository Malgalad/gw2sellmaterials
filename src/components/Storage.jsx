import React from 'react';
import groupBy from 'lodash.groupby';

import { getCategoriesList, getCategoryItems } from '../api/materials';
import { getUserMaterials } from '../api/account';
import { setItem, clear } from '../services/localStorage';
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
    setItem('minValue', event.target.value);
  };

  setFilterItems = (event) => {
    this.setState({ filterItems: event.target.checked });
    setItem('filterItems', event.target.checked);
  };

  forgetToken = () => {
    clear();
  };

  render() {
    const { minValue, isReady, categories, userStorageByCategory, filterItems } = this.state;
    const { accountName } = this.props;

    return (
      <div className={styles.container}>
        <div className={`form-inline ${styles.options}`}>
          <div className="form-group">
            <label htmlFor="minValue">
              Minimum sell value: <Price coins={minValue} className={styles.minimalPrice} />
            </label>
            <input
              type="number"
              id="minValue"
              placeholder="Set price in coppers"
              className="form-control"
              value={minValue}
              onChange={this.setMinValue}
            />
          </div>
          <div className="form-group">
            <label className="form-check-inline">
              Show only filtered items: <input
                type="checkbox"
                id="filterItems"
                className="form-control"
                checked={filterItems}
                onChange={this.setFilterItems}
              />
            </label>
          </div>
          <div className="pull-xs-right">
            <span className={styles.accountName}>
              Hello, <span className="text-success">{accountName || 'Anonymous'}</span>!
            </span>
            <button className="m-l-1 btn btn-danger" onClick={this.forgetToken}>
              Forget token
            </button>
          </div>
        </div>
        <div className={styles.storage}>
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