import { Link } from "react-router-dom"
const WelcomeComponent = () => {
    return (
        <>
            <div className="welcome-div">
                <img src="src/assets/logo.jpg" alt="" />
                <h1>Welcome to PopX</h1>
                <p>PopX is your all-in-one space to create, collaborate, and stay ahead. Join us and be part of something bigger.</p>
                <Link to="signup"><button>Create Account</button></Link>
                <Link to="login"><button>Already Registered? Login</button></Link>
                
                
            </div>
        </>
    )
}

export default WelcomeComponent