import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const userData = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(userData);
    const url = "http://localhost:8081/api/auth/register";

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(url, formData)
            .then(res => handleSuccess(res))
            .catch(err => handleError(err));
    }

    const handleSuccess = (response) => {
        alert("account created successfully");
        navigate("/login");
    }

    const handleError = (err) => {
        const errorMessage = err.message === "Network Error" ? "Network error" : "error creating account";
        alert(errorMessage);
    }


    return (
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <a href="../../../index.html" className="back-link"><i className="fas fa-arrow-left"></i></a>
                        <h1>Create Account</h1>
                        <p>Join Teacherly to start your journey</p>
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
                            <div className="terms-agreement">
                                <input type="checkbox" id="terms" name="terms" required/>
                                <label htmlFor="terms">I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy
                                    Policy</a></label>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Create Account</button>
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
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;