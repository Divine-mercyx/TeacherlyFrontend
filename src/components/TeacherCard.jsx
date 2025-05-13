import {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext.jsx";
import axios from "axios";

const TeacherCard = (props) => {
    const { teacher, fetchVideo } = props;
    const [user, setUser] = useContext(UserContext);
    const url = "http://localhost:8081/api/authenticated/subscribe"
    const [subscribers, setSubscribers] = useState([]);
    const [subscriber, setSubscriber] = useState(false);

    const listSub = teacher.profile.subscribersUserIds;

    const subscribe = async (id) => {
        const payload = {
            token: user.token,
            id: user.id,
            subscription: {
                subscriberUserId: user.id,
                subscribedToUserId: id
            }
        }

        await axios.post(url, payload)
            .then((response) => console.log(response.data))
            .catch(err => console.log(err));
        alert(`you've subscribed to ${teacher.profile.firstName} ${teacher.profile.lastName}`);
    }

    useEffect(() => {
        setSubscribers(listSub);
    }, [listSub]);

    if (subscribers.includes(user.id)) {
        setSubscriber(true);
    }

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
                        <button onClick={() => subscribe(teacher.id)} className="btn btn-primary btn-sm subscribe-btn">
                            <i className="fas fa-user-plus"></i> { subscriber ? "unsubscribe" : "subscribe"  }
                        </button>
                        <a onClick={() => fetchVideo(teacher.id, `${teacher.profile.firstName} ${teacher.profile.lastName}`)} className="btn btn-outline btn-sm">View Videos</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TeacherCard