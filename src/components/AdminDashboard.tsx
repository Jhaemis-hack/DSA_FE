"use client";

import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  activeUserData,
} from "../services/authService";
import AdminHeader from "./adminHeader";
import {
  EditUserProfile,
  getAllUsers,
  UpdateRole,
} from "../services/adminService";
import { Error, Success } from "../utils/toastify";
import EditProfileModal from "./EditProfile";

interface Mentee {
  id: string;
  name: string;
  email: string;
  bio: string;
  skill: string[];
  goals: string;
  role: "mentee";
}

interface Mentor {
  id: string;
  name: string;
  email: string;
  skill: string[];
  industry: string[];
  role: "mentor";
}


const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  const [screen, setScreen] = useState("");
  const [selectedUser, setSelectedUser] = useState<{} | null>(null);

  const navigate = useNavigate();

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

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();

      if (response.status_code < 400) {
        const { Mentee_List, Mentor_List } = response.data;
        setMentees(Mentee_List);
        setMentors(Mentor_List);
      }
    } catch (err) {
      Error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers();
    return () => controller.abort();
  }, []);

  const handleUpgrade = async (id: string) => {
    // Call API or update logic to promote this user
    await UpdateRole(id, "mentor");
  };

  const handleDegrade = async (id: string) => {
    // Call API or update logic to demote this user
    await UpdateRole(id, "mentee");
  };

  const handleUpdateUser = async (id: string, updatedValues: any) => {
    try {
      await EditUserProfile(id, updatedValues);
      Success("User profile updated");
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      Error("Update failed");
    }
  };

  const stats = [
    {
      label: "all available mentees",
      value: "Mentee's List",
      icon: "👨‍🌾",
      role: "mentee",
    },
    {
      label: "all available mentors",
      value: "Mentor's List",
      icon: "⭐",
      role: "mentor",
    },
  ];

  if (loading){
    return <div>Loading....</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="max-w-6xl mx-auto px-4 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Admin!
          </h1>
          <p className="text-gray-600">
            Here's what's happening on Mentorship connect.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              onClick={() => setScreen(stat.role)}
              className="bg-white rounded-lg p-2 shadow-sm border border-gray-100 cursor-pointer"
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
          <div className="p-6">
            {screen && screen === "mentee" ? (
              <div className="space-y-4">
                {mentees &&
                  mentees.map((mentee, idx) => (
                    <div
                      key={idx}
                      className="bg-white shadow-md rounded-2xl p-4 mb-6 border border-gray-200 flex flex-col justify-between"
                    >
                      <div>
                        <h2 className="text-xl font-semibold capitalize text-blue-600">
                          {mentee.name}
                        </h2>
                        <p className="text-sm text-gray-500">{mentee.email}</p>

                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                          <p>
                            <strong>Bio:</strong> {mentee.bio}
                          </p>
                          <p>
                            <strong>Skills:</strong> {mentee.skill.join(", ")}
                          </p>
                          <p>
                            <strong>Goals:</strong> {mentee.goals}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm"
                          onClick={() => handleUpgrade(mentee.id)}
                        >
                          Upgrade User
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-sm"
                          onClick={() => handleDegrade(mentee.id)}
                        >
                          Degrade User
                        </button>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                          onClick={() => setSelectedUser(mentee)}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  ))}
                {selectedUser && (
                  <EditProfileModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onSave={handleUpdateUser}
                  />
                )}
              </div>
            ) : (
              ""
            )}

            {screen && screen === "mentor" ? (
              <div className="space-y-4">
                {mentors &&
                  mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="bg-white shadow-md rounded-2xl p-4 mb-6 border border-gray-200 flex flex-col justify-between"
                    >
                      <div>
                        <h2 className="text-xl font-semibold capitalize text-blue-600">
                          {mentor.name}
                        </h2>
                        <p className="text-sm text-gray-500">{mentor.email}</p>

                        <div className="mt-3 space-y-1 text-sm text-gray-700">
                          <p>
                            <strong>Bio:</strong> {mentor.industry}
                          </p>
                          <p>
                            <strong>Skills:</strong> {mentor.skill.join(", ")}
                          </p>
                          <p>
                            <strong>Goals:</strong> {mentor.role}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-between gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm"
                          onClick={() => handleUpgrade(mentor.id)}
                        >
                          Upgrade User
                        </button>
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-sm"
                          onClick={() => handleDegrade(mentor.id)}
                        >
                          Degrade User
                        </button>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 text-sm"
                          onClick={() => setSelectedUser(mentor)}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
