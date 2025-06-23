// services/MasterMonitoringDetail.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getmonitoringdetailall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/monitoringdetail/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postmonitoringdetail = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/monitoringdetail/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updatemonitoringdetail = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/monitoringdetail/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deletemonitoringdetail = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/monitoringdetail/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


