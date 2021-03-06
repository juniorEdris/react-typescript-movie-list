import { FC } from "react";
import Styles from "../../../css/MovieGridList.module.css";
import { MovieCardProps } from "views/Components/movie-card/interfaces";

const MovieCard: FC<MovieCardProps> = (props) => {
    const { movie } = props
    return ( 
        <div className={Styles.movie_body} key={movie?.id}>
            <div className={Styles.movie_image}>
                {!movie?.image ? <img src='/images/placeholder.png' alt={movie?.name} /> : <img src={movie?.image} alt={movie?.name} />}
            </div>
            <div className={Styles.movie_header}>
            <div className={Styles.movie_name}>{movie?.name}</div>
            <div className={Styles.movie_released_year}>{movie?.release_year}</div>
            </div>
        </div>
     );
}
 
export default MovieCard;