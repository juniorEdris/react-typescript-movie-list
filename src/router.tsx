import { Suspense, lazy } from "react";
import { RouteObject, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CircleLoading from "views/Components/Loader/CircleLoading";
import PrivateRoute from "views/Components/PrivateRoute";

const accessToken = localStorage.getItem('accessToken')

const Loader = (Component:any) => (props:any) => (
    <Suspense fallback={<CircleLoading />}>
        <Component {...props} />
        
        <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            theme="colored"
        />
    </Suspense>
)

const MovieLists = Loader(lazy(() => import('views/landing-page')));
const LoginPage = Loader(lazy(() => import('views/login-page')));
const RegisterPage = Loader(lazy(() => import('views/register-page')));
const router: RouteObject[] = [
    {
        path: '/movies',
        element: <PrivateRoute page={<MovieLists />}/>
    },
    {
        path: '/',
        element: !accessToken ? <LoginPage /> : <Navigate to='/movies' />
    },
    {
        path: '/register',
        element: !accessToken ? <RegisterPage /> : <Navigate to='/movies' />
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]

export default router;