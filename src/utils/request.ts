import { string } from "yup";
import type {
  adminRequestInterface,
  AuthRequestInterface,
  menteeRequestInterface,
  mentorRequestInterface,
} from "../types";

const authRequest: AuthRequestInterface = {
  base: "auth/",
  login: `auth/login`,
  profile: "auth/profile",
  register: "auth/register",
  logOut: "auth/logout",
  activeUser: "auth/me",
};

const menteeRequest: menteeRequestInterface = {
  base: "users/",
  myProfile: "users/me",
  randomProfile(id: string) {
    return `users/${id}`;
  },
  updateProfile: "users/me/profile",
  fetchMentors: "users/",
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

const mentorRequest: mentorRequestInterface = {
  base: "mentors",
  viewRequest: "mentors/requests/received",
  updateRequestStatus(reqId: string) {
    return `mentors/requests/${reqId}`;
  },
  fetchActiveSessions: "mentors/sessions/mentor",
  editAvailability: "mentors/available/edit",
};

const adminRequest: adminRequestInterface = {
  base: "admin/",
  fetchAllUsers: "admin/users",
  updateRole(id: string) {
    return `admin/users/${id}/role`;
  },
  createNewUser: "admin/users/register",
  editProfile(id: string) {
    return `admin/users/${id}`;
  },
};
