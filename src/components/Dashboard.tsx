"use client";

import Header from "./Header";
import { useStore } from "../UserStore/userData";
import { useLocation, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import {
  activeUserData,
  getUserData,
  obtainFullSessionDetails,
} from "../services/authService";
import { menteeRequest, mentorRequest } from "../utils/request";

interface DashboardProps {
  user: any;
}

type sessionData = {
  id: number;
  mentor: string;
  industry: string[];
  mentee: string;
  date: string;
};

interface userSessionDetail {
  TotalSessions: number;
  activeMentorship: number;
  averageRating: number | null;
  upcomingSessions: sessionData[] | [];
}

const Dashboard = ({ user }: DashboardProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [sessionDetail, setSessionDetail] = useState<userSessionDetail>({
    TotalSessions: 0,
    activeMentorship: 0,
    averageRating: null,
    upcomingSessions: [],
  });

  const navigate = useNavigate();
  const User = useStore((state) => state);

  const isAuthenticated = async () => {
    try {
      const data = await activeUserData();

      if (data.status === 401) {
        navigate("/login", { replace: true });
      }

      if (data.data.status_code < 400) {
        setLoggedIn(true);
      }
    } catch (err: any) {
      if (err.message !== "canceled") {
        navigate("/login", { replace: true });
      }
    }
  };

  if (!loggedIn) {
    isAuthenticated();
  }

  if (!User.userId) {
    getUserData(menteeRequest.myProfile);
  }

  useLayoutEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      const details = await obtainFullSessionDetails();
      setSessionDetail(details);
    }
    fetchDetails();

    return () => controller.abort();
  }, []);

  const stats = [
    {
      label: "Active Mentors",
      value: sessionDetail.activeMentorship,
      icon: "👥",
    },
    { label: "Total Sessions", value: sessionDetail.TotalSessions, icon: "📅" },
    { label: "Average Rating", value: sessionDetail.averageRating, icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="dashboard" />

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {User.username || "John"}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your mentorship journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Upcoming Sessions
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sessionDetail.upcomingSessions.length < 1 ? (
                <div className="flex justify-center items-center">
                  <img src="/emptysession.png" className="h-[18em] w-[20em]" />
                </div>
              ) : (
                sessionDetail.upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {session.mentor.split("")[0].toLowerCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {session.industry[0]}
                        </h3>
                        <p className="text-sm text-gray-600">
                          with {session.mentor}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {session.date}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
