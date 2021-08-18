import t from "../../Actions/GeneratePasswordAction/types";

const initialstate = {
  password: "",
  GetAllPassword: [],
  editedPassword: "",
  detailsForEdit: "",
};

const UserReducer = (state = initialstate, action) => {
  switch (action.type) {
    case t.PASSWORDGENERATE: {
      const pass = {
        ...state,
        password: action.payload,
      };
      console.log("from reducer", pass);
      return pass;
    }
    case t.GETALLPASSWORD: {
      const name = {
        ...state,
        GetAllPassword: action.payload,
      };
      return name;
    }
    case t.GETEDIT: {
      return {
        ...state,
        detailsForEdit: action.payload,
      };
    }
    case t.EDITWPM: {
      const editedPassword = {
        ...state,
        editedPassword: action.payload,
      };
      console.log("edit from reducer:", editedPassword);
      return editedPassword;
    }
    case t.DELETEWPM: {
      console.log("state.GetAllPassword", state.GetAllPassword);
      console.log("action.payload", action.payload);
      const newPassword = state.GetAllPassword.filter((gap) => {
        return gap._id !== action.payload;
      });
      console.log("newPassword.................", newPassword);
      const msg_delete = {
        ...state,
        GetAllPassword: newPassword,
      };
      return msg_delete;
    }
    default:
      return state;
  }
};

export default UserReducer;
