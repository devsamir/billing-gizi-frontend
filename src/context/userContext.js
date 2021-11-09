import React, { createContext, useReducer, useCallback, useEffect, useContext } from "react";
import axios from "../utils/myAxios";
import { AuthContext } from "./authContext";

const UserContext = createContext();
// CONSTANT
const USER_LOADING = "USER_LOADING";
const USER_GET_DATA_SUCCESS = "USER_GET_DATA_SUCCESS";
const USER_CREATE_SUCCESS = "USER_CREATE_SUCCESS";
const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
const USER_ERROR = "USER_ERROR";
const USER_CLEAR_MESSAGE = "USER_CLEAR_MESSAGE";
const USER_CLEAR_ERROR = "USER_CLEAR_ERROR";
// Initial State
const initialState = {};
// USER REDUCER
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_GET_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case USER_CREATE_SUCCESS:
      return { ...state, message: "Berhasil Menambah User", loading: false };
    case USER_UPDATE_SUCCESS:
      return { ...state, message: "Berhasil Update User", loading: false };
    case USER_DELETE_SUCCESS:
      return { ...state, message: "Berhasil Hapus User", loading: false };
    case USER_ERROR:
      return { ...state, error: action.payload, loading: false };
    case USER_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case USER_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);
  const getAllUser = useCallback(async () => {
    try {
      dispatch({ type: USER_LOADING });
      const { data } = await axios.get("/api/user");
      dispatch({ type: USER_GET_DATA_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  }, []);
  const createUser = useCallback(
    async (body) => {
      try {
        dispatch({ type: USER_LOADING });
        await axios.post("/api/user", body);
        await getAllUser();
        dispatch({ type: USER_CREATE_SUCCESS });
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllUser]
  );
  const updateUser = useCallback(
    async (id, body) => {
      try {
        dispatch({ type: USER_LOADING });
        await axios.patch(`/api/user/${id}`, body);
        await getAllUser();
        dispatch({ type: USER_UPDATE_SUCCESS });
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllUser]
  );
  const deleteUser = useCallback(
    async (id) => {
      console.log("kon");
      try {
        dispatch({ type: USER_LOADING });
        await axios.delete(`/api/user/${id}`);
        dispatch({ type: USER_DELETE_SUCCESS });
        getAllUser();
      } catch (err) {
        dispatch({
          type: USER_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllUser]
  );
  const clearUserError = useCallback(() => {
    dispatch({ type: USER_CLEAR_ERROR });
  }, []);
  const clearUserMessage = useCallback(() => {
    dispatch({ type: USER_CLEAR_MESSAGE });
  }, []);
  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) getAllUser();
  }, [getAllUser, isLogin]);

  return (
    <UserContext.Provider
      value={{ userState, getAllUser, createUser, updateUser, deleteUser, clearUserError, clearUserMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
