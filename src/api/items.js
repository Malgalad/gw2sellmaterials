import * as items from '../constants/api/items';

export const getItems = (ids) =>
  Promise.resolve(items[`_${ids[0]}`]);
