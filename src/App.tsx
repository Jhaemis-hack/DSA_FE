"use client";

import { useState } from "react";
import type { ResponseInterface } from "./types/index";
import "./index.css";
// import './App.css';
import Router from "./router";
import { ToastContainer } from "react-toastify";
import { useStore } from "./UserStore/userData";
import Axios from "./config";
import { menteeRequest, mentorRequest } from "./utils/request";

async function getUserData(Url: string) {
  try {
    const res: ResponseInterface = await Axios.get(Url);

    if (res.data.status_code < 400) {
      let userId = res.data.data._id;
      let email = res.data.data.email;
      let username = res.data.data.username;
      let bio = res.data.data.bio;
      let skill = res.data.data.skill;
      let goals = res.data.data.goals;
      let industry = res.data.data.industry;
      let role = res.data.data.role;

      await useStore
        .getState()
        .setUserData(
          userId,
          email,
          username,
          bio,
          skill,
          goals,
          industry,
          role
        );
    }
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message);
    }

    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
}

function App() {
  const [role, setRole] = useState<string>("");
  const idExist = useStore((state) => state.userId);
  console.log(role);
  

  if (role && !idExist) {
    if (role === "mentee") {
      getUserData(menteeRequest.myProfile);
    } else {
      getUserData(mentorRequest.myProfile);
    }
  }

  const authSetRoleHandler = (role: string) => {
    setRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Router setUserRole={authSetRoleHandler} />
      <ToastContainer />
    </div>
  );
};

export default App;
