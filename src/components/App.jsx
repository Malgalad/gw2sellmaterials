import React from 'react';

import Overlay from './Overlay';
import Storage from './Storage';

export default class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      apiKey: props.apiKey,
    };
  }

  setApiKey = (apiKey) => {
    this.setState({ apiKey});
    localStorage.setItem('apiKey', apiKey);
  };

  render() {
    const { apiKey } = this.state;
    const { minValue, filterItems } = this.props;

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
        />
      </div>
    );
  }
}