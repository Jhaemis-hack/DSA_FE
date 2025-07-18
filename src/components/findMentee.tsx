import { useEffect, useLayoutEffect, useState } from "react";
import Header from "./Header";
import { useStore } from "../UserStore/userData";
import MentorMenteeCard from "./MentorMenteeCard";
import { Card } from "./ui/Card";
import {
  FetchMenteeMentorshipRequests,
  updateRequest,
} from "../services/mentorService";
import { useNavigate } from "react-router-dom";
import type { UserState } from "../types";

interface MenteeRequest {
  _id: string;
  menteeId: string;
  name: string;
  bio: string;
  skill: string;
  goals: string;
  status: string;
}

const FindMentees = () => {
  const [menteeId, setMenteeId] = useState("");
  const [menteeRequest, setMenteeRequest] = useState<MenteeRequest[]>([]);
  //   const [mentors, setMentors] = useState<mentorObject[]>([]);

  const user: UserState = useStore((state) => state);

  const navigate = useNavigate();

  const handleMentorshipRequest = function (id: string) {
    setMenteeId(id);
  };

  useEffect(() => {
    const controller = new AbortController();

    if (!menteeId) return;

    async function requestMentorship() {
      await updateRequest(menteeId.split("?")[0], menteeId.split("?")[1]);
    }
    requestMentorship();

    return () => controller.abort();
  }, [menteeId]);

  useLayoutEffect(() => {
    const controller = new AbortController();

    async function fetchMentors() {
      const data = await FetchMenteeMentorshipRequests();

      if (data.status === 401) {
        return navigate("/login", { replace: true });
      }
      setMenteeRequest(data.data);
    }
    fetchMentors();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="dashboard" />
      <div className="max-w-6xl mx-auto px-4 pt-24">
        <h3 className="text-xl font-semibold mb-6">Mentee Requests</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {menteeRequest.length === 1  ? (
            <div className="flex justify-center items-center">
              <img src="/emptysession.png" className="h-[18em] w-[20em]" />
            </div>
          ) : (
            ""
          )}
          {menteeRequest.length > 1 &&
            menteeRequest.map((mentee) => (
              <Card key={mentee._id} className="p-6">
                <MentorMenteeCard
                  makeRequest={handleMentorshipRequest}
                  Role={mentee}
                />
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FindMentees;
