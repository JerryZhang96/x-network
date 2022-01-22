import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = [];

const onlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ONLINE:
      return [...state, action.payload];
    case GLOBALTYPES.OFFLINE:
      return state.filter((item) => item !== action.payload);
    default:
      return state;
  }
};

export default onlineReducer;
