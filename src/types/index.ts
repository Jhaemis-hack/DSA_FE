export type UserRole = "mentee" | "mentor" | null;

export interface MenteeProfileUpdate {
  firstName: string;
  lastName: string;
  bio: string;
  skill: string;
  goals: string;
}

export interface MentorSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  teachingArea: string;
}

export type SignupStep = "role-selection" | "mentee-form" | "mentor-form";

// Add the AppView type here so it can be imported by other components
export type AppView = "dashboard" | "find-mentors" | "my-sessions";

export interface AuthRequestInterface {
  base: string;
  login: string;
  profile: string;
  register: string;
  logOut: string;
  activeUser: string;
  obtainDetails: string;
}

export interface menteeRequestInterface {
  base: string;
  myProfile: string;
  fetchAllMentors: string;
  randomProfile: (id: string) => string;
  updateProfile: string;
  fetchMentors: string;
  sendRequest: (mentorId: string) => string;
  fetchMentorAvailability: (mentorId: string) => string;
  bookSession: (mentorId: string) => string;
  viewSessions: string;
  sendSessionFeedback: (sessionId: string) => string;
  viewSentRequests: string;
}

export interface mentorRequestInterface {
  base: string;
  myProfile: string,
  viewRequest: string;
  getAvailability: string;
  updateRequestStatus: (reqId: string, action: string) => string;
  fetchActiveSessions: string;
  editAvailability: string;
}

export interface adminRequestInterface {
  base: string;
  fetchAllUsers: string;
  updateRole: (id: string) => string;
  createNewUser: string;
  editProfile: (id: string) => string;
}

export interface UserState {
  userId: string | null;
  email: string | null;
  username: string | null;
  bio: string | null;
  skill: string[] | null;
  goals: string | null;
  role: string | null;
  industry: string | null;
}

export interface ResponseInterface {
  status_code: number;
  message: string;
  data: any | null;
}

export interface mentorObject {
    _id: string;
    mentorId: string;
    name: string;
    skill: string[];
    industry: string[];
}

export interface requestStatusType {
  id: string;
  name: string;
  skill: string[];
  industry: string[];
  status: string;
  date: string;
}

export interface SessionType {
  id: string;
  name: string;
  skill: string;
  industry: string;
  sessionStatus: string;
  feedback: string;
  rating: number;
  date: string;
  start: string;
  end: string;
}