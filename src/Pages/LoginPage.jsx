import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const LoginComponent = ({ setCurrentUser }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const allUsers = JSON.parse(localStorage.getItem('popx-users') || '[]');

        const foundUser = allUsers.find(user => user.email === loginData.email && user.password === loginData.password);

        if (foundUser) {
            localStorage.setItem('popx-current-user', JSON.stringify(foundUser));
            setCurrentUser(foundUser);
            navigate("/profile");
        }
        else {
            setError("Invaild email or password!");
        };
    };
    return (
        <>
            <div className="login-div">
                <h1>Signin to your PopX account</h1>
                <p>Enter your email and password to continue to your PopX account.</p>
                {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter email address" value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                    <label>Password</label>
                    <input type="password" placeholder="Enter password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                    <button type="submit">Login</button>
                </form>

                <div className="link-text">
                    <span>Don't have an account? </span>
                    <Link to="/signup" className="signup-link">Sign up here</Link>
                </div>
            </div>
        </>
    )
}

export default LoginComponent