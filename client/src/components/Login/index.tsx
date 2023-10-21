import { useState } from "react";
import { useNavigate, redirect } from 'react-router-dom';
import styles from './index.module.css';
import { useAuthContext } from "globals/context/auth";


const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(false);
    const { users, setIsAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailRegex = new RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9.-].[a-zA-Z]{2,}$/);
        if (emailRegex.test(credentials.email) && users.includes(credentials.email)) {
            // set AuthUser and redirect to dashbaord
            setIsAuthUser(true);
            navigate('/dashboard');
        } else {
            console.log('Invalid email');
            setIsAuthUser(false);
            setError(true);
        }
    }

    const handleNewUser = () => {
        navigate('/registration')
    }

    return (
        <form className={styles.formSection} onSubmit={handleFormSubmit}>
            <div className={styles.formFields}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" name="email" value={credentials.email} onChange={handleChange} />
            </div>
            <div className={styles.formFields}>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" value={credentials.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
            <button type="button" onClick={handleNewUser}>New User?</button>
            {error && <p>Incorrect email or password</p>}
        </form>
    )
}

export default Login;

