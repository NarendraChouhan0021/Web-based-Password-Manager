const baseURL = "http://localhost:8080/v1/wpm";

export const API = async (url, type, body_details) => {
  type = type.toUpperCase();
  let API_details = {};
  if (type === "GET") {
    API_details = {
      method: type,
      headers: { "Content-Type": "application/json" },
    };
  } else {
    if (body_details) {
      API_details = {
        method: type,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body_details),
      };
    } else {
      API_details = {
        method: type,
        headers: { "Content-Type": "application/json" },
      };
    }
  }
  try {
    const resourse = `${baseURL}/${url}`;
    const res = await fetch(resourse, API_details);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};
