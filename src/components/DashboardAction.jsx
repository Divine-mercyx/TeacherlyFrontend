
const DashboardAction = () => {
    return (
        <>
            <div className="dashboard-actions">
                <button className="btn btn-primary" id="upload-video-btn">
                    <i className="fas fa-plus"></i> Upload New Video
                </button>
                <button className="btn btn-outline">
                    <i className="fas fa-bullhorn"></i> Announce to Subscribers
                </button>
            </div>
        </>
    )
}
export default DashboardAction;