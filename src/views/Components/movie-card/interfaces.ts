interface Movies {
    id:string;
    name: string;
    image: string;
    released_year: string
}
export interface MovieCardProps {
    movie: Movies
}