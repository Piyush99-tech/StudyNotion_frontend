import axios from "axios";

export const axiosInstance = axios.create();

export const apiConnector = (method, url, bodyData, headers = {}, params = {}) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,     // Don't use `headers: headers ? headers : null`, just pass it directly
    params,
    withCredentials: true, // Important if your backend uses cookies for auth
  });
};
