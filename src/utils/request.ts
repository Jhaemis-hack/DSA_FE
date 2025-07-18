import type {
  adminRequestInterface,
  AuthRequestInterface,
  menteeRequestInterface,
  mentorRequestInterface,
} from "../types";

export const authRequest: AuthRequestInterface = {
  base: "auth/",
  login: `auth/login`,
  profile: "auth/profile",
  register: "auth/register",
  logOut: "auth/logout",
  activeUser: "auth/me",
  obtainDetails: "auth/fulldetails",
};

export const menteeRequest: menteeRequestInterface = {
  base: "users/",
  myProfile: "users/me",
  randomProfile(id: string) {
    return `users/${id}`;
  },
  updateProfile: "users/me/profile",
  fetchMentors: "users/",
  fetchAllMentors: "users/mentors/all",
  sendRequest(mentorId: string) {
    return `users/requests/${mentorId}`;
  },
  fetchMentorAvailability(mentorId: string) {
    return `users/${mentorId}/availability`;
  },
  bookSession(mentorId: string) {
    return `users/session/book/${mentorId}`;
  },
  viewSessions: "users/sessions/mentee",
  sendSessionFeedback(sessionId: string) {
    return `users/sessions/${sessionId}/feedback`;
  },
  viewSentRequests: "users/requests/sent",
};

export const mentorRequest: mentorRequestInterface = {
  base: "mentors",
  myProfile: "mentors/me",
  viewRequest: "mentors/requests/received",
  getAvailability: "mentors/available",
  updateRequestStatus(reqId: string, action: string) {
    return `mentors/requests/${reqId}?atn=${action}`;
  },
  fetchActiveSessions: "mentors/sessions/mentor",
  editAvailability: "mentors/available/edit",
};

export const adminRequest: adminRequestInterface = {
  base: "admin/",
  fetchAllUsers: "admin/users",
  updateRole(id: string, role:string) {
    return `admin/users/${id}/role?nwrole=${role}`;
  },
  createNewUser: "admin/users/register",
  editProfile(id: string) {
    return `admin/users/${id}`;
  },
};
