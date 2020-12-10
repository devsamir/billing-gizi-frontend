import React, { createContext, useReducer, useCallback } from "react";
import axios from "../utils/myAxios";

const GiziContext = createContext();
// CONSTANTS
const GIZI_LOADING = "GIZI_LOADING";
const GIZI_OVERVIEW_SUCCESS = "GIZI_OVERVIEW_SUCCESS";
const GIZI_COUNT_AREA_SUCCESS = "GIZI_COUNT_AREA_SUCCESS";
const GIZI_COUNT_FAVORIT_SUCCESS = "GIZI_COUNT_FAVORIT_SUCCESS";
const GIZI_COUNT_KAMAR_SUCCESS = "GIZI_COUNT_KAMAR_SUCCESS";
const GIZI_ERROR = "GIZI_ERROR";
const GIZI_CLEAR_MESSAGE = "GIZI_CLEAR_MESSAGE";
const GIZI_CLEAR_ERROR = "GIZI_CLEAR_ERROR";

// Initial State
const initialState = {};

const giziReducer = (state, action) => {
  switch (action.type) {
    case GIZI_LOADING:
      return { ...state, loading: true };
    case GIZI_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: undefined,
      };
    case GIZI_OVERVIEW_SUCCESS:
      return { ...state, loading: false, overview: action.payload };
    case GIZI_COUNT_AREA_SUCCESS:
      return { ...state, loading: false, area: action.payload };
    case GIZI_COUNT_FAVORIT_SUCCESS:
      return { ...state, loading: false, favorit: action.payload };
    case GIZI_COUNT_KAMAR_SUCCESS:
      return { ...state, loading: false, kamar: action.payload };
    case GIZI_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case GIZI_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};

const GiziProvider = ({ children }) => {
  const [giziState, dispatch] = useReducer(giziReducer, initialState);
  const getOverview = useCallback(async (body) => {
    try {
      dispatch({ type: GIZI_LOADING });
      const { data } = await axios.post(`/api/dashboard/gizi/overview`, body);
      dispatch({ type: GIZI_OVERVIEW_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: GIZI_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const getDataCountArea = useCallback(async (body) => {
    try {
      dispatch({ type: GIZI_LOADING });
      const { data } = await axios.post(
        `/api/dashboard/gizi/pesanan-count`,
        body
      );
      dispatch({ type: GIZI_COUNT_AREA_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: GIZI_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const getDataCountFavorit = useCallback(async (body) => {
    try {
      dispatch({ type: GIZI_LOADING });
      const { data } = await axios.post(
        `/api/dashboard/gizi/menu-favorit`,
        body
      );
      dispatch({ type: GIZI_COUNT_FAVORIT_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: GIZI_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const getDataCountKamar = useCallback(async (body) => {
    try {
      dispatch({ type: GIZI_LOADING });
      const { data } = await axios.post(
        `/api/dashboard/gizi/ruangan-terbanyak`,
        body
      );
      dispatch({ type: GIZI_COUNT_KAMAR_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: GIZI_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);

  const clearGiziError = useCallback(() => {
    dispatch({ type: GIZI_CLEAR_ERROR });
  }, []);
  const clearGiziMessage = useCallback(() => {
    dispatch({ type: GIZI_CLEAR_MESSAGE });
  }, []);
  return (
    <GiziContext.Provider
      value={{
        giziState,
        getOverview,
        clearGiziError,
        clearGiziMessage,
        getDataCountArea,
        getDataCountFavorit,
        getDataCountKamar,
      }}
    >
      {children}
    </GiziContext.Provider>
  );
};

export { GiziContext, GiziProvider };
