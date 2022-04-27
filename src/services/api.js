import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '25712416-b7f8b21cfce49117d938a95c8';
const PARAM =
  'per_page=12&orientation=horizontal&image_type=photo&safesearch=true';

const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `/?key=${API_KEY}&q=${searchQuery}&page=${page}&${PARAM}`
  );
  return data;
};

export { getImages };
