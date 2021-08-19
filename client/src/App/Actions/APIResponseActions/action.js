import t from "./type";

export const APIResponseFailure = () => async (dispatch) => {
  await dispatch({
    type: t.API_RESPONSE_FAILURE,
    payload: { status: false, error_message: "" },
  });
};
