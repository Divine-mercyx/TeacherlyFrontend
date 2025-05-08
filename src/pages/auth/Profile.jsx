import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const url = "http://localhost:8081/api/authenticated/update";


    const userData = {
            firstName: "",
            lastName: "",
            role: ""
    }

    const [formData, setFormData] = useState(userData);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userToken) {
            alert("profile already setup by you");
            navigate("/login");
        }

        const payload = {
            token: userToken.token,
            id: userToken.id,
            profile: formData
        }
        await axios.post(url, payload)
            .then((res) => handleSuccess(res.data))
            .catch((err) => handleError(err));
    }

    const handleSuccess = (response) => {
        alert(`${response.profile.firstName}!, your profile was updated successfully`);
        localStorage.removeItem("token");
        if (response.profile.role === "STUDENT") {
            navigate("/student/dashboard");
        }
    }

    const handleError = (error) => alert("error creating profile");



    return (
        <>
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <a href="../../../index.html" className="back-link"><i className="fas fa-arrow-left"></i></a>
                        <h1>Profile setup</h1>
                        <p>Set your profile to start your journey</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="fullname">Firstname</label>
                            <div className="input-with-icon">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="firstName"
                                    placeholder="Enter your firstname"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullname">Lastname</label>
                            <div className="input-with-icon">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastName"
                                    placeholder="Enter your lastname"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>I am a:</label>
                            <div className="role-selector">
                                <div className="role-option">
                                    <input
                                        type="radio"
                                        id="student"
                                        name="role"
                                        value="STUDENT"
                                        checked={formData.role === "STUDENT"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="student">
                                        <i className="fas fa-user-graduate"></i>
                                        <span>Student</span>
                                        <p>I want to learn from teachers</p>
                                    </label>
                                </div>
                                <div className="role-option">
                                    <input
                                        type="radio"
                                        id="teacher"
                                        name="role"
                                        value="TEACHER"
                                        checked={formData.role === "TEACHER"}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="teacher">
                                        <i className="fas fa-chalkboard-teacher"></i>
                                        <span>Teacher</span>
                                        <p>I want to share my knowledge</p>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Set profile</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Profile;