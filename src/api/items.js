export const getItems = (ids) =>
  System.import('../constants/api/items')
    .then((module) => module[`_${ids[0]}`]);
