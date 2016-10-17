const storage = window.localStorage;

export const getItem = (key) => {
  const item = storage.getItem(key);
  return item && JSON.parse(item);
};

export const setItem = (key, value) => storage.setItem(key, JSON.stringify(value));

export const clear = storage.clear.bind(storage);
