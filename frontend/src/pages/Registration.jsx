import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:4444/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                console.log('Registered successfully:', data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                navigate('/');
            }
        } catch (error) {
            setError('Failed to register');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="w-50" style={{
                maxWidth: '400px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderColor: 'yellow',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderRadius: '0.25rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <form onSubmit={handleSubmit} className="p-4"
                      style={{color: 'white'}}>
                    <h2 className="mb-3 text-center">Register</h2>
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="usernameInput"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            style={{backgroundColor: 'transparent', color: 'white', borderColor: 'yellow'}}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            style={{backgroundColor: 'transparent', color: 'white', borderColor: 'yellow'}}
                        />
                    </div>
                    <button type="submit" className="btn w-100">Register</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
