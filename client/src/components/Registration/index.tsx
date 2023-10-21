import { useState } from "react";
import styles from './index.module.css';

const Registration = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '', confirmPassword: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (credentials.password === credentials.confirmPassword) {
            console.log('Registered', { credentials });
        } else {
            console.log('Somthing is wrong');
        }
    }

    return (
        <form className={styles.formSection} onSubmit={handleSubmit}>
            <div className={styles.formFields}>
                <label htmlFor="email">Email</label>
                <input type="text" id='email' name='email' value={credentials.email} onChange={handleChange} />
            </div>
            <div className={styles.formFields}>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' value={credentials.password} onChange={handleChange} />
            </div>
            <div className={styles.formFields}>
                <label htmlFor="confirmPassword">Cofirm Password</label>
                <input type="password" id='confirmPassword' name='confirmPassword' value={credentials.confirmPassword} onChange={handleChange} />
            </div>
            <button>Sign up</button>
        </form>
    )
}

export default Registration
