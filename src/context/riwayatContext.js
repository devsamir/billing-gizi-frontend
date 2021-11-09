import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";
import axios from "../utils/myAxios";
import { BadgeContext } from "./badgeContext";

const RiwayatContext = createContext();
// CONSTANTS
const RIWAYAT_LOADING = "RIWAYAT_LOADING";
const RIWAYAT_GET_ALL_SUCCESS = "RIWAYAT_GET_ALL_SUCCESS";
const RIWAYAT_GET_ONE_SUCCESS = "RIWAYAT_GET_ONE_SUCCESS";
const RIWAYAT_UPDATE_SUCCESS = "RIWAYAT_UPDATE_SUCCESS";
const RIWAYAT_DELETE_SUCCESS = "RIWAYAT_DELETE_SUCCESS";
const RIWAYAT_ERROR = "RIWAYAT_ERROR";
const CLEAR_RIWAYAT_ERROR = "CLEAR_ERROR";
const CLEAR_RIWAYAT_MESSAGE = "CLEAR_MESSAGE";
// INITIAL STATE
const initialState = { riwayat: { data: [], result: 0 } };
// REDUCER
const riwayatReducer = (state, action) => {
  switch (action.type) {
    case RIWAYAT_LOADING:
      return { ...state, loading: true };
    case RIWAYAT_GET_ALL_SUCCESS:
      return { ...state, loading: false, riwayat: action.payload };
    case RIWAYAT_GET_ONE_SUCCESS:
      return { ...state, detail: action.payload, loading: false };
    case RIWAYAT_UPDATE_SUCCESS:
      return { ...state, message: "Berhasil Update Billing", loading: false };
    case RIWAYAT_DELETE_SUCCESS:
      return { ...state, message: "Berhasil Delete Billing", loading: false };
    case RIWAYAT_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_RIWAYAT_ERROR:
      return { ...state, error: undefined, loading: false };
    case CLEAR_RIWAYAT_MESSAGE:
      return { ...state, message: undefined, loading: false };
    default:
      return state;
  }
};
const RiwayatProvider = ({ children }) => {
  const { getBadge } = useContext(BadgeContext);
  const [riwayatState, dispatch] = useReducer(riwayatReducer, initialState);
  const getRiwayat = useCallback(
    async (
      page = 1,
      limit = 25,
      sort = { field: "tanggal", sort: "desc" },
      search
    ) => {
      try {
        dispatch({ type: RIWAYAT_LOADING });
        const { data } = await axios.get(
          `/api/riwayat?page=${page}&limit=${limit}${
            search ? `&search=${search}` : ""
          }${sort ? `&sort[${sort.field}]=${sort.sort}` : ""}`
        );
        dispatch({ type: RIWAYAT_GET_ALL_SUCCESS, payload: data });
        getBadge();
      } catch (err) {
        dispatch({
          type: RIWAYAT_ERROR,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    },
    []
  );
  const getOneRiwayat = useCallback(async (id) => {
    try {
      dispatch({ type: RIWAYAT_LOADING });
      const { data } = await axios.get(`/api/riwayat/${id}`);
      dispatch({ type: RIWAYAT_GET_ONE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: RIWAYAT_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const updateRiwayat = useCallback(async (id, body) => {
    try {
      dispatch({ type: RIWAYAT_LOADING });
      await axios.patch(`/api/riwayat/${id}`, body);
      dispatch({ type: RIWAYAT_UPDATE_SUCCESS });
    } catch (err) {
      dispatch({
        type: RIWAYAT_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const deleteRiwayat = useCallback(async (riwayat) => {
    try {
      dispatch({ type: RIWAYAT_LOADING });
      await axios.delete(`/api/riwayat`, { data: { riwayat } });
      dispatch({ type: RIWAYAT_DELETE_SUCCESS });
    } catch (err) {
      dispatch({
        type: RIWAYAT_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);

  const clearRiwayatError = useCallback(() => {
    dispatch({ type: CLEAR_RIWAYAT_ERROR });
  }, []);
  const clearRiwayatMessage = useCallback(() => {
    dispatch({ type: CLEAR_RIWAYAT_MESSAGE });
  }, []);
  return (
    <RiwayatContext.Provider
      value={{
        getRiwayat,
        getOneRiwayat,
        updateRiwayat,
        deleteRiwayat,
        riwayatState,
        clearRiwayatError,
        clearRiwayatMessage,
      }}
    >
      {children}
    </RiwayatContext.Provider>
  );
};

export { RiwayatContext, RiwayatProvider };
