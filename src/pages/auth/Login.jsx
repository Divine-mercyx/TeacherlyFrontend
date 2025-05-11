import {useContext, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const userData = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(userData);
    const url = "http://localhost:8081/api/auth/login";

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(url, formData)
            .then(res => success(res.data))
            .catch(err => failure(err));
    }

    const success = (response) => {
        localStorage.setItem("token", JSON.stringify({ token: response.token, id: response.id }));
        setUser(response);
        alert("login successfully");
        localStorage.setItem("status", JSON.stringify("login"));
        if (response.profile === null) {
            navigate("/profile/setup");
        }

        if (response.profile.role === "TEACHER") {
            navigate("/teacher/dashboard");
        } else if (response.profile.role === "STUDENT") {
            navigate("/student/dashboard");
        } else {
            alert("role not set");
        }
    }

    const failure = (response) => {
        const errorMessage = response.response.data.includes("An error occurred user not found with email") ? "invalid email or password" : "an error ocurred, try again";
        alert(errorMessage);
    }

    return (
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <a href="../../../index.html" className="back-link"><i className="fas fa-arrow-left"></i></a>
                        <h1>Welcome Back</h1>
                        <p>Log in to continue your learning journey</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-icon">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-with-icon">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Create a password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-options">
                            <div className="remember-me">
                                <input type="checkbox" id="remember" name="remember"/>
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <a href="#" className="forgot-password">Forgot password?</a>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Log In</button>
                    </form>
                    <div className="auth-divider">
                        <span>OR</span>
                    </div>
                    <div className="social-login">
                        <button className="btn btn-social btn-google">
                            <i className="fab fa-google"></i> Continue with Google
                        </button>
                        <button className="btn btn-social btn-facebook">
                            <i className="fab fa-facebook-f"></i> Continue with Facebook
                        </button>
                    </div>
                    <div className="auth-footer">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login