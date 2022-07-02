interface Movies {
    id:string;
    name: string;
    image: string;
    release_year: number
}
export interface MovieCardProps {
    movie: Movies
}