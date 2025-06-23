// export const BASE_URL = "https://apielearning.rsyarsi.co.id/api";
export const BASE_URL_SIMONIK = "http://172.16.40.25:8080/api";
// export const BASE_URL_SIMONIK = "http://192.168.1.25:8080/api";


export const getConfig = (token) => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getToken = () => localStorage.getItem("token");


// export const getConfig = (token) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer 213|jTN2ISo1BJo3oRL2G0V1OiACXvFtK2jDmG8WLuGo83521e76`, 
//     },
//   };
//   return config;
// };

export const getConfigFileUpload = (token) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

// export const getConfigBlob = (token) => {
//   const config = {
//     responseType: "blob",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   return config;
// };

