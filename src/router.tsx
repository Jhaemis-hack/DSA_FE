import { useRoutes } from "react-router-dom";
import './index.css';
// import './App.css';
import Dashboard from "./components/Dashboard";
import LoginFlow from "./components/LoginFlow";
import SignUp from "./components/SignUp";
import FindMentors from "./components/FindMentors";
import MySessions from "./components/MySession";
import Home from "../app/page";
import ViewRequest from "./components/ViewRequestStatus";
import MentorSignupForm from "./components/MentorSignupForm";
import UpdateProfile from "./components/updateProfile";
import { useStore } from "./UserStore/userData";
import MentorDashboard from "./components/MentorDashboard";
import FindMentees from "./components/findMentee";
import MentorSessions from "./components/mentorSessions";
import AdminDashboard from "./components/AdminDashboard";
import CreateNewUser from "./components/createNewUser";

const Router = () => {
  const user = useStore(state=> state)

  return useRoutes([
    {
      path: "/login",
      element: <LoginFlow />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    { path: "/dashboard", element: <Dashboard user={user} /> },
    { path: "/find-mentors", element: <FindMentors user={user} /> },
    { path: "/sessions", element: <MySessions user={user} /> },
    { path: "/", element: <Home /> },
    { path: "/request-status", element: <ViewRequest user={user} /> },
    { path: "/mentor", element: <MentorSignupForm  /> },
    { path: "/profile-update", element: <UpdateProfile  /> },
    { path: "/men-dashboard", element: <MentorDashboard user={(user)} /> },
    { path: "/find-mentee", element: <FindMentees /> },
    { path: "/sessions-mentor", element: <MentorSessions user={user}/> },
    { path: "/admin-dashboard", element: <AdminDashboard /> },
    { path: "/create-account", element: <CreateNewUser/> },
  ]);
};

export default Router;
