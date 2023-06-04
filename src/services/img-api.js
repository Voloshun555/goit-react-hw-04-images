import axios from 'axios';



export const imgApiService = async (query, page) => {
  const perPage = 12;
  const url = 'https://pixabay.com/api/';
  const API_KEY = '34849127-969aa955091248fba76eeb517';
try {
  const responsive = await axios.get(`${url}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
  return responsive.data
} catch (error) {console.log(error)}
 
}