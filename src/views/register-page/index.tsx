import { NewUser } from "features/auth/auth.interfaces";
import { register, reset } from "features/auth/authSlice";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "store/store";
import Styles from "../../css/Login.module.css";

interface RegisterPageProps {

}

const RegisterPage: FC<RegisterPageProps> = () => {
    // redux toolkit
    const dispatch = useAppDispatch();
    const { isSuccess } = useAppSelector((state) => state.auth);

    const navigate = useNavigate();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    
    const handleName = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setName(e.target.value)
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setEmail(e.target.value)
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setPassword(e.target.value)
    };

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setConfirmPassword(e.target.value)
    };
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
        e.preventDefault();
        
        const emailRegex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!name || !(name.length > 4)) {
            // alert
            toast.error('Enter your name (more than 4 chars.)')
            return;
        }
        if (!email.match(emailRegex)) {
            // alert
            toast.error('Email format invalid!')
            return;
        }
        if(!email && !password && !confirmPassword){
            // alert
            toast.error('Fill all the credentials!')
            return;
        }
        if (password.toLocaleLowerCase()!== confirmPassword.toLocaleLowerCase()) {
            // alert
            toast.error('Password does not match!')
            return;
        }

        const newUser: NewUser = {
            name,
            email,
            password
        }

        const response = await dispatch(register(newUser));
        if(response.type === 'auth/register/rejected'){
            toast.error('Email taken please try another email!');
            return;
        }
        toast.info('Registered successfully. Please login!');
        setTimeout(()=>{
            navigate('/movies')
        }, 2000)
        
            
    };
    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if(isSuccess){
            dispatch(reset());
            clearForm();
        }
    }, [isSuccess, dispatch, navigate])

    return ( 
        <div className={Styles.login_page}>
        <div className={Styles.login_body}>
            <h1 className={Styles.form_header}>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="">
                    <input type="text" ref={inputRef} id="" onChange={handleName} value={name} placeholder="Enter your name" />
                </div>
                <div className="">
                    <input type="email" id="" onChange={handleEmail} value={email} placeholder="Enter your email" />
                </div>
                <div className="">
                    <input type="password" id="" onChange={handlePassword} value={password} placeholder="Password" />
                </div>
                <div className="">
                    <input type="password" id="" onChange={handleConfirmPassword} value={confirmPassword} placeholder="Confirm password" />
                </div>
                <div className="">
                    <button type="submit">Register</button>
                </div>
            </form>
            <div className="">
                <p>Already have an account? <Link to="/">click here</Link></p>
            </div>
        </div>
        </div>
     );
}

export default RegisterPage;