import axios from "axios";
const apiToken = process.env.REACT_APP_API_TOKEN;
const apiURL = process.env.REACT_APP_API_URL;

export const apiUploadFile = async (file) => {
  const data = new FormData();
  data.append("file", file);
  const url = apiURL.concat("file/upload");

  const response = await axios(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      "x-api-key": apiToken,
    },
    data: data,
  });
  return response.data;
};
