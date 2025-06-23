// services/MasterProfesi.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getprofesiall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/profesi/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postprofesi = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/profesi/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updateprofesi = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/profesi/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deleteprofesi = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/profesi/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


