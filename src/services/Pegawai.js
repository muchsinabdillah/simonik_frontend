import axios from "axios";
import { BASE_URL_SIMONIK, getConfig } from "../helpers/config";

export const getUser = async (token) => {
  const response = await axios.get(`${BASE_URL_SIMONIK}/user`, getConfig(token));
  return response.data;
};

export const getPegawaiByUUID = async (uuid, token) => {
  const response = await axios.get(
    `${BASE_URL_SIMONIK}/masterdata/pegawai/show/id/${uuid}`,
    getConfig(token)
  );
  return response.data;
};

