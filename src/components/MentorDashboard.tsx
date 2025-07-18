"use client";

import Header from "./Header";
import { useStore } from "../UserStore/userData";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactEventHandler,
} from "react";
import {
  activeUserData,
  getUserData,
  obtainFullSessionDetails,
} from "../services/authService";
import { menteeRequest, mentorRequest } from "../utils/request";
import { Divide } from "lucide-react";
import {
  getAvailableDays,
  updateAvailableDays,
} from "../services/mentorService";
import { Link } from "react-router-dom";
import { Error } from "../utils/toastify";

interface DashboardProps {
  user: any;
}

const MentorDashboard = ({ user }: DashboardProps) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const role = useLocation().state ? useLocation().state.role : "";
  const User = useStore((state) => state);

  //   const isAuthenticated = async () => {
  //     try {
  //       const data = await activeUserData();

  //       if (data.status === 401) {
  //         navigate("/login", { replace: true });
  //       }

  //       if (data.data.status_code < 400) {
  //         setLoggedIn(true);
  //       }
  //     } catch (err: any) {
  //       if (err.message !== "canceled") {
  //         navigate("/login", { replace: true });
  //       }
  //     }
  //   };

  // if (!loggedIn) {
  //   isAuthenticated();
  // }

  if (role && !User.userId) {
    if (role === "mentee") {
      getUserData(menteeRequest.myProfile);
    } else if (role === "mentor") {
      getUserData(mentorRequest.myProfile);
    } else {
      null;
    }
  }

  const stats = [
    {
      label: "Update Your Availability",
      value: <UpdateAvailability />,
      icon: "📅",
    },
    {
      label: "visit find Mentee Tab.",
      button: ButtonNavigator("/find-mentee"),
      value: "View all Mentorship Requests",
      icon: "👥",
    },
    {
      label: "visit My Session",
      button: ButtonNavigator("/session"),
      value: "View all Available Sessions",
      icon: "⭐",
    },
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
            Here's what's happening with your mentorship.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              {stat.button ? stat.button : ""}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;

function ButtonNavigator(url: string) {
  return (
    <div>
      <Link to={url}>
        <button
          type="submit"
          disabled={false}
          className="disabled:opacity-75 disabled:cursor-not-allowed w-full bg-[#222222] hover:bg-gray-800  text-white py-3 rounded-xl font-medium transition-colors mb-4"
        >
          visit Now
        </button>
      </Link>
    </div>
  );
}

function UpdateAvailability() {
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const [days, setDays] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [startHour, setStartHour] = useState<number | "">("");
  const [endHour, setEndHour] = useState<number | "">("");

  const convertTo12HourFormat = (hour: number): string => {
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const HandleAvailableDaysUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (startHour === "" || endHour === "") {
      Error("Please enter both start and end times");
      return;
    }

    const formattedStart = convertTo12HourFormat(startHour);
    const formattedEnd = convertTo12HourFormat(endHour);

    const data = await updateAvailableDays({
      date: weekdays,
      startTime: formattedStart,
      endTime: formattedEnd,
    });

    if (data.status_code < 400) {
      setWeekdays(data.data.date);
    }
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "clear-list",
  ];

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDateData() {
      const data = await getAvailableDays();

      if (data?.status_code < 400) {
        setWeekdays(data.data.date);
        setStart(data.data.startTime);
        setEnd(data.data.endTime);
      }
    }
    fetchDateData();

    return () => controller.abort();
  }, []);

  const HandleSaveDay = function () {
    setWeekdays((prev) => [...prev, days]);
    setDays("");
  };

  const handleChange = function (e: React.ChangeEvent<HTMLSelectElement>) {
    setDays(e.target.value);
  };

  const handleTextAreaChange = function () {};

  return (
    <div>
      <form
        action=""
        className="w-full text-md "
        onSubmit={HandleAvailableDaysUpdate}
      >
        <div className="flex justify-center items-center gap-4 ">
          <div>
            <label className="text-sm">select available days:</label>
            <select
              name="weekdays"
              className="border-2 px-2 rounded-sm mb-2 cursor-pointer"
              value={days}
              onChange={handleChange}
              required
            >
              {dayNames.map((day, idx) => {
                if (day === "clear-list") {
                  return (
                    <option
                      key={idx}
                      value={day}
                      onClick={() => setWeekdays([])}
                    >
                      {day}
                    </option>
                  );
                }
                return (
                  <option key={idx} value={day}>
                    {day}
                  </option>
                );
              })}
            </select>
          </div>
          <span
            onClick={HandleSaveDay}
            className={`w-full cursor-pointer self-end mb-2 bg-[#888] text-amber-50 py-2 text-center px-3 h-10 text-sm border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
          >
            Add Day
          </span>
        </div>
        <textarea
          id="password"
          name="password"
          value={weekdays}
          onChange={handleTextAreaChange}
          className={`w-full mb-2 px-3 h-12 overflow-x-scroll border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent`}
        />
        <div className="flex justify-between gap-8">
          <input
            type="number"
            min={0}
            max={23}
            value={startHour}
            onChange={(e) =>
              setStartHour(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Start Time (0-23)"
            className={`w-full mb-2 px-3 h-10 overflow-x-scroll border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparent placeholder:font-light`}
          />
          —
          <input
            type="number"
            min={0}
            max={23}
            value={endHour}
            onChange={(e) =>
              setEndHour(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="End Time (0-23)"
            className={`w-full mb-2 px-3 h-10 overflow-x-scroll border border-[#CFCFCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111] focus:border-transparen placeholder:font-light`}
          />
        </div>

        <button
          type="submit"
          disabled={false}
          className="disabled:opacity-75 disabled:cursor-not-allowed w-full bg-[#222222] hover:bg-gray-800  text-white py-3 rounded-xl font-medium transition-colors mb-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
