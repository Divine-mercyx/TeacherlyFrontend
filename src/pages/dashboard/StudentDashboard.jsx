import Sidebar from "../../components/Sidebar.jsx";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.jsx";
import Header from "../../components/Header.jsx";
import TeacherCard from "../../components/TeacherCard.jsx";
import axios from "axios";
import Video from "../../components/Video.jsx";

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
        return teachers.filter(teacher => teacher.profile.firstName.toLowerCase().includes(search.toLowerCase().trim()) || teacher.profile.lastName.toLowerCase().includes(search.toLowerCase().trim()));
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
        try {
            const response = await axios.post("http://localhost:8081/api/authenticated/videos", {
                token: user.token,
                id: user.id
            });

            const videos2 = response.data.filter(video => video.ownerId === userId);
            setUserVideos(videos2);

            if (videos2.length > 0) {
                setNotFoundMessage("");
            } else {
                setNotFoundMessage(`${videoOwner} hasn't posted any video`);
            }
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <>
            <div className="student-container">
                <Sidebar sidebarActive={sidebarActive} toggleSidebar={toggleSidebar} />
                <div className="main-content">
                    <Header toggleSidebar={toggleSidebar} firstName={user.profile.firstName} lastName={user.profile.lastName} image={user.profile.imageUrl} setSearch={setSearch} search={search} />
                    <h3 style={{ paddingLeft: "30px", marginTop: "10px" }}>{search.length > 0 ? "Results" : "Popular Teachers"}</h3>
                    <div style={{ paddingLeft: "30px", marginTop: "30px" }} className="teachers-grid">
                        { teachers.length > 0 ? (
                            filteredTeachers.slice(0, limit).map((teacher, index) => (
                            <TeacherCard key={index} teacher={teacher} fetchVideo={fetchVideos} />
                        ))
                        ): (<p style={{ textAlign: "center", marginTop: "100px" }}>No teachers for now</p>)
                        }
                    </div>
                    <p style={{ textAlign: "right", marginTop: "30px", marginRight: "40px" }}>
                        <button onClick={() => showingAll ? showLess() : showAll()} style={{ padding: "10px" }} className="btn btn-primary btn-sm subscribe-btn">
                            { showingAll ? ("Show less") : ("Show more")}
                        </button>
                    </p>
                    <h3 style={{ paddingLeft: "30px", marginTop: "10px" }}>Watch & Download videos</h3>
                    { userVideos.length > 0 ? ("") : (<p style={{ textAlign: "center", marginTop: "100px" }}>{notFoundMessage}</p>) }
                        <div style={{ paddingLeft: "30px", marginTop: "30px" }} className="teachers-grid">
                            { userVideos.length > 0 ? (
                                userVideos.map((video, index) => (
                                    <Video index={index} key={index} video={video} />
                                ))
                            ):
                                <p style={{ textAlign: "center", marginTop: "100px" }}></p>
                            }
                        </div>
                </div>
            </div>
        </>
    )
}
export default StudentDashboard;