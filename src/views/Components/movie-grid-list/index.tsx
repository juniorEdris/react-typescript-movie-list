import { getMovies } from "features/Movies/movieSlice";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store/store";
import MovieCard from "views/Components/movie-card";
import Styles from "../../../css/MovieGridList.module.css";
 
const MovieGridList:FC = () => {

const dispatch = useAppDispatch();
const { isLoading, movies } = useAppSelector(state=> state.movie)

useEffect(() => {
  dispatch(getMovies());
}, [])

    
    return ( 
      <>
       { isLoading ? 'Loading' :  
       <div>
          <h1>Movie Grid List</h1> <br/>
          <div className={Styles.movie_list_container}>
          {
            movies?.map(movie=>(<MovieCard movie={movie} />))
          }
          </div>
        </div>
        }
      </>
     );
}
 
export default MovieGridList;