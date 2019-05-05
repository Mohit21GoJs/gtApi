export function postData(url, data = {}) {
  // Default options are marked with *
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // @TODO:  if needed handle http 4xx, 5xx here
      throw new Error('Non successful http code received');
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
}

export function getData(url) {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      // @TODO:  if needed handle http 4xx, 5xx here
      throw new Error('Non successful http code received');
    })
    // eslint-disable-next-line no-console
    .catch(console.error);
}

export default {
  getData,
  postData,
};
