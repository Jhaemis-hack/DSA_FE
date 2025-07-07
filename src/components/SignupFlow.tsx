"use client"

import { useState } from "react"
import RoleSelection from "./RoleSelection"
import MenteeSignupForm from "./MenteeSignupForm"
import MentorSignupForm from "./MentorSignupForm"
import type { UserRole, SignupStep, MenteeSignupData, MentorSignupData } from "../types"

interface SignupFlowProps {
  onComplete: (userData: any) => void
}

const SignupFlow = ({ onComplete }: SignupFlowProps) => {
  const [currentStep, setCurrentStep] = useState<SignupStep>("role-selection")
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
  }

  const handleRoleContinue = () => {
    if (selectedRole === "mentee") {
      setCurrentStep("mentee-form")
    } else if (selectedRole === "mentor") {
      setCurrentStep("mentor-form")
    }
  }

  const handleBack = () => {
    setCurrentStep("role-selection")
    setSelectedRole(null)
  }

  const handleMenteeSubmit = (data: MenteeSignupData) => {
    console.log("Mentee signup data:", data)
    onComplete({ ...data, role: "mentee" })
  }

  const handleMentorSubmit = (data: MentorSignupData) => {
    console.log("Mentor signup data:", data)
    onComplete({ ...data, role: "mentor" })
  }

  return (
    <div className="signup-modal">
      {currentStep === "role-selection" && (
        <RoleSelection selectedRole={selectedRole} onRoleSelect={handleRoleSelect} onContinue={handleRoleContinue} />
      )}

      {currentStep === "mentee-form" && <MenteeSignupForm onBack={handleBack} onSubmit={handleMenteeSubmit} />}

      {currentStep === "mentor-form" && <MentorSignupForm onBack={handleBack} onSubmit={handleMentorSubmit} />}
    </div>
  )
}

export default SignupFlow
