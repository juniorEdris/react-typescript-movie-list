
import axios from 'axios';
import { url } from 'features/auth/auth.service';
import { MovieDocument } from './movies.interfaces';

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

const movieServices = {
  getMovies,
};

export default movieServices;