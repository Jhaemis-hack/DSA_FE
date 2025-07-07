"use client"

import Header from "./Header"
import type { AppView } from "../types"

interface DashboardProps {
  user: any
  onNavigate: (view: AppView) => void
}

const Dashboard = ({ user, onNavigate }: DashboardProps) => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Product Strategy Review",
      mentor: "Sarah Chen",
      time: "Today 2:00 PM",
      avatar: "SC",
    },
    {
      id: 2,
      title: "Technical Architecture",
      mentor: "Marcus Johnson",
      time: "Tomorrow 10:00 AM",
      avatar: "MJ",
    },
    {
      id: 3,
      title: "Design Thinking Review",
      mentor: "Elena Rodriguez",
      time: "Friday 3:00 PM",
      avatar: "ER",
    },
  ]

  const stats = [
    { label: "Active Mentors", value: "3", icon: "👥" },
    { label: "Total Sessions", value: "8", icon: "📅" },
    { label: "Hours Completed", value: "12", icon: "⏱️" },
    { label: "Average Rating", value: "4.8", icon: "⭐" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onNavigate={onNavigate} currentPage="dashboard" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName || "John"}!</h1>
          <p className="text-gray-600">Here's what's happening with your mentorship journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{session.avatar}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">with {session.mentor}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium">{session.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
