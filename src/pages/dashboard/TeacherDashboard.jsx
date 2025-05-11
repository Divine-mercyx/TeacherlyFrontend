import TeacherSidebar from "../../components/TeacherSidebar.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../context/UserContext.jsx";
import Header from "../../components/Header.jsx";
import DashboardContent from "../../components/DashboardContent.jsx";

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [search, setSearch] = useState("");

    const toggleSidebar = () => {
        setSidebarActive(!sidebarActive);
    };


    return (
        <>
            <div className="teacher-container">
                <TeacherSidebar />
                <div className="main-content">
                    <Header toggleSidebar={toggleSidebar} firstName={user.profile.firstName} lastName={user.profile.lastName} image={user.profile.imageUrl} setSearch={setSearch} search={search} />
                    <DashboardContent />
                </div>
            </div>
        </>
    )
}
export default TeacherDashboard