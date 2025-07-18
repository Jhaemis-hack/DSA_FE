import Axios from "../config";
import type { ResponseInterface } from "../types";
import { mentorRequest } from "../utils/request";
import { Error, Success } from "../utils/toastify";

export const mentorProfileData = async function () {
  try {
    const res: ResponseInterface = await Axios.post(mentorRequest.myProfile);
    if (res.data.status_code < 400) {
      // Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

export const FetchMenteeMentorshipRequests = async function () {
  try {
    const res: ResponseInterface = await Axios.get(mentorRequest.viewRequest);
    if (res.data.status_code < 400) {
      // Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
      return error.response.data
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

export const updateRequest = async function (
  requestId: string,
  action: string
) {
  try {
    const res: ResponseInterface = await Axios.post(
      mentorRequest.updateRequestStatus(requestId, action)
    );
    if (res.data.status_code < 400) {
      // Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

export const getActiveSessions = async function () {
  try {
    const res: ResponseInterface = await Axios.get(
      mentorRequest.fetchActiveSessions
    );
    if (res.data.status_code < 400) {
      // Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
      return error.response.data;
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

export const updateAvailableDays = async function (payload: any) {
  try {
    const res: ResponseInterface = await Axios.put(
      mentorRequest.editAvailability,
      payload
    );
    if (res.data.status_code < 400) {
      Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

export const getAvailableDays = async function () {
  try {
    const res: ResponseInterface = await Axios.get(
      mentorRequest.getAvailability
    );
    if (res.data.status_code < 400) {
      // Success(res.data.message);
      return res.data;
    }
  } catch (error: any) {
    if (error.response) {
      Error(error.response.data.message);
    }
    console.error({
      message: error.response.data.message,
      ErrorCode: error.response.data.status_code,
    });
  }
};

// [
//   {
//     _id: new ObjectId('686bf5bca8acdd6680208909'),
//     mentorId: {
//       _id: new ObjectId('68672eb716243a85ccf39d2a'),
//       mentorId: new ObjectId('68672ca09603189147bea65b'),
//       name: 'mentor18',
//       skill: [Array],
//       industry: [Array],
//       createdAt: 2025-07-04T01:30:31.962Z,
//       updatedAt: 2025-07-04T01:30:31.962Z
//     },
//     menteeId: new ObjectId('686728bfdbcc4dafd2842f47'),
//     date: 'wed 15th july, 2025',
//     feedBack: '',
//     dateId: {
//       _id: new ObjectId('686bf2642ef86ba211346690'),
//       mentorId: new ObjectId('68672eb716243a85ccf39d2a'),
//       date: [Array],
//       startTime: '2pm',
//       endTime: '8pm',
//       createdAt: 2025-07-07T16:14:28.850Z,
//       updatedAt: 2025-07-07T16:14:28.850Z
//     },
//     status: 'scheduled',
//     createdAt: 2025-07-07T16:28:44.392Z,
//     updatedAt: 2025-07-07T16:28:44.392Z
//   }
// ]