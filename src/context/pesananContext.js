import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useContext,
} from "react";
import axios from "../utils/myAxios";
import { AuthContext } from "./authContext";
import { BadgeContext } from "./badgeContext";

const PesananContext = createContext();
// CONSTANT
const PESANAN_LOADING = "PESANAN_LOADING";
const PESANAN_GET_DATA_SUCCESS = "PESANAN_GET_DATA_SUCCESS";
const PESANAN_GET_ONE_SUCCESS = "PESANAN_GET_ONE_SUCCESS";
const PESANAN_CREATE_SUCCESS = "PESANAN_CREATE_SUCCESS";
const PESANAN_UPDATE_SUCCESS = "PESANAN_UPDATE_SUCCESS";
const PESANAN_UPDATE_TERLAYANI_SUCCESS = "PESANAN_UPDATE_TERLAYANI_SUCCESS";
const PESANAN_DELETE_SUCCESS = "PESANAN_DELETE_SUCCESS";
const PESANAN_ERROR = "PESANAN_ERROR";
const PESANAN_CLEAR_MESSAGE = "PESANAN_CLEAR_MESSAGE";
const PESANAN_CLEAR_ERROR = "PESANAN_CLEAR_ERROR";
// Initial State
const initialState = {};
// Pesanan REDUCER
const pesananReducer = (state, action) => {
  switch (action.type) {
    case PESANAN_LOADING:
      return { ...state, loading: true };
    case PESANAN_GET_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case PESANAN_GET_ONE_SUCCESS:
      return { ...state, detail: action.payload, loading: false };
    case PESANAN_CREATE_SUCCESS:
      return { ...state, message: "Berhasil Menambah Pesanan", loading: false };
    case PESANAN_UPDATE_SUCCESS:
      return { ...state, message: "Berhasil Update Pesanan", loading: false };
    case PESANAN_UPDATE_TERLAYANI_SUCCESS:
      return {
        ...state,
        message: "Berhasil Update Status Pesanan Menjadi Terlayani",
        loading: false,
      };
    case PESANAN_DELETE_SUCCESS:
      return { ...state, message: "Berhasil Hapus Pesanan", loading: false };
    case PESANAN_ERROR:
      return { ...state, error: action.payload, loading: false };
    case PESANAN_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case PESANAN_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};
const PesananProvider = ({ children }) => {
  const { getBadge } = useContext(BadgeContext);
  const [pesananState, dispatch] = useReducer(pesananReducer, initialState);
  const getAllPesanan = useCallback(async () => {
    try {
      dispatch({ type: PESANAN_LOADING });
      const { data } = await axios.get("/api/billing/belum");
      dispatch({ type: PESANAN_GET_DATA_SUCCESS, payload: data });
      getBadge();
    } catch (err) {
      dispatch({
        type: PESANAN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const getOnePesanan = useCallback(async (id) => {
    try {
      dispatch({ type: PESANAN_LOADING });
      const { data } = await axios.get(`/api/billing/${id}`);
      dispatch({ type: PESANAN_GET_ONE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: PESANAN_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const createPesanan = useCallback(
    async (body) => {
      try {
        dispatch({ type: PESANAN_LOADING });
        await axios.post("/api/billing", body);
        dispatch({ type: PESANAN_CREATE_SUCCESS });
        getAllPesanan();
        getBadge();
      } catch (err) {
        dispatch({
          type: PESANAN_ERROR,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    },
    [getAllPesanan]
  );
  const updatePesanan = useCallback(
    async (id, body) => {
      try {
        dispatch({ type: PESANAN_LOADING });
        await axios.patch(`/api/billing/${id}`, body);
        dispatch({ type: PESANAN_UPDATE_SUCCESS });
        getAllPesanan();
      } catch (err) {
        dispatch({
          type: PESANAN_ERROR,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    },
    [getAllPesanan]
  );
  const updatePesananTerlayani = useCallback(
    async (pesanan, tanggalTerlayani) => {
      try {
        dispatch({ type: PESANAN_LOADING });
        await axios.patch(`/api/billing/terlayani`, {
          pesanan,
          tanggalTerlayani,
        });
        dispatch({ type: PESANAN_UPDATE_TERLAYANI_SUCCESS });
        getAllPesanan();
        getBadge();
      } catch (err) {
        dispatch({
          type: PESANAN_ERROR,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    },
    [getAllPesanan]
  );
  const deletePesanan = useCallback(
    async (pesanan) => {
      try {
        dispatch({ type: PESANAN_LOADING });
        await axios.delete(`/api/billing`, { data: { pesanan } });
        dispatch({ type: PESANAN_DELETE_SUCCESS });
        getAllPesanan();
      } catch (err) {
        dispatch({
          type: PESANAN_ERROR,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    },
    [getAllPesanan]
  );
  const clearPesananError = useCallback(() => {
    dispatch({ type: PESANAN_CLEAR_ERROR });
  }, []);
  const clearPesananMessage = useCallback(() => {
    dispatch({ type: PESANAN_CLEAR_MESSAGE });
  }, []);
  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) getAllPesanan();
  }, [isLogin, getAllPesanan]);
  return (
    <PesananContext.Provider
      value={{
        pesananState,
        getAllPesanan,
        createPesanan,
        clearPesananError,
        clearPesananMessage,
        getOnePesanan,
        updatePesanan,
        deletePesanan,
        updatePesananTerlayani,
      }}
    >
      {children}
    </PesananContext.Provider>
  );
};

export { PesananContext, PesananProvider };
