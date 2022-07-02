
import axios from 'axios';
import { url } from 'features/auth/auth.service';
import { Movie, MovieDocument } from './movies.interfaces';

let BaseApi = axios.create({
    baseURL: url,
  });
  
  export const API = () => {
    const accessToken = localStorage.getItem('accessToken');
    
    
    if (accessToken) {
      BaseApi.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }

    return BaseApi;
  };

const getMovies = async () => {
  const response = await API().get<MovieDocument[]>(
    `/movies`
  );

  return response;
};

const addMovie = async (movie:Movie) => {
  
  const response = await API().post(
    `/movies/add-movie`, movie
  );  

  return response.data;
};

const searchMovies = async (search:string) => {
  
  const response = await API().post(
    `/movies/search`, {query: search}
  );
    
  return response.data;
};

const movieServices = {
  getMovies,
  addMovie,
  searchMovies
};

export default movieServices;