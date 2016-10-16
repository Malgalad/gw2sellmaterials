import { fetchJSON } from '../services/fetch';
import { prices } from '../constants/endpoints';

export const getPrices = (ids) =>
  fetchJSON(`${prices}?ids=${ids.join(',')}`);
