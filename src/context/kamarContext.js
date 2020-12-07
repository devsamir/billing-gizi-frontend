import React, { createContext, useReducer, useCallback, useContext, useEffect } from "react";
import axios from "../utils/myAxios";
import { AuthContext } from "./authContext";

const KamarContext = createContext();
// CONSTANT
const KAMAR_LOADING = "KAMAR_LOADING";
const KAMAR_GET_DATA_SUCCESS = "KAMAR_GET_DATA_SUCCESS";
const KAMAR_CREATE_SUCCESS = "KAMAR_CREATE_SUCCESS";
const KAMAR_UPDATE_SUCCESS = "KAMAR_UPDATE_SUCCESS";
const KAMAR_DELETE_SUCCESS = "KAMAR_DELETE_SUCCESS";
const KAMAR_ERROR = "KAMAR_ERROR";
const KAMAR_CLEAR_MESSAGE = "KAMAR_CLEAR_MESSAGE";
const KAMAR_CLEAR_ERROR = "KAMAR_CLEAR_ERROR";
// Initial State
const initialState = {};
// KAMAR REDUCER
const kamarReducer = (state, action) => {
  switch (action.type) {
    case KAMAR_LOADING:
      return { ...state, loading: true };
    case KAMAR_GET_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case KAMAR_CREATE_SUCCESS:
      return { ...state, message: "Berhasil Menambah Kamar", loading: false };
    case KAMAR_UPDATE_SUCCESS:
      return { ...state, message: "Berhasil Update Kamar", loading: false };
    case KAMAR_DELETE_SUCCESS:
      return { ...state, message: "Berhasil Hapus Kamar", loading: false };
    case KAMAR_ERROR:
      return { ...state, error: action.payload, loading: false };
    case KAMAR_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case KAMAR_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};
const KamarProvider = ({ children }) => {
  const [kamarState, dispatch] = useReducer(kamarReducer, initialState);
  const getAllKamar = useCallback(async () => {
    try {
      dispatch({ type: KAMAR_LOADING });
      const { data } = await axios.get("/api/kamar");
      dispatch({ type: KAMAR_GET_DATA_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: KAMAR_ERROR,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  }, []);
  const createKamar = useCallback(
    async (body) => {
      try {
        dispatch({ type: KAMAR_LOADING });
        await axios.post("/api/kamar", body);
        await getAllKamar();
        dispatch({ type: KAMAR_CREATE_SUCCESS });
      } catch (err) {
        dispatch({
          type: KAMAR_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllKamar]
  );
  const updateKamar = useCallback(
    async (id, body) => {
      try {
        dispatch({ type: KAMAR_LOADING });
        await axios.patch(`/api/kamar/${id}`, body);
        await getAllKamar();
        dispatch({ type: KAMAR_UPDATE_SUCCESS });
      } catch (err) {
        dispatch({
          type: KAMAR_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllKamar]
  );
  const deleteKamar = useCallback(
    async (kamar) => {
      try {
        dispatch({ type: KAMAR_LOADING });
        await axios.delete(`/api/kamar`, { data: { kamar } });
        dispatch({ type: KAMAR_DELETE_SUCCESS });
        getAllKamar();
      } catch (err) {
        dispatch({
          type: KAMAR_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllKamar]
  );
  const clearKamarError = useCallback(() => {
    dispatch({ type: KAMAR_CLEAR_ERROR });
  }, []);
  const clearKamarMessage = useCallback(() => {
    dispatch({ type: KAMAR_CLEAR_MESSAGE });
  }, []);

  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) getAllKamar();
  }, [getAllKamar, isLogin]);
  return (
    <KamarContext.Provider
      value={{ kamarState, getAllKamar, createKamar, updateKamar, deleteKamar, clearKamarError, clearKamarMessage }}
    >
      {children}
    </KamarContext.Provider>
  );
};

export { KamarContext, KamarProvider };
