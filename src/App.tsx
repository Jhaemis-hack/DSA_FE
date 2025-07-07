"use client"

import { useState } from "react"
import SignupFlow from "./components/SignupFlow"
import Dashboard from "./components/Dashboard"
import FindMentors from "./components/FindMentors"
import MySessions from "./components/MySession"
import type { AppView } from "./types/index"
import "./App.css"

function App() {
  const [currentView, setCurrentView] = useState<AppView>("signup")
  const [user, setUser] = useState<any>(null)

  const handleSignupComplete = (userData: any) => {
    setUser(userData)
    setCurrentView("dashboard")
  }

  const handleNavigation = (view: AppView) => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === "signup" && (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
          <SignupFlow onComplete={handleSignupComplete} />
        </div>
      )}

      {currentView === "dashboard" && <Dashboard user={user} onNavigate={handleNavigation} />}

      {currentView === "find-mentors" && <FindMentors user={user} onNavigate={handleNavigation} />}

      {currentView === "my-sessions" && <MySessions user={user} onNavigate={handleNavigation} />}
    </div>
  )
}

export default App
