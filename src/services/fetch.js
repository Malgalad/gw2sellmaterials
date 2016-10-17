const fetch = window.fetch;

export default fetch;

export const fetchJSON = (...args) => fetch(...args)
  .then(response => response.json());

export const fetchText = (...args) => fetch(...args)
  .then(response => response.text());
