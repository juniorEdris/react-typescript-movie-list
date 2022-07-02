import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { AuthState, DisplayUser, JWT, LoginUser, NewUser } from './auth.interfaces';
import { authServices } from './auth.service';

const storedUser: string | null = localStorage.getItem('user');
const user: DisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('accessToken');
const jwt: JWT = !!storedJwt ? storedJwt : null;

const initialState: AuthState = {
    user: user,
    jwt: jwt,
    isLoading: false,
    isError:false,
    isSuccess: false,
    isAuthenticated: false
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: NewUser, thunkAPI) => {
        try {
            return await authServices.register(user);
        } catch (error) {
            return thunkAPI.rejectWithValue("User not registered!");
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (user: LoginUser, thunkAPI) => {
      try {
        return await authServices.login(user);
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to login');
      }
    }
  );
  
  export const logout = createAsyncThunk('auth/logout', async () => {
    await authServices.logout();
  });
  
  export const verifyToken = createAsyncThunk(
    'auth/verify-jwt',
    async (jwt: string, thunkAPI) => {        
      try {
        return await authServices.verifyToken(jwt);
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to verify');
      }
    }
  );

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      reset: (state: AuthState) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = false;
      }
    },
    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
        // Register
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.isSuccess = true;
            state.user = action.payload
        })
        .addCase(register.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null
        })
        // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {        
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload?.token;
        state.isAuthenticated = true;
        state.user = action.payload?.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
        state.user = null;
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.jwt = null;
        state.isAuthenticated = false;
      })
      // VERIFY JWT
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {        
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });

    }
  })

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
    return state.auth;
};

export default authSlice.reducer;