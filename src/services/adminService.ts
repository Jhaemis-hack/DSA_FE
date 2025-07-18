import Axios from "../config";
import type { ResponseInterface } from "../types";
import { adminRequest } from "../utils/request";
import { Error, Success } from "../utils/toastify";

export const getAllUsers = async function () {
  try {
    const res: ResponseInterface = await Axios.get(adminRequest.fetchAllUsers);
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

export const UpdateRole = async function (id: string, role: string) {
  try {
    const res: ResponseInterface = await Axios.put(adminRequest.updateRole(id, role));
    if (res.data.status_code < 400) {
      Success(res.data.message);
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

export const createNewUser = async function (payload:any) {
  try {
    const res: ResponseInterface = await Axios.post(adminRequest.createNewUser, payload);
    if (res.data.status_code < 400) {
      Success("User created successfully.");
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

export const EditUserProfile = async function (id:string, payload:any) {
  try {
    const res: ResponseInterface = await Axios.put(adminRequest.editProfile(id), payload);
    if (res.data.status_code < 400) {
      Success(res.data.message);
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
