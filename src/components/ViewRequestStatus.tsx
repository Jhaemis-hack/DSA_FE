import Header from "./Header";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import type { AppView, requestStatusType } from "../types";
import MentorMenteeCard from "./MentorMenteeCard";
import { useEffect, useState } from "react";
import { BookASession, viewRequestStatus } from "../services/menteeService";

interface FindMentorsProps {
  user: any;
}

const ViewRequest = ({ user }: FindMentorsProps) => {
  const [mentorId, setMentorId] = useState<string>("");
  const [requests, setRequests] = useState<requestStatusType[]>();

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "SC",
      rating: 4.9,
      sessions: 150,
      skills: ["Product Strategy", "User Research"],
      price: 120,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "MJ",
      rating: 4.7,
      sessions: 200,
      skills: ["Software Design", "Team Leadership"],
      price: 150,
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      avatar: "ER",
      rating: 4.8,
      sessions: 175,
      skills: ["UI/UX Design", "Design Systems"],
      price: 100,
    },
  ];

  const handleMentorshipRequest = function (id: string) {
    setMentorId(id);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function MentorshipRequestStatus() {
      const { data } = await viewRequestStatus();
      setRequests(data);
    }
    MentorshipRequestStatus();

    return () => controller.abort();
  }, [mentorId]);

  useEffect(() => {
    const controller = new AbortController();
    if(!requests) return;
    
    async function boookSession() {
      await BookASession(mentorId);
    }
    boookSession();

    return () => controller.abort();
  }, [mentorId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="find-mentors" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mentorship Requests
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {!requests && (
            <div className="flex justify-center items-center">
              <img src="/emptysession.png" className="h-[18em] w-[20em]" />
            </div>
          )}
          {requests &&
            requests.map((request) => (
              <Card key={request.id} className="p-6">
                <MentorMenteeCard
                  makeRequest={handleMentorshipRequest}
                  Role={request}
                />
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
