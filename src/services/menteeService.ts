import Axios from "../config";
import type { mentorObject, ResponseInterface } from "../types";
import { menteeRequest } from "../utils/request";
import { Error, Success } from "../utils/toastify";


export const profileData =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        menteeRequest.myProfile,
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const updateProfile =async function(payload: any){
    try {
      const res: ResponseInterface = await Axios.patch(
        menteeRequest.updateProfile,
        payload
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const fetchActiveMentors =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        menteeRequest.fetchMentors,
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const sendMentorshipRequest =async function(mentorId:string){
    try {
      const res: ResponseInterface = await Axios.post(
        menteeRequest.sendRequest(mentorId),
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        // Assuming the mentorObject[] is in res.data.data
        return res.data.data as mentorObject[];
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
    // Return an empty array if there was an error
    return [];
}

export const fetchAvailableDate =async function(mentorId:string){
    try {
      const res: ResponseInterface = await Axios.get(
        menteeRequest.fetchMentorAvailability(mentorId),
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const BookASession =async function(mentorId:string){
    try {
      const res: ResponseInterface = await Axios.post(
        menteeRequest.bookSession(mentorId)
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const viewAvailableSessions =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        menteeRequest.viewSessions,
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const giveFeedback =async function(sessionId:string, payload: any){
    try {
      const res: ResponseInterface = await Axios.post(
        menteeRequest.sendSessionFeedback(sessionId),
        payload
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}

export const viewRequestStatus =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        menteeRequest.viewSentRequests
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data;
      }   
    } catch (error: any) {
      if(error.response){
        Error(error.response.data.message);
      }
      console.error({
        message: error.response.data.message,
        ErrorCode: error.response.data.status_code,
      });
    }
}