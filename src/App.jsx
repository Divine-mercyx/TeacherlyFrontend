import './App.css'
import Login from "./pages/auth/Login.jsx";
import {Route, Routes} from "react-router-dom";
import Signup from "./pages/auth/Signup.jsx";
import Profile from "./pages/auth/Profile.jsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard.jsx";

function App() {

  return (
    <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile/setup" element={<Profile />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Routes>
    </>
  )
}

export default App
