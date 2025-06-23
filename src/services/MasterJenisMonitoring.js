// services/MasterJenisMonitoring.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getjenismonitoringall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/monitoringType/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postjenismonitoring = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/monitoringType/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updatejenismonitoring = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/monitoringType/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deletejenismonitoring = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/monitoringType/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


