// services/MasterUnit.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getunitall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/unit/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postunit = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/unit/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updateunit = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/unit/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deleteunit = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/unit/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


