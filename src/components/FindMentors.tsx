import Header from "./Header";
import { Card } from "./ui/Card";
import type { mentorObject } from "../types";
import MentorMenteeCard from "./MentorMenteeCard";
import { useLayoutEffect, useState } from "react";
import {
  fetchActiveMentors,
  fetchAllMentors,
  sendMentorshipRequest,
} from "../services/menteeService";
import { useNavigate } from "react-router-dom";

interface FindMentorsProps {
  user: any;
}

const FindMentors = ({ user }: FindMentorsProps) => {
  const [mentorId, setMentorId] = useState<string>("");
  const [recomendedMentors, setRecomendeMentors] = useState<mentorObject[]>([]);
  const [mentors, setMentors] = useState<mentorObject[]>([]);
  const navigate = useNavigate();

  const handleMentorshipRequest = async function (id: string) {
    await sendMentorshipRequest(id);
    setMentorId(id);
  };

  useLayoutEffect(() => {
    const controller = new AbortController();

    async function fetchMentors() {
      const [recommendedMentordata, mentorsData] = await Promise.all([
        fetchActiveMentors(),
        fetchAllMentors(),
      ]);

      if (!recommendedMentordata) {
        return navigate("/login", { replace: true });
      }
      setRecomendeMentors(recommendedMentordata.data);
      setMentors(mentorsData.data);
    }
    fetchMentors();

    return () => controller.abort();
  }, [mentorId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} currentPage="find-mentors" />

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Mentor
          </h1>
          <div className="flex space-x-4">
            <select className="form-select bg-white">
              <option>All Categories</option>
              <option>Product Management</option>
              <option>Engineering</option>
              <option>Design</option>
            </select>
            <select className="form-select bg-white">
              <option>Sort by Rating</option>
              <option>Sort by Price</option>
              <option>Sort by Experience</option>
            </select>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-6">Recommended Mentors</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {recomendedMentors.length < 1 ? (
            <div className="flex justify-center items-center">
              <img src="/emptysession.png" className="h-[18em] w-[20em]" />
            </div>
          ) : (
            ""
          )}
          {recomendedMentors &&
            recomendedMentors.map((mentor) => (
              <Card key={mentor._id} className="p-6">
                <MentorMenteeCard
                  makeRequest={handleMentorshipRequest}
                  Role={mentor}
                />
              </Card>
            ))}
        </div>

        <h3 className="text-xl font-semibold mt-10 mb-6">
          All available Mentors
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {mentors.length < 1 ? (
            <div className="flex justify-center items-center">
              <img src="/emptysession.png" className="h-[18em] w-[20em]" />
            </div>
          ) : (
            ""
          )}
          {mentors &&
            mentors.map((mentor) => (
              <Card key={mentor._id} className="p-6">
                <MentorMenteeCard
                  makeRequest={handleMentorshipRequest}
                  Role={mentor}
                />
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FindMentors;
