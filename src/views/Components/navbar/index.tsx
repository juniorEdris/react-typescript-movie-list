import { logout } from "features/auth/authSlice";
import { FC } from "react";
import { useAppDispatch } from "store/store";

 
const Navbar: FC = () => {
    const user = localStorage.getItem('accessToken');
    const dispatch = useAppDispatch();

    const logOutHandler = (): void =>{
        dispatch(logout());
    };
    return ( 
        <div className="navbar_container">
            {!user ? <span>Login</span>: <span onClick={logOutHandler} className="">Logout</span>}
        </div>
     );
}
 
export default Navbar;