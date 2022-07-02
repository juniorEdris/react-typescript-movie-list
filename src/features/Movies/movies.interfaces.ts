export interface Movie {
    name: string;
    image: string;
    release_year: number;
}

export interface MovieDocument extends Movie {
    id:string;
    _v: number;
}