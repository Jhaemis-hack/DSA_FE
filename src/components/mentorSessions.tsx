"use client";

import Header from "./Header";
import type { SessionType } from "../types";
import PassSessions from "./PassSessionCard";
import UpcomingSession from "./UpcomingSessionCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActiveSessions } from "../services/mentorService";

interface MySessionsProps {
  user: any;
}

const MentorSessions = ({ user }: MySessionsProps) => {
  const [sessions, setSessions] = useState<SessionType[]>();
  const navigate = useNavigate()


    useEffect(() => {
      const controller = new AbortController();
  
      async function fetchMentors() {
        const data = await getActiveSessions();

        if (data.status && data.status === 401){
          navigate("/login", { replace: true})
        }        
        console.log(data);
        
        
        setSessions(data.data);
      }
      fetchMentors();
  
      return () => controller.abort();
    }, []);

    console.log(sessions);
    
  

//   const handleJoinSession = (sessionId: number) => {
//     console.log("Joining session:", sessionId);
//     // Implement join session logic
//   };

//   const handleRateAgain = (sessionId: number) => {
//     console.log("Rating session again:", sessionId);
//     // Implement rating logic
//   };

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span
//         key={index}
//         className={index < rating ? "text-yellow-400" : "text-gray-300"}
//       >
//         ⭐
//       </span>
//     ));
//   };

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
            {Array.isArray(sessions) && sessions.map(session => {
              if(session.sessionStatus==="scheduled"){ 
                return <UpcomingSession key={session.id} session={session} />
              }
            }
            )}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Past Sessions
          </h2>
          <div className="space-y-4">
            {Array.isArray(sessions) && sessions.map(session => {
              if(session.sessionStatus==="completed"){
              return <PassSessions key={session.id} session={session} />
              }}
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorSessions;
