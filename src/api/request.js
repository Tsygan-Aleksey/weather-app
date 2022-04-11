export const request = (url, {params = {}}) => {
  const urlParams = new URLSearchParams(params).toString();

  return fetch(`${url}?${urlParams}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("ERROR");
  });
};
