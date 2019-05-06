const appendClientSecret = url =>
  `${url}?client_id=6b768d1a119705532a93&client_secret=f235f314238acc84bbb269c00cd24d16946285a3`;
export function postData(url, data = {}) {
  // Default options are marked with *
  return (
    fetch(appendClientSecret(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      // eslint-disable-next-line arrow-parens
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // @TODO:  if needed handle http 4xx, 5xx here
        throw new Error('Non successful http code received');
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  );
}

export function getData(url) {
  // Default options are marked with *
  return (
    fetch(appendClientSecret(url), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // eslint-disable-next-line arrow-parens
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // @TODO:  if needed handle http 4xx, 5xx here
        throw new Error('Non successful http code received');
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  );
}

export default {
  getData,
  postData,
};
