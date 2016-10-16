import React from 'react';
import throttle from 'lodash.throttle';
import getProp from 'lodash.get';

import styles from './Overlay.css';
import { getTokenInfo, getAccountInfo } from '../api/account';

export default class Overlay extends React.Component {
  state = {
    apiKey: '',
    message: {},
    isKeyValid: false,
  };

  setApiKey = (event) => {
    this.setState({ apiKey: event.target.value });
    this.tokenInfo(event.target.value);
  };

  tokenInfo = throttle((token) => {
    getTokenInfo(token)
      .then((info) => {
        if (info.text === 'endpoint requires authentication') {
          throw Error('Invalid API Token');
        }

        if (!info.permissions.includes('inventories')) {
          throw Error('API Token does not have "inventories" permission');
        }

        return getAccountInfo(token);
      })
      .then((account) => {
        this.setState({ message: { text: `Welcome, ${account.name}!` }, isKeyValid: true });
      })
      .catch((error) => {
        this.setState({ message: { text: error.message, isError: true } });
      });
  });

  render() {
    const { apiKey, isKeyValid, message } = this.state;
    const { onChange } = this.props;

    return (
      <div className={styles.overlay}>
        <div className="row">
          <div className="col-xs-4 offset-xs-4 card card-block">
            <h3 className="card-title">Please enter GW2 API Token</h3>
            <p className="card-text">
              <input
                type="text"
                placeholder="API key"
                className="form-control"
                value={apiKey}
                onChange={this.setApiKey}
              />
              {
                message.text &&
                  <div className={`alert alert-${message.isError ? 'warning' : 'success'}`}>
                    { message.text }
                  </div>
              }
            </p>
            <button
              onClick={() => onChange(apiKey)}
              className="btn btn-primary"
              disabled={!isKeyValid}
            >
              Use this API key
            </button>
          </div>
        </div>
      </div>
    );
  }
}