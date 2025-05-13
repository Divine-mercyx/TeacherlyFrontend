import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import TeacherSidebar from "../../components/TeacherSidebar.jsx";
import Header from "../../components/Header.jsx";
import DashboardContent from "../../components/DashboardContent.jsx";
import VideoForm from "./VideoForm.jsx";
import axios from "axios";

const TeacherDashboard = () => {
    const [user, setUser] = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const url = "http://localhost:8081/api/authenticated/post";

    const videoData = {
        description: "",
        category: "",
        url: ""
    }

    const [formData, setFormData] = useState(videoData);
    const [videoFile, setVideoFile] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === "videoFile") {
            setVideoFile(e.target.files[0]);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let videoUrl = "";

        if (videoFile) {
            const formDataVideo = new FormData();
            formDataVideo.append("file", videoFile);
            formDataVideo.append("upload_preset", "teacherly_profile_pic");


            try {
                const response = await axios.post(`https://api.cloudinary.com/v1_1/dwl4mne3y/video/upload`, formDataVideo);
                videoUrl = response.data.secure_url;
                console.log(response.data);
            } catch (error) {
                alert("Error uploading video to Cloudinary");
                return;
            }
        }

        const payload = {
            token: user.token,
            id: user.id,
            video: {
                ...formData,
                url: videoUrl
            }
        };

        try {
            const res = await axios.post(url, payload);
            handleSuccess(res.data);
        } catch (err) {
            handleError(err);
        }

        setIsModalOpen(false);
    }

    const handleSuccess = (data) => {
        console.log(data);
        alert(`${user.profile.firstName}, your post was saved successfully`);
    }

    const handleError = (err) => {
        console.log(err);
        alert("There was an error saving your post.");
    }

    return (
        <>
            <div className="teacher-container">
                <TeacherSidebar />
                <div className="main-content">
                    <Header toggleSidebar={toggleSidebar} firstName={user.profile.firstName}
                            lastName={user.profile.lastName} image={user.profile.imageUrl} setSearch={setSearch}
                            search={search} />
                    <DashboardContent setIsModalOpen={setIsModalOpen} />
                    {isModalOpen && (
                        <div className="modal" id="upload-video-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h2>Upload New Video</h2>
                                    <button className="modal-close" id="modal-close">
                                        <i onClick={() => setIsModalOpen(false)} className="fas fa-times"></i>
                                    </button>
                                </div>

                                <div className="modal-body">
                                    <VideoForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} setIsModalOpen={setIsModalOpen} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TeacherDashboard;
