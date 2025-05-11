import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext.jsx";

const Profile = () => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    const [user, setUser] = useContext(UserContext);
    const cloudName = import.meta.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const apiKey = import.meta.env.REACT_APP_CLOUDINARY_API_KEY;
    const uploadPreset = import.meta.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
    const navigate = useNavigate();
    const url = "http://localhost:8081/api/authenticated/update";

    const userData = {
        firstName: "",
        lastName: "",
        role: "",
        imageUrl: ""
    };

    const [formData, setFormData] = useState(userData);
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setImageFile(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userToken) {
            alert("Profile already set up by you");
            navigate("/login");
            return;
        }

        let imageUrl = "";
        if (imageFile) {
            const formDataImage = new FormData();
            formDataImage.append("file", imageFile);
            formDataImage.append("upload_preset", "teacherly_profile_pic");

            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/dwl4mne3y/image/upload`, formDataImage);
                imageUrl = response.data.secure_url;
            } catch (error) {
                alert("Error uploading image to Cloudinary");
                return;
            }
        }

        const payload = {
            token: userToken.token,
            id: userToken.id,
            profile: {
                ...formData,
                imageUrl
            }
        };

        await axios.post(url, payload)
            .then((res) => handleSuccess(res.data))
            .catch((err) => handleError(err));
    };

    const handleSuccess = (response) => {
        alert(`${response.profile.firstName}!, your profile was updated successfully`);
        localStorage.removeItem("token");
        setUser(response);
        localStorage.setItem("status", JSON.stringify("login"));
        if (response.profile.role === "STUDENT") {
            navigate("/student/dashboard");
        } else {
            navigate("/teacher/dashboard");
        }
    };

    const handleError = (error) => alert("Error creating profile");

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
                            <label htmlFor="lastname">Lastname</label>
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
                        <div className="form-group">
                            <label htmlFor="profileImage">Image</label>
                            <div className="input-with-icon">
                                <i className="fas fa-user"></i>
                                <input
                                    type="file"
                                    id="profileImage"
                                    name="image"
                                    accept="image/*"
                                    required
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Set profile</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Profile;
