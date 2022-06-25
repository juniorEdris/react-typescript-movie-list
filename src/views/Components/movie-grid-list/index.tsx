import { FC } from "react";
import MovieCard from "views/Components/movie-card";
import Styles from "../../../css/MovieGridList.module.css";
 
const MovieGridList:FC = () => {
  const movies = [
  {
    id:'1',
    name: 'movie no 1',
    image: '/images/mv1.png',
    released_year: '2021'
  },
  {
    id:'2',
    name: 'movie no 2',
    image: '/images/mv1.png',
    released_year: '2022'
  },
  {
    id:'3',
    name: 'movie no 3',
    image: '/images/mv1.png',
    released_year: '2023'
  },
  {
    id:'4',
    name: 'movie no 4',
    image: '/images/mv1.png',
    released_year: '2024'
  },
  {
    id:'5',
    name: 'movie no 5',
    image: '/images/mv1.png',
    released_year: '2025'
  },
  {
    id:'6',
    name: 'movie no 6',
    image: '/images/mv1.png',
    released_year: '2026'
  },
]
    
    return ( 
        <div>
          <h1>Movie Grid List</h1> <br/>
          <div className={Styles.movie_list_container}>
          {
            movies?.map(movie=>(<MovieCard movie={movie} />))
          }
          </div>
        </div>
     );
}
 
export default MovieGridList;