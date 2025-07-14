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

const Router = ({ onComplete }: any) => {
  const [user, setUser] = useState<any>(null);

  const handleSignupComplete = (userData: any) => {
    setUser(userData);
  };

  const handler = function () {};

  return useRoutes([
    {
      path: "/login",
      element: <LoginFlow onRoleSelect={handler} onContinue={onComplete} />,
    },
    {
      path: "/signup",
      element: <SignUp onRoleSelect={handler} onContinue={onComplete} />,
    },
    { path: "/", element: <Dashboard user={user} /> },
    { path: "/find-mentors", element: <FindMentors user={user} /> },
    { path: "/sessions", element: <MySessions user={user} /> },
    { path: "/onboarding", element: <Home /> },
  ]);
};

export default Router;
