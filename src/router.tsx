import { useRoutes } from "react-router-dom";
import './index.css';
// import './App.css';
import Dashboard from "./components/Dashboard";
import LoginFlow from "./components/LoginFlow";
import SignUp from "./components/SignUp";
import { useState } from "react";
import FindMentors from "./components/FindMentors";
import MySessions from "./components/MySession";
import Home from "../app/page";
import ViewRequest from "./components/ViewRequestStatus";
import MentorSignupForm from "./components/MentorSignupForm";
import UpdateProfile from "./components/MenteeSignupForm";
import BookingUI from "./components/BookingUi";
// import BookMentorship from "./components/BookMentorSHip";

const Router = ({ setUserRole }: any) => {
  const [user, setUser] = useState<any>(null);

  const handleSignupComplete = (userData: any) => {
    setUser(userData);
  };

  const handler = function () {};

  return useRoutes([
    {
      path: "/login",
      element: <LoginFlow onRoleSelect={handler} userRole={setUserRole} />,
    },
    {
      path: "/signup",
      element: <SignUp onRoleSelect={handler} userRole={setUserRole} />,
    },
    { path: "/dashboard", element: <Dashboard user={user} /> },
    { path: "/find-mentors", element: <FindMentors user={user} /> },
    { path: "/sessions", element: <MySessions user={user} /> },
    { path: "/", element: <Home /> },
    { path: "/request-status", element: <ViewRequest user={user} /> },
    // { path: "/book-session", element: <BookMentorship user={user} /> },
    { path: "/mentor", element: <MentorSignupForm  /> },
    { path: "/profile-update", element: <UpdateProfile  /> },
    { path: "/book", element: <BookingUI /> },
  ]);
};

export default Router;
