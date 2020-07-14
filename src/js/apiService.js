const baseUrl = 'https://pixabay.com/api/';

export default {
  key: '17400489-7d3116460602bc816f225b3ce',

  searchName(name, page) {
    const requestParams = `?image_type=photo&orientation=horizontal&q=${name}&page=${page}&per_page=12&key=${this.key}`;

    return fetch(baseUrl + requestParams).then(res => res.json());
  },
};
