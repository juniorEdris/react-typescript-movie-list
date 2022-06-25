import { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../css/Login.module.css";
interface LoginPageProps {
    
}
 
const LoginPage: FC<LoginPageProps> = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setEmail(e.target.value)
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setPassword(e.target.value)
    };
    const handleSubmit = (e:any):void => {
        e.preventDefault();
        console.log({
            email,
            password
        });
        if(email && password){
            localStorage.setItem('accessToken', email);
            navigate('/movies',{ replace:true })
        }
        
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);
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
                <Link to="/">Create an account</Link>
            </div>
        </div>
        </div>
     );
}
 
export default LoginPage;