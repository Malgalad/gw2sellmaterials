import { fetchJSON } from '../services/fetch';
import { accountMaterials, tokenInfo, account } from '../constants/endpoints';

export const getUserMaterials = (token) =>
  fetchJSON(`${accountMaterials}?access_token=${token}`);

export const getTokenInfo = (token) =>
  fetchJSON(`${tokenInfo}?access_token=${token}`);

export const getAccountInfo = (token) =>
  fetchJSON(`${account}?access_token=${token}`);