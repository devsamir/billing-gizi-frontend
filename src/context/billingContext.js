import React, {
  createContext,
  useReducer,
  useCallback,
  useContext,
} from "react";
import axios from "../utils/myAxios";
import { BadgeContext } from "./badgeContext";

const BillingContext = createContext();
// CONSTANTS
const BILLING_LOADING = "BILLING_LOADING";
const BILLING_GET_ONE_SUCCESS = "BILLING_GET_ONE_SUCCESS";
const BILLING_GET_DETAIL_ONE_SUCCESS = "BILLING_GET_DETAIL_ONE_SUCCESS";
const BILLING_UPDATE_SUDAH_SUCCESS = "BILLING_UPDATE_SUDAH_SUCCESS";
const BILLING_UPDATE_BELUM_SUCCESS = "BILLING_UPDATE_BELUM_SUCCESS";
const BILLING_ERROR = "BILLING_ERROR";
const BILLING_CLEAR_MESSAGE = "BILLING_CLEAR_MESSAGE";
const BILLING_CLEAR_ERROR = "BILLING_CLEAR_ERROR";

// Initial State
const initialState = {};

const billingReducer = (state, action) => {
  switch (action.type) {
    case BILLING_LOADING:
      return { ...state, loading: true };
    case BILLING_GET_ONE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case BILLING_GET_DETAIL_ONE_SUCCESS:
      return { ...state, loading: false, detail: action.payload };
    case BILLING_UPDATE_SUDAH_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Berhasil Update Status Billing Menjadi Sudah Dibayar",
      };
    case BILLING_UPDATE_BELUM_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Berhasil Update Status Billing Menjadi Belum Dibayar",
      };
    case BILLING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        data: undefined,
      };
    case BILLING_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case BILLING_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};

const BillingProvider = ({ children }) => {
  const { getBadge } = useContext(BadgeContext);
  const [billingState, dispatch] = useReducer(billingReducer, initialState);
  const getOneBilling = useCallback(async (noRawat) => {
    try {
      dispatch({ type: BILLING_LOADING });
      const { data } = await axios.get(`/api/billing/terlayani/${noRawat}`);
      dispatch({ type: BILLING_GET_ONE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: BILLING_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const getOneDetailBilling = useCallback(async (id) => {
    try {
      dispatch({ type: BILLING_LOADING });
      const { data } = await axios.get(`/api/billing/${id}`);
      dispatch({ type: BILLING_GET_DETAIL_ONE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: BILLING_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const updateBillingSudah = useCallback(async (pesanan, tanggalBayar) => {
    try {
      dispatch({ type: BILLING_LOADING });
      await axios.patch(`/api/billing/sudah`, { pesanan, tanggalBayar });
      dispatch({ type: BILLING_UPDATE_SUDAH_SUCCESS });
      getBadge();
    } catch (err) {
      dispatch({
        type: BILLING_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }, []);
  const clearBillingError = useCallback(() => {
    dispatch({ type: BILLING_CLEAR_ERROR });
  }, []);
  const clearBillingMessage = useCallback(() => {
    dispatch({ type: BILLING_CLEAR_MESSAGE });
  }, []);
  return (
    <BillingContext.Provider
      value={{
        billingState,
        getOneBilling,
        getOneDetailBilling,
        updateBillingSudah,
        clearBillingError,
        clearBillingMessage,
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export { BillingContext, BillingProvider };
