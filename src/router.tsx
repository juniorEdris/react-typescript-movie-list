import { Suspense, lazy } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import CircleLoading from "views/Components/Loader/CircleLoading";

const userExist = localStorage.getItem('accessToken');

const Loader = (Component:any) => (props:any) => (
    <Suspense fallback={<CircleLoading />}>
        <p onClick={()=> localStorage.clear()}>Log out</p>
        <Component {...props} />
    </Suspense>
)

const MovieLists = Loader(lazy(() => import('views/landing-page')));
const LoginPage = Loader(lazy(() => import('views/login-page')));
const router: RouteObject[] = [
    {
        path: '/movies',
        element: userExist ? <MovieLists /> : <Navigate to='/' />
    },
    {
        path: '/',
        element: !userExist ? <LoginPage /> : <MovieLists />
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]

export default router;