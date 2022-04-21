import { LOAD_STATUSES } from "../constants";
import { WEATHER_ACTIONS } from "./constants";

const INITIAL_STATE = {
  data: {},
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;

    case WEATHER_ACTIONS.fetchStart: {
      return {
        data: state.data,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    }
    case WEATHER_ACTIONS.fetchError: {
      return {
        data: {},
        loadStatus: LOAD_STATUSES.ERROR,
      };
    }
    case WEATHER_ACTIONS.fetchSuccess: {
      return {
        data: action.payload,
        loadStatus: LOAD_STATUSES.LOADED,
      };
    }
  }
};
