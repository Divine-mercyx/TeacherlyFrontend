
const Video = (props) => {
    const { index, video } = props;
    return (
        <>
            <div key={index} style={{ padding: "0%" }} className="teacher-card">
                <video width="100%" height="210" >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <p style={{ fontSize: "17px" }} className="teacher-stats">
                    {video.title}
                </p>
                <div style={{ padding: "0px 18px", paddingBottom: "15px" }} className="teacher-actions">
                    <button className="btn btn-primary btn-sm subscribe-btn">
                        Download
                    </button>
                    <a href={video.url} className="btn btn-outline btn-sm">Watch full screen</a>
                </div>
            </div>
        </>
    )
}
export default Video