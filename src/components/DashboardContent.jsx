import {useContext} from "react";
import {UserContext} from "../context/UserContext.jsx";
import DashboardAction from "./DashboardAction.jsx";

const DashboardContent = (props) => {
    const [user, setUser] = useContext(UserContext);
    const {setIsModalOpen} = props;
    return (
        <>
            <div className="dashboard-content">
                <div className="dashboard-welcome">
                    <h1>Welcome back, {user.profile.firstName}!</h1>
                    <p>Here's what's happening with your channel today.</p>
                </div>

                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-video"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Total Videos</h3>
                            <p className="stat-number">24</p>
                            <span className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 12% from last month
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Subscribers</h3>
                            <p className="stat-number">1,254</p>
                            <span className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 8% from last month
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Total Views</h3>
                            <p className="stat-number">45,621</p>
                            <span className="stat-trend positive">
                                <i className="fas fa-arrow-up"></i> 15% from last month
                            </span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-download"></i>
                        </div>
                        <div className="stat-details">
                            <h3>Downloads</h3>
                            <p className="stat-number">3,845</p>
                            <span className="stat-trend negative">
                                <i className="fas fa-arrow-down"></i> 3% from last month
                            </span>
                        </div>
                    </div>
                </div>
                <DashboardAction setIsModalOpen={setIsModalOpen}  />
            </div>
        </>
    )
}
export default DashboardContent;