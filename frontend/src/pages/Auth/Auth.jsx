import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Auth.module.css';

function AuthForm({ action }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const endpoint = action === 'login' ? 'login' : 'register';
            const response = await fetch(`http://localhost:4444/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                navigate('/');
            }
        } catch (error) {
            setError(`Failed to ${action}`);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.formWrapper}>
                <form onSubmit={handleSubmit} className={style.form}>
                    <h2 className="mb-3 text-center">{action === 'login' ? 'Login' : 'Register'}</h2>
                    {error && <div className={`${style.alert} alert alert-danger`} role="alert">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className={style.label}>Username:</label>
                        <input
                            type="text"
                            className={`form-control ${style.input}`}
                            id="usernameInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className={style.label}>Password:</label>
                        <input
                            type="password"
                            className={`form-control ${style.input}`}
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-outline-info w-100">{action === 'login' ? 'Login' : 'Register'}</button>
                </form>
            </div>
        </div>
    );
}

export default AuthForm;
