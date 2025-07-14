"use client"

import { useState } from "react"
import type { AppView } from "./types/index"
import './index.css';
// import './App.css';
import Router from "./router"


function App() {
  const [currentView, setCurrentView] = useState<AppView>("dashboard")
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
      <Router onComplete={handleSignupComplete}/>
    </div>
  )
}

export default App
