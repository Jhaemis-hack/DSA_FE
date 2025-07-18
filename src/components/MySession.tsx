"use client";

import Header from "./Header";
import type { SessionType } from "../types";
import PassSessions from "./PassSessionCard";
import UpcomingSession from "./UpcomingSessionCard";
import { useEffect, useState } from "react";
import { viewAvailableSessions } from "../services/menteeService";
import { useNavigate } from "react-router-dom";

interface MySessionsProps {
  user: any;
}

const MySessions = ({ user }: MySessionsProps) => {
  const [sessions, setSessions] = useState<SessionType[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMentors() {
      const data = await viewAvailableSessions();

      if (data.status && data.status === 401) {
        navigate("/login", { replace: true });
      }

      setSessions(data.data);
    }
    fetchMentors();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="my-sessions" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Sessions</h1>

        {/* Upcoming Sessions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Upcoming Sessions
          </h2>
          <div className="space-y-4">
            {Array.isArray(sessions) &&
              sessions.map((session) => {
                if (session.sessionStatus === "scheduled") {
                  return <UpcomingSession key={session.id} session={session} />;
                }
              })}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Past Sessions
          </h2>
          <div className="space-y-4">
            {Array.isArray(sessions) &&
              sessions.map((session) => {
                if (session.sessionStatus === "completed") {
                  return <PassSessions key={session.id} session={session} />;
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySessions;
