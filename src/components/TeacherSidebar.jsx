import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const TeacherSidebar = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();


    const logout = () => {
        setUser({});
        localStorage.setItem("status", JSON.stringify("logout"));
        navigate("/login");
    }
    return (
        <>
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2 className="logo">Teacherly</h2>
                    <button className="sidebar-close" id="sidebar-close">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src={user.profile.imageUrl} alt="User Avatar"/>
                    </div>
                    <div className="user-info">
                        <h3>{user.profile.firstName} {user.profile.lastName}</h3>
                        <span className="user-role">Teacher</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active">
                            <a href="#"><i className="fas fa-home"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-video"></i> My Videos</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-users"></i> Subscribers</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-chart-line"></i> Analytics</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-cog"></i> Settings</a>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <a className="logout-btn" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Logout</a>
                    <button className="delete-account-btn"><i className="fas fa-trash-alt"></i> Delete Account</button>
                </div>
            </aside>
        </>
    )
}
export default TeacherSidebar;