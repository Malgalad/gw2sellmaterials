import { fetchJSON } from '../services/fetch';
import { materials } from '../constants/endpoints';

export const getCategoriesList = () =>
  fetchJSON(materials);

export const getCategoryItems = (ids) =>
  fetchJSON(`${materials}?ids=${ids.join(',')}`);
