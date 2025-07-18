"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { MenteeProfileUpdate } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";
import { useStore } from "../UserStore/userData";
import { profileData, updateUserProfile } from "../services/menteeService";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const New = useLocation().state?.new;
  const User = useStore((state) => state);
  const [loaded, setLoaded] = useState<boolean>(false)

  console.log(New);
  
  const [formData, setFormData] = useState<MenteeProfileUpdate>({
    firstName: "",
    lastName: "",
    bio: "",
    skill: "",
    goals: "",
  });

  if ((!loaded && User.bio)) {
    setLoaded(!loaded);
    setFormData({
      ...formData,
      firstName: User.username?.split(" ")[0] || "",
      lastName: User.username?.split(" ")[1] || "",
      bio: User.bio || "",
      skill: User.skill?.join(", ") || "",
      goals: User.goals || "",
    });
  }

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetails() {
      const {data} = await profileData();      
      if(data){
        setFormData({
          ...formData,
          firstName: data.username.split(" ")[0],
          lastName: data.username?.split(" ")[1],
          bio: data.bio,
          skill: data.skill?.join(" "),
          goals: data.goals,
        });        
      }
    }

    if (!loaded) {
      fetchDetails();
      setLoaded(true);
    }

    return () => controller.abort();
  }, []);

  const UpdateProfileHandler = async function (e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      bio: formData.bio,
      skill: formData.skill.split(" "),
      goals: formData.goals,
    };

    await updateUserProfile(payload);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: `${formData.firstName} ${formData.lastName}`,
      bio: formData.bio,
      skill: formData.skill.split(" "),
      goals: formData.goals,
    };

    const data = await updateProfile(payload);

    if (data?.status_code === 201) {
      navigate("/dashboard", { replace: true });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const iscreateProfileFormeValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  const isUpdateProfileFormeValid = Object.values(formData).some(
    (value) => value.trim() !== ""
  );

  return (
    <>
      <div className="flex justify-center items-center flex-col px-10 py-16 md:flex md:justify-center md:items-center ">
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#1f2937",
          }}
        >
          {!New ? "Manage Profile" : "Create Your Profile"}
        </h2>
        <p style={{ color: "#6b7280", marginBottom: "12px", fontSize: "12px" }}>
          this enable us to match you to the right mentor.
        </p>

        <form
          onSubmit={!New ? UpdateProfileHandler : handleSubmit}
          className="w-full md:max-w-[40rem] text-md"
        >
          <div className="form-row">
            <div className="form-group mb-6">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={!New}
              />
            </div>
            <div className="form-group mb-6">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={!New}
              />
            </div>
          </div>

          <div className="form-group mb-6">
            <label className="form-label">bio</label>
            <textarea
              name="bio"
              className={`w-full px-3 py-2 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
              placeholder="john@example.com"
              value={formData.bio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label">
              skill (e.g, running dancing reading...)
            </label>
            <input
              type="text"
              name="skill"
              className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
              value={formData.skill}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label">goals</label>
            <input
              type="text"
              name="goals"
              className={`w-full px-3 h-12 border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
              value={formData.goals}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!iscreateProfileFormeValid && !isUpdateProfileFormeValid}
            className="disabled:opacity-75 disabled:cursor-not-allowed w-full bg-[#222222] hover:bg-gray-800  text-white py-4 rounded-xl font-medium transition-colors mb-4"
          >
            Update profile
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProfile;
