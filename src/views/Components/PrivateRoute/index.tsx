import { verifyToken } from "features/auth/authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/store";

const PrivateRoute = ({ page }: { page: JSX.Element }) => {
    const { jwt } = useAppSelector(
      (state) => state.auth
    );
    
  
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      if (!jwt) return;
  
      dispatch(verifyToken(jwt));
    }, [jwt]);
  
    return jwt ? page : <Navigate replace to='/' />;
  };
  
  export default PrivateRoute;