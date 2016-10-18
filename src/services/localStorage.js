const storage = window.localStorage;

export const getItem = (key, defaultValue = null) => {
  const item = storage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

export const setItem = (key, value) => storage.setItem(key, JSON.stringify(value));

export const clear = storage.clear.bind(storage);
