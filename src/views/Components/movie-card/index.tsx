import { FC } from "react";
import Styles from "../../../css/MovieGridList.module.css";
import { MovieCardProps } from "views/Components/movie-card/interfaces";

const MovieCard: FC<MovieCardProps> = (props) => {
    const { movie } = props
    return ( 
        <div className={Styles.movie_body} key={movie?.id}>
            <div className={Styles.movie_image}>
            <img src={movie?.image} alt="movie_one" />
            </div>
            <div className={Styles.movie_header}>
            <div className={Styles.movie_name}>{movie?.name}</div>
            <div className={Styles.movie_released_year}>{movie?.released_year}</div>
            </div>
        </div>
     );
}
 
export default MovieCard;