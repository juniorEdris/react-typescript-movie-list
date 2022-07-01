import { LoginUser } from "features/auth/auth.interfaces";
import { login, reset } from "features/auth/authSlice";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/store";
import Styles from "../../css/Login.module.css";
interface LoginPageProps {
    
}
 
const LoginPage: FC<LoginPageProps> = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { isAuthenticated, isSuccess} = useAppSelector(state => state.auth);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const clearForm = (): void => {
        setEmail('');
        setPassword('');
    };
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setEmail(e.target.value)
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setPassword(e.target.value)
    };
    const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        const emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if(!email && !password){
            // alert
            toast.error('Fill all the credentials!')
            return;
        }
        if (!email.match(emailRegex)) {
            // alert
            toast.error('Email format invalid!')
            return;
        }

        const loginUser: LoginUser = {
            email,
            password
        }

        const response = await dispatch(login(loginUser));

        if(response.type !== 'auth/login/rejected'){
            navigate('/movies');
        }else{
            toast.error('Something went wrong!')
        };
        
        
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (isSuccess) {
          dispatch(reset());
          clearForm();
        }
      }, [isSuccess, dispatch]);

    return ( 
        <div className={Styles.login_page}>
        <div className={Styles.login_body}>
            <h1 className={Styles.form_header}>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="email" ref={inputRef} id="" onChange={handleEmail} value={email} />
                </div>
                <div className="">
                    <input type="password" id="" onChange={handlePassword} value={password} />
                </div>
                <div className="">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="">
                <Link to="/register">Create an account</Link>
            </div>
        </div>
        </div>
     );
}
 
export default LoginPage;