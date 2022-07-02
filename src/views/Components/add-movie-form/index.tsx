import { addMovie, getMovies } from "features/Movies/movieSlice";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/store";
import Styles from "../../../css/AddMovieForm.module.css";
import { MovieDetails } from "./MovieForm.interface";

const AddMoviePage: FC = () => {
    // redux toolkit
    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState<string>('');
    const [posterLink, setPosterLink] = useState<string>('');
    const [releasedYear, setReleasedYear] = useState<number>(0);
    
    const handleName = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setName(e.target.value)
    };

    const handlePosterLink = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setPosterLink(e.target.value)
    };

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const number = Number(e.target.value);
        if (!number) {
            toast.error('Enter a valid year!');
            return;
        }
        setReleasedYear(number)        
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();

        if (!name.trim()) {
            // alert
            toast.error('Enter a movie name')
            return;
        }
        if(!name && !posterLink && !releasedYear){
            // alert
            toast.error('Fill all the information!')
            return;
        }
        if(!(releasedYear > 0)){
            // alert
            toast.error('Fill all the information!')
            return;
        }

        const movieDetails: MovieDetails = {
            name,
            release_year: releasedYear,
            image: posterLink
        }        

        const response = await dispatch(addMovie(movieDetails));
      
        if(!response?.payload?._id){
            toast.error('Email taken please try another email!');
            return;
        }
        toast.info('movie added successfully');
        dispatch(getMovies());
            
    };
    const clearForm = () => {
        setName('');
        setPosterLink('');
        setReleasedYear(0);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if(isSuccess){
            // dispatch(reset());
            clearForm();
        }
    }, [isSuccess, dispatch, navigate])

    return ( 
        <div className={Styles.form_page}>
        <div className={Styles.form_body}>
            <h1 className={Styles.form_header}>Add a movie</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="text" ref={inputRef} id="" onChange={handleName} value={name} placeholder="Enter movie name" />
                </div>
                <div className="">
                    <input type="text" id="" onChange={handlePosterLink} value={posterLink} placeholder="Paste a image link" />
                </div>
                <div className="">
                    <input title="select all and type" type="text" id="" onChange={handleYear} value={releasedYear} placeholder="Movie released year" />
                </div>
                <div className="">
                    <button type="submit">Add Movie</button>
                </div>
            </form>
        </div>
        </div>
     );
}

export default AddMoviePage;