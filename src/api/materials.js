import materialList, { byId } from '../constants/api/materials';

export const getCategoriesList = () =>
  Promise.resolve(materialList);

export const getCategoryItems = (ids) =>
  Promise.resolve(byId);
