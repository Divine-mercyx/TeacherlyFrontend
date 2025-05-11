
const TeacherCard = (props) => {
    const { teacher, fetchVideo } = props;

    return (
        <>
            <div className="teacher-card">
                <div className="teacher-avatar">
                    <img src={teacher.profile.imageUrl} alt="Teacher Avatar"/>
                </div>
                <div className="teacher-info">
                    <h3>{teacher.profile.firstName} {teacher.profile.lastName}</h3>
                    <p className="teacher-subject">Biology</p>
                    <p className="teacher-stats">
                        <span><i className="fas fa-video"></i> 15 videos</span>
                        <span><i className="fas fa-users"></i> 820 subscribers</span>
                    </p>
                    <div className="teacher-actions">
                        <button className="btn btn-primary btn-sm subscribe-btn">
                            <i className="fas fa-user-plus"></i> Subscribe
                        </button>
                        <a onClick={() => fetchVideo(teacher.id, `${teacher.profile.firstName} ${teacher.profile.lastName}`)} className="btn btn-outline btn-sm">View Videos</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherCard