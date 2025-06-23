// services/MasterUser.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getuserall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/user/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postuser = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/user/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updateuser = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/user/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deleteuser = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/user/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


