"use client";

import { useState } from "react";
import Axios from "../config";
import { logOut } from "../services/authService";
import type { ResponseInterface } from "../types";
import { useStore } from "../UserStore/userData";
import { authRequest } from "../utils/request";
import { Error, Success } from "../utils/toastify";
import DropDown from "./DropDown";
import { Button } from "./ui/Button";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  user: any;
  currentPage?: string;
}

const Header = ({ user, currentPage }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogOutEvent = async function () {
    const response = await logOut();

    if (response?.status_code === 200) {
      await useStore.getState().clearUserData();
      navigate("/", { replace: true });
    }
  };

  const [open, setOpen] = useState<boolean>(false);

  return (
    <header className="w-full px-4 py-4 bg-white border-b border-gray-200 fixed z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">
            MentorConnect
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 relative">
          <Link to="/dashboard">
            <button
              className={`font-medium hover:text-blue-700 transition-colors cursor-pointer ${
                currentPage === "dashboard" ? "text-blue-600" : "text-gray-600"
              }`}
            >
              Dashboard
            </button>
          </Link>
          <button
            className={`hover:text-gray-900 transition-colors cursor-pointer ${
              currentPage === "find-mentors"
                ? "text-blue-600 font-medium"
                : "text-gray-600"
            }`}
            onClick={()=>setOpen(!open)}
          >
            {user?.role === "mentor" ? "view mentees" : "Find Mentors"}
          </button>
          {open ?  <DropDown click={()=> setOpen(!open)} /> : ""}
          <Link to="/sessions">
            <button
              className={`hover:text-gray-900 transition-colors cursor-pointer ${
                currentPage === "my-sessions"
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              }`}
            >
              My Sessions
            </button>
          </Link>
        </nav>
        <div className="flex items-center space-x-3">
          <div className="flex justify-center gap-4">
            <div className="w-9 h-9  bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
              <span className="text-white font-semibold text-sm ">
                {user?.firstName?.[0] || "J"}
              </span>
            </div>
            <Button size="sm" variant="fire" onClick={handleLogOutEvent}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
