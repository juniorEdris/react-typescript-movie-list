import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Movie, MovieDocument } from './movies.interfaces';
import movieServices from './movies.services';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface MovieState extends AsyncState {
  movies: MovieDocument[];
}

const initialState: MovieState = {
  movies: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};


export const getMovies = createAsyncThunk('movie', async () => {
  try {
    return await movieServices.getMovies();
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const addMovie = createAsyncThunk('add-movie', async (movie: Movie) => {
  try {
    return await movieServices.addMovie(movie);
  } catch (error) {
    console.log('Error: ', error);
  }
});

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<MovieState>) => {
    builder
    // GET MOVIES
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload?.data || [];
      })
      .addCase(getMovies.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.movies = [];
      });
  },
});

// export const { incrementProduct, decrementProduct, resetCart } =
// movieSlice.actions;

export default movieSlice.reducer;