"use client";

import Header from "./Header";
import type { AppView } from "../types";
import PassSessions from "./PassSessionCard";
import UpcomingSession from "./UpcomingSessionCard";

interface MySessionsProps {
  user: any;
}

const MySessions = ({ user }: MySessionsProps) => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Product Strategy Review",
      mentor: "Sarah Chen",
      time: "Today 2:00 PM",
      avatar: "SC",
      status: "active",
    },
    {
      id: 2,
      title: "Technical Architecture",
      mentor: "Marcus Johnson",
      time: "Tomorrow 10:00 AM",
      avatar: "MJ",
      status: "active",
    },
    {
      id: 3,
      title: "Design Thinking Review",
      mentor: "Elena Rodriguez",
      time: "Friday 3:00 PM",
      avatar: "ER",
      status: "pending",
    },
  ];

  const pastSessions = [
    {
      id: 4,
      title: "UI/UX Fundamentals",
      mentor: "Sarah Chen",
      date: "Jan 15, 2024",
      avatar: "SC",
      rating: 5,
    },
    {
      id: 5,
      title: "Leadership Skills",
      mentor: "Marcus Johnson",
      date: "Jan 10, 2024",
      avatar: "MJ",
      rating: 4,
    },
    {
      id: 6,
      title: "Technical Feedback",
      mentor: "Elena Rodriguez",
      date: "Jan 5, 2024",
      avatar: "ER",
      rating: 5,
    },
  ];

  const handleJoinSession = (sessionId: number) => {
    console.log("Joining session:", sessionId);
    // Implement join session logic
  };

  const handleReschedule = (sessionId: number) => {
    console.log("Rescheduling session:", sessionId);
    // Implement reschedule logic
  };

  const handleRateAgain = (sessionId: number) => {
    console.log("Rating session again:", sessionId);
    // Implement rating logic
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ⭐
      </span>
    ));
  };

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
            {upcomingSessions.map((session) => (
              <UpcomingSession session={session} />
            ))}
          </div>
        </div>

        {/* Past Sessions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Past Sessions
          </h2>
          <div className="space-y-4">
            {pastSessions.map((session) => (
              <PassSessions session={session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySessions;
