"use client";

import { useState } from "react";
import "./index.css";
import Router from "./router";
import { ToastContainer } from "react-toastify";
import { useStore } from "./UserStore/userData";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Router />
      <ToastContainer />
    </div>
  );
};

export default App;
