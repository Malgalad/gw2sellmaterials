import React from 'react';
import throttle from 'lodash.throttle';
import classnames from 'classnames';

import './Overlay.css';
import { getTokenInfo, getAccountInfo } from '../api/account';

const tokenChars = /^[0-9A-F]+$/;
const lengths = [8, 4, 4, 4, 20, 4, 4, 4, 12];
const isValid = token =>
  token.length === 72
  && token.split('-').length === 9
  && token.split('-').every(string => tokenChars.test(string))
  && token.split('-').every((string, idx) => string.length === lengths[idx]);

export default class Overlay extends React.Component {
  state = {
    apiKey: '',
    message: {},
    accountName: '',
    isKeyValid: false,
  };

  setApiKey = (event) => {
    this.setState({ apiKey: event.target.value });
    this.tokenInfo(event.target.value);
  };

  tokenInfo = throttle(async (token) => {
    try {
      if (!token) {
        this.setState({ message: {} });
        return;
      }

      if (!token || !isValid(token)) {
        throw Error('Input string is not a token');
      }

      const info = await getTokenInfo(token);

      if (info.text === 'endpoint requires authentication') {
        throw Error('Invalid API Token');
      }

      if (!info.permissions.includes('inventories')) {
        throw Error('API Token does not have "inventories" permission');
      }

      const account = await getAccountInfo(token);

      this.setState({ message: { text: `Welcome, ${account.name}!` }, isKeyValid: true, accountName: account.name });
    } catch(error) {
      this.setState({ message: { text: error.message, isError: true } });
    }
  });

  render() {
    const { apiKey, isKeyValid, message, accountName } = this.state;
    const { onChange } = this.props;

    return (
      <div className="overlay">
        <div className="row">
          <div className="col-xs-4 offset-xs-4 card card-block">
            <h3 className="card-title">Please enter GW2 API Token</h3>
            <small>
              You can create a new token <a href="https://account.arena.net/applications/create">here</a>.
              Make sure to include "inventories" API.
            </small>
            <p className="card-text">
              <input
                type="text"
                placeholder="API key"
                className="form-control m-b-1"
                value={apiKey}
                onChange={this.setApiKey}
              />
              {
                message.text &&
                  <div
                    className={
                      classnames(
                        'alert',
                        { 'alert-warning' : message.isError },
                        { 'alert-success': !message.isError }
                      )
                    }
                  >
                    { message.text }
                  </div>
              }
            </p>
            <button
              onClick={() => onChange({ apiKey, accountName })}
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
