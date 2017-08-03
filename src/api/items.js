import { fetchJSON } from '../services/fetch';
import { items } from '../constants/endpoints';

export const getItems = (ids) =>
  fetchJSON(`${items}?ids=${ids.join(',')}`);
