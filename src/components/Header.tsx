"use client"

import { Button } from "./ui/Button"
import type { AppView } from "../types"

interface HeaderProps {
  user: any
  onNavigate: (view: AppView) => void
  currentPage?: string
}

const Header = ({ user, onNavigate, currentPage }: HeaderProps) => {
  return (
    <header className="w-full px-4 py-4 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">MentorConnect</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onNavigate("dashboard")}
            className={`font-medium hover:text-blue-700 transition-colors ${
              currentPage === "dashboard" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onNavigate("find-mentors")}
            className={`hover:text-gray-900 transition-colors ${
              currentPage === "find-mentors" ? "text-blue-600 font-medium" : "text-gray-600"
            }`}
          >
            Find Mentors
          </button>
          <button
            onClick={() => onNavigate("my-sessions")}
            className={`hover:text-gray-900 transition-colors ${
              currentPage === "my-sessions" ? "text-blue-600 font-medium" : "text-gray-600"
            }`}
          >
            My Sessions
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            Log in
          </Button>
          <Button size="sm">Get Started</Button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">{user?.firstName?.[0] || "J"}</span>
          </div>
          <span className="text-sm text-gray-600">Logout</span>
        </div>
      </div>
    </header>
  )
}

export default Header
