import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38684131-28b4482e9fc4dba2cc1ab34a8';

export const getImage = (searchText, page = 1) => {
  const Per_Page = 12;

  const param = new URLSearchParams({
    key: API_KEY,
    q: searchText,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: Per_Page,
    page: page,
  });

  return axios.get(`${BASE_URL}?${param}`);
};
