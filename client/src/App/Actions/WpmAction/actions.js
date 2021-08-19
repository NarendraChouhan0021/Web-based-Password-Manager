import t from "./types";
import t_ from "../APIResponseActions/type";
import { API } from "../../../Auth/requestHandler";

export const getWpmList = () => async (dispatch) => {
  try {
    const { status, message, res } = await API("get-wpm-list", "GET");
    if (status === 200) {
      await dispatch({ type: t.GET_WPM_LIST, payload: res.list });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const generatePassword = (website_name) => async (dispatch) => {
  console.log("website_name", website_name);
  try {
    const { status, message, res } = await API("generate-passoword", "POST", {
      website_name,
    });
    if (status === 200) {
      await dispatch({ type: t.GENERATE_PASSWORD, payload: res.password });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const editWpm = (id, website_name) => async (dispatch) => {
  try {
    const { status, message, res } = await API(`edit-passoword/${id}`, "PUT", {
      website_name,
    });
    if (status === 200) {
      await dispatch({ type: t.EDIT_WPM, payload: res });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const delWpm = (id) => async (dispatch) => {
  try {
    const { status, message } = await API(`delete-wpm/${id}`, "DELETE");
    if (status === 200) {
      await dispatch({ type: t.DELETE_WPM, payload: id });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const getWpmByID = (id) => async (dispatch) => {
  try {
    const { status, message, res } = await API(`get-wpm/${id}`, "GET");
    if (status === 200) {
      await dispatch({ type: t.GET_WPM_RECORD, payload: res });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    console.log("error", error);
  }
};
