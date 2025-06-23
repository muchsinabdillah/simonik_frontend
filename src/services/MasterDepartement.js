// services/MasterDepartement.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getdepartmentall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/department/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postdepartment = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/department/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updatedepartment = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/department/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deletedepartment = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/department/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


