import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MovieDocument } from './movies.interfaces';
import movieServices from './movies.services';

interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ProductState extends AsyncState {
  movies: MovieDocument[];
}

const initialState: ProductState = {
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

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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