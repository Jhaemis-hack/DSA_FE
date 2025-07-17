import Axios from "../config";
import type { ResponseInterface } from "../types";
import { authRequest } from "../utils/request";
import { Error, Success } from "../utils/toastify";



export const Login =async function(payload: any){
    try {
      const res: ResponseInterface = await Axios.post(
        authRequest.login,
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

export const signUp =async function(payload: any){
    try {
      const res: ResponseInterface = await Axios.post(
        authRequest.register,
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

export const updateProfile =async function(payload: any){
    try {
      const res: ResponseInterface = await Axios.put(
        authRequest.profile,
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

export const logOut =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        authRequest.logOut,
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

export const activeUserData =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        authRequest.activeUser,
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

export const obtainFullSessionDetails =async function(){
    try {
      const res: ResponseInterface = await Axios.get(
        authRequest.obtainDetails,
      );
      if (res.data.status_code < 400) {       
        Success(res.data.message);
        return res.data.data;
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