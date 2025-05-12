import './App.css'
import Login from "./pages/auth/Login.jsx";
import {Route, Routes, useNavigate} from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Profile from "./pages/profile/Profile.jsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard.jsx";
import {useContext} from "react";
import {UserContext} from "./context/UserContext.jsx";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard.jsx";
function App() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

  return (
    <>
        <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/setup" element={<Profile />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Routes>
    </>
  )
}

export default App
