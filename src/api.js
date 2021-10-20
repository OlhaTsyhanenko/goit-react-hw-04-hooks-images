export const fetchData = (query = '', page = 1) => {
    const keyApi = '23047569-c77e6b9c2c44e7090fa2652c3';
  return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=${keyApi}&image_type=photo&orientation=horizontal&per_page=12 `)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data.hits);
}

export { fetchData as default };