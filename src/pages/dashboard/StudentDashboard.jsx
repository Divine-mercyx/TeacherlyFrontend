import Sidebar from "../../components/Sidebar.jsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";
import Header from "../../components/Header.jsx";
import TeacherCard from "../../components/TeacherCard.jsx";
import axios from "axios";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState(false);
    const url = "http://localhost:8081/api/authenticated/popular/teacher"
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(5);
    const [videos, setVideos] = useState([]);
    const [userVideos, setUserVideos] = useState([]);
    const [notFoundMessage, setNotFoundMessage] = useState("");
    const [showingAll, setShowingAll] = useState(false);

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };

    useEffect(() => {
        const fetchData = async () => {
            const request = {
                token: user.token,
                id: user.id
            }
            await axios.post(url, request)
                .then(res => setTeachers(res.data))
                .catch(err => console.log(err));
        }
        fetchData();
    })

    const fetchTeachers = (search) => {
        return teachers.filter(teacher => teacher.profile.firstName.toLowerCase().includes(search.toLowerCase()) || teacher.profile.lastName.toLowerCase().includes(search.toLowerCase()));
    }

    const filteredTeachers = fetchTeachers(search);

    const showAll = () => {
        setSearch("");
        setLimit(teachers.length);
        setShowingAll(true);
    }

    const showLess = () => {
        setSearch("");
        setShowingAll(false);
        setLimit(5);
    }

    const fetchVideos = async (userId, videoOwner) => {
         await axios.post("http://localhost:8081/api/authenticated/videos", {token: user.token, id: user.id})
            .then(res => setVideos(res.data))
            .catch(err => console.log(err));
        const videos2 = videos.filter(video => video.user.id !== userId);
        setUserVideos(videos2);
        setNotFoundMessage(videos2.length > 0 ? "" : `${videoOwner} haven't posted any video`);
    }


    return (
        <>
            <div className="student-dashboard">
                <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <Header toggleSidebar={toggleSidebar} firstName={user.profile.firstName} lastName={user.profile.lastName} image={user.profile.imageUrl} setSearch={setSearch} search={search} />
                    <h3 style={{ paddingLeft: "30px", marginTop: "10px" }}>Popular Teachers</h3>
                    <div style={{ paddingLeft: "30px", marginTop: "30px" }} className="teachers-grid">
                        {filteredTeachers.slice(0, limit).map((teacher, index) => (
                            <TeacherCard key={index} teacher={teacher} fetchVideo={fetchVideos} />
                        ))}
                    </div>
                    <p style={{ textAlign: "right", marginTop: "30px", marginRight: "40px" }}>
                        <button onClick={() => showingAll ? showLess() : showAll()} style={{ padding: "10px" }} className="btn btn-primary btn-sm subscribe-btn">
                            <i className="fas fa-user-plus"></i> See More
                        </button>
                    </p>
                    <h3 style={{ paddingLeft: "30px", marginTop: "10px" }}>Download videos</h3>
                    { userVideos.length > 0 ? (
                        <p>videos</p>
                    ):
                        <p style={{ textAlign: "center", marginTop: "100px" }}>{notFoundMessage}</p>
                    }
                </div>
            </div>
        </>
    )
}
export default StudentDashboard;