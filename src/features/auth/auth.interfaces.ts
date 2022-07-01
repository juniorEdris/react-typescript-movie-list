export interface AsyncState  {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export interface DisplayUser {
    id: string;
    name: string;
    email: string;
}

export type JWT =  string | null;

export interface DecodedJwt {
    user: DisplayUser;
    exp: number;
    iat: number;
}
export interface LoginResponse {
    user: DisplayUser;
    token: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface AuthState extends AsyncState{
    user?: DisplayUser | null;
    isAuthenticated?: boolean;
    jwt?: JWT;
}

export interface NewUser {
    name: string;
    email: string;
    password: string;
}