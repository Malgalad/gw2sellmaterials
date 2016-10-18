import React from 'react';

import Overlay from './Overlay';
import Storage from './Storage';
import { getAccountInfo } from '../api/account';
import { setItem } from '../services/localStorage';

export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      apiKey: props.apiKey,
      accountName: '',
    };
  }

  componentWillMount() {
    if (this.props.apiKey) {
      getAccountInfo(this.props.apiKey)
        .then((account) => this.setState({ accountName: account.name }));
    }
  }

  setApiKey = ({ apiKey, accountName }) => {
    this.setState({ apiKey, accountName });
    setItem('apiKey', apiKey);
  };

  render() {
    const { apiKey, accountName } = this.state;
    const { minValue, filterItems, priceCategory } = this.props;

    return (
      <div>
        {
          !apiKey &&
            <Overlay apiKey={apiKey} onChange={this.setApiKey} />
        }
        <Storage
          minValue={minValue}
          filterItems={filterItems}
          apiKey={apiKey}
          accountName={accountName}
          priceCategory={priceCategory}
        />
      </div>
    );
  }
}