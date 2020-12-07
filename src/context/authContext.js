import React, { createContext, useReducer, useCallback, useEffect } from "react";
import axios from "../utils/myAxios";

const AuthContext = createContext();
// CONSTANT
const AUTH_LOADING = "AUTH_LOADING";
const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
const AUTH_LOGIN_ERROR = "AUTH_LOGIN_ERROR";
const AUTH_CLEAR_ERROR = "AUTH_CLEAR_ERROR";
// INITIAL STATE
const initialState = {};
// AUTH REDUCER
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload, isLogin: true, error: undefined };
    case AUTH_LOGOUT_SUCCESS:
      return { ...state, loading: false, userData: undefined, isLogin: false, error: undefined };
    case AUTH_LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload, isLogin: false };
    case AUTH_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};
const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  // ACTION
  const checkJwt = useCallback(async () => {
    try {
      dispatch({ type: AUTH_LOADING });
      const { data } = await axios.post(`/api/auth/check`);
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN_ERROR,
      });
    }
  }, []);
  const login = useCallback(async (username, password) => {
    try {
      dispatch({ type: AUTH_LOADING });
      const { data } = await axios.post(`/api/auth/login`, { username, password });
      dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  }, []);
  const logout = useCallback(async () => {
    try {
      dispatch({ type: AUTH_LOADING });
      await axios.post(`/api/auth/logout`);
      dispatch({ type: AUTH_LOGOUT_SUCCESS });
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN_ERROR,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  }, []);
  const clearAuthError = useCallback(() => {
    dispatch({ type: AUTH_CLEAR_ERROR });
  }, []);

  useEffect(() => {
    checkJwt();
  }, [checkJwt]);
  return (
    <AuthContext.Provider value={{ authState, checkJwt, login, logout, clearAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
