export const getCategoriesList = () =>
  System.import('../constants/api/materials')
    .then((module) => module.default);

export const getCategoryItems = (ids) =>
  System.import('../constants/api/materials')
    .then((module) => module.byId);
