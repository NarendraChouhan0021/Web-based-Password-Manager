import t from "./types";
import t_ from "../APIResponseActions/type";
import { API } from "../../../Auth/requestHandler";

export const GetWpmList = () => async (dispatch) => {
  try {
    const { status, message, res } = await API("get-wpm-list", "GET");
    if (status === 200) {
      await dispatch({ type: t.GETALLPASSWORD, payload: res.list });
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const GeneratePassword = (website_name) => async (dispatch) => {
  console.log("website_name", website_name);
  try {
    const { status, message, res } = await API("generate-passoword", "POST", {
      website_name,
    });
    if (status === 200) {
      await dispatch({ type: t.PASSWORDGENERATE, payload: res.password });
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const handleEdit = (_id, website_name) => async (dispatch) => {
  try {
    const url = "edit-passoword/" + _id;
    const { status, message, res } = await API(url, "PUT", { website_name });
    if (status === 200) {
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
      await dispatch({ type: t.EDITWPM, payload: res });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const handleDelete = (id) => async (dispatch) => {
  try {
    const url = "delete-wpm/" + id;
    const { status, message } = await API(url, "DELETE");
    if (status === 200) {
      await dispatch({ type: t.DELETEWPM, payload: id });
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
    } else {
      await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: message });
    }
  } catch (error) {
    await dispatch({ type: t_.API_RESPONSE_FAILURE, payload: error });
  }
};

export const getEditDetails = (_id) => async (dispatch) => {
  try {
    const url = "get-wpm/" + _id;
    const { status, message, res } = await API(url, "GET");
    if (status === 200) {
      await dispatch({ type: t.GETEDIT, payload: res });
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
    } else {
      await dispatch({ type: t_.API_RESPONSE_SUCCESS, payload: message });
    }
  } catch (error) {
    console.log("error", error);
  }
};
