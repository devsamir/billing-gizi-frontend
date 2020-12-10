import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
} from "react";
import axios from "../utils/myAxios";

const BadgeContext = createContext();
// CONSTANTS
const BADGE_LOADING = "BADGE_LOADING";
const BADGE_GET_SUCCESS = "BADGE_GET_SUCCESS";
const BADGE_ERROR = "BADGE_ERROR";
// INITIAL STATE
const initialState = { riwayat: { data: [], result: 0 } };
// REDUCER
const badgeReducer = (state, action) => {
  switch (action.type) {
    case BADGE_LOADING:
      return { ...state, loading: true };
    case BADGE_GET_SUCCESS:
      return { ...state, loading: false, badge: action.payload };
    case BADGE_ERROR:
      return { ...state, message: action.payload, loading: false };
    default:
      return state;
  }
};
const BadgeProvider = ({ children }) => {
  const [badgeState, dispatch] = useReducer(badgeReducer, initialState);
  const getBadge = useCallback(async () => {
    try {
      dispatch({ type: BADGE_LOADING });
      const { data } = await axios.get(`/api/dashboard/badge`);
      dispatch({ type: BADGE_GET_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: BADGE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  useEffect(() => {
    getBadge();
  }, [getBadge]);
  return (
    <BadgeContext.Provider
      value={{
        badgeState,
        getBadge,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
};

export { BadgeContext, BadgeProvider };
