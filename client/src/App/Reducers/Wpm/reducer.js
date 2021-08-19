import t from "../../Actions/WpmAction/types";

const initialstate = {
  password: "",
  wpmList: [],
  editedPassword: "",
  detailsForEdit: "",
};

const WpmReducer = (state = initialstate, action) => {
  switch (action.type) {
    case t.GENERATE_PASSWORD: {
      const pass = {
        ...state,
        password: action.payload,
      };
      return pass;
    }
    case t.wpmList: {
      const name = {
        ...state,
        wpmList: action.payload,
      };
      return name;
    }
    case t.GET_WPM_RECORD: {
      return {
        ...state,
        detailsForEdit: action.payload,
      };
    }
    case t.EDIT_WPM: {
      const editedPassword = {
        ...state,
        editedPassword: action.payload,
      };
      console.log("edit from reducer:", editedPassword);
      return editedPassword;
    }
    case t.DELETE_WPM: {
      console.log("state.wpmList", state.wpmList);
      console.log("action.payload", action.payload);
      const newPassword = state.wpmList.filter((gap) => {
        return gap._id !== action.payload;
      });
      console.log("newPassword.................", newPassword);
      const msg_delete = {
        ...state,
        wpmList: newPassword,
      };
      return msg_delete;
    }
    default:
      return state;
  }
};

export default WpmReducer;
