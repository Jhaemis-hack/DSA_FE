export type UserRole = "mentee" | "mentor" | null

export interface MenteeSignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  lookingFor: string
}

export interface MentorSignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  teachingArea: string
}

export type SignupStep = "role-selection" | "mentee-form" | "mentor-form"

// Add the AppView type here so it can be imported by other components
export type AppView = "dashboard" | "find-mentors" | "my-sessions"
