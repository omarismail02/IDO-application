import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5255/api/Users/login', { email, password });
            console.log('Login successful:', response.data);
            navigate('/homepage');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Wrong email or password');

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className='he'>Time to Work!</h1>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Sign In</button>
            {error && <p className="error-message">{error}</p>} 
        </form>
    );
}

export default Login;
