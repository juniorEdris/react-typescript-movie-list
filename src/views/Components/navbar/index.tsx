import { FC } from "react";

 
const Navbar: FC = () => {
    const user = localStorage.getItem('accessToken');
    return ( 
        <div className="navbar_container">
            {!user ? <span>Login</span>: <span onClick={()=> localStorage.clear()} className="">Logout</span>}
        </div>
     );
}
 
export default Navbar;