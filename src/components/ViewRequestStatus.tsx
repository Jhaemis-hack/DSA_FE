import Header from "./Header";
import { Card } from "./ui/Card";
import type {  requestStatusType } from "../types";
import MentorMenteeCard from "./MentorMenteeCard";
import { useEffect, useState } from "react";
import {  viewRequestStatus } from "../services/menteeService";
import { useNavigate } from "react-router-dom";
import { useStore } from "../UserStore/userData";

interface FindMentorsProps {
  user: any;
}

const ViewRequest = ({ user }: FindMentorsProps) => {
  const [mentorId, setMentorId] = useState<string>("");
  const [requests, setRequests] = useState<requestStatusType[]>();
  const navigate = useNavigate();
  

  const handleMentorshipRequest = function (id: string) {
    setMentorId(id);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function MentorshipRequestStatus() {
      const data = await viewRequestStatus();
      if (data.status_code === 401) {        
        return navigate("/login", { replace: true });
      }
      setRequests(data.data);
    }
    MentorshipRequestStatus();

    return () => controller.abort();
  }, [mentorId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="find-mentors" />

      <div className="max-w-6xl mx-auto px-4 pt-24">
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

