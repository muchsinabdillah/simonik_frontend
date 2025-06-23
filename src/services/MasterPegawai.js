// services/MasterPegawai.js
import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getpegawaiall = async (accessToken) => {
  const { data: response } = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/pegawai/show/all`,
    getConfig(accessToken)
  );
  return response;
};

export const postpegawai = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/pegawai/create`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const updatepegawai = async (data, accessToken) => {
  const { data: response } = await axios.post(
    `${BASE_URL_SIMONIK}/masterdata/pegawai/update`,
    data,
    getConfig(accessToken)
  );
  return response;
};

export const deletepegawai = async (uuid, accessToken) => {
  const { data: response } = await axios.delete(
    `${BASE_URL_SIMONIK}/masterdata/pegawai/delete/${uuid}`,
    getConfig(accessToken)
  );
  return response;
};


