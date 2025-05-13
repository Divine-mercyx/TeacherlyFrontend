import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const Sidebar = (props) => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const {sidebarActive, toggleSidebar} = props

    const status = JSON.parse(localStorage.getItem("status")) || "login";

    if (status === "logout") {
        navigate("/login");
    }

    const logout = () => {
        setUser({});
        localStorage.setItem("status", JSON.stringify("logout"));
        navigate("/login");
    }


    return (
        <>
            <aside className={`sidebar ${sidebarActive ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h2 className="logo">Teacherly</h2>
                    <button className="sidebar-close" onClick={toggleSidebar}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <div className="user-profile">
                    <div className="user-avatar">
                        <img src={user.profile.imageUrl} alt="User Avatar" />
                    </div>
                    <div className="user-info">
                        <h3>{ user.profile.firstName} {user.profile.lastName }</h3>
                        <span className="user-role">{user.profile.role}</span>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className="active"><a href="#"><i className="fas fa-home"></i> Dashboard</a></li>
                        <li className=""><a className="logout-btn" onClick={() => logout()}><i className="fas fa-sign-out-alt"></i> Logout</a></li>
                        <li className=""><button className="delete-account-btn"><i className="fas fa-trash-alt"></i> Delete Account</button></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">


                </div>
            </aside>
        </>
    )
}
export default Sidebar;