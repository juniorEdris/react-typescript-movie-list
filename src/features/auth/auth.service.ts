import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { DecodedJwt, DisplayUser, JWT, LoginResponse, LoginUser, NewUser } from './auth.interfaces';

const url = process.env.REACT_API_HOST || 'http://localhost:5000/api'
const register = async (user: NewUser): Promise<DisplayUser | null> => {
    const response = await axios.post(`${url}/auth/register`, user);
    return response.data ;
}

const login = async (user: LoginUser): Promise<LoginResponse> => {
    const response = await axios.post(`${url}/auth/login`, user);
    let output = {
        user: {
            id: '',
            name: '',
            email: ''
        },
        token: ''
    };
    if(response.data){
        localStorage.setItem('accessToken', JSON.stringify(response.data.token));

        const decodeJwt: DecodedJwt = jwt_decode(response.data.token);
        localStorage.setItem('user', JSON.stringify(decodeJwt.user));
        output =  {
            user: decodeJwt.user,
            token: response.data.token
        };
    }
    return output;
}

const logout = (): void =>{
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
};

const verifyToken = async (jwt: string): Promise<boolean> => {
    const response = await axios.post(
      `${url}/auth/verify-jwt`,
      { jwt }
    );
  
    if (response.data) {
      const jwtExpirationMs = response.data.exp * 1000;
      return jwtExpirationMs > Date.now();
    }
  
    return false;
  };

export const authServices = {
    register,
    login,
    logout,
    verifyToken
};