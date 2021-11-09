import React, { createContext, useReducer, useCallback, useEffect, useContext } from "react";
import axios from "../utils/myAxios";
import { AuthContext } from "./authContext";

const MenuContext = createContext();
// CONSTANT
const MENU_LOADING = "MENU_LOADING";
const MENU_GET_DATA_SUCCESS = "MENU_GET_DATA_SUCCESS";
const MENU_CREATE_SUCCESS = "MENU_CREATE_SUCCESS";
const MENU_UPDATE_SUCCESS = "MENU_UPDATE_SUCCESS";
const MENU_DELETE_SUCCESS = "MENU_DELETE_SUCCESS";
const MENU_ERROR = "MENU_ERROR";
const MENU_CLEAR_MESSAGE = "MENU_CLEAR_MESSAGE";
const MENU_CLEAR_ERROR = "MENU_CLEAR_ERROR";
// Initial State
const initialState = {};
// Menu REDUCER
const menuReducer = (state, action) => {
  switch (action.type) {
    case MENU_LOADING:
      return { ...state, loading: true };
    case MENU_GET_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };
    case MENU_CREATE_SUCCESS:
      return { ...state, message: "Berhasil Menambah Menu", loading: false };
    case MENU_UPDATE_SUCCESS:
      return { ...state, message: "Berhasil Update Menu", loading: false };
    case MENU_DELETE_SUCCESS:
      return { ...state, message: "Berhasil Hapus Menu", loading: false };
    case MENU_ERROR:
      return { ...state, error: action.payload, loading: false };
    case MENU_CLEAR_MESSAGE:
      return { ...state, message: undefined };
    case MENU_CLEAR_ERROR:
      return { ...state, error: undefined };
    default:
      return state;
  }
};
const MenuProvider = ({ children }) => {
  const [menuState, dispatch] = useReducer(menuReducer, initialState);
  const getAllMenu = useCallback(async () => {
    try {
      dispatch({ type: MENU_LOADING });
      const { data } = await axios.get("/api/menu");
      dispatch({ type: MENU_GET_DATA_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: MENU_ERROR,
        payload: err.response && err.response.data.message ? err.response.data.message : err.message,
      });
    }
  }, []);
  const createMenu = useCallback(
    async (body) => {
      try {
        dispatch({ type: MENU_LOADING });
        await axios.post("/api/menu", body);
        dispatch({ type: MENU_CREATE_SUCCESS });
        getAllMenu();
      } catch (err) {
        dispatch({
          type: MENU_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllMenu]
  );
  const updateMenu = useCallback(
    async (id, body) => {
      try {
        dispatch({ type: MENU_LOADING });
        await axios.patch(`/api/menu/${id}`, body);
        dispatch({ type: MENU_UPDATE_SUCCESS });
        getAllMenu();
      } catch (err) {
        dispatch({
          type: MENU_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllMenu]
  );
  const deleteMenu = useCallback(
    async (menu) => {
      try {
        dispatch({ type: MENU_LOADING });
        await axios.delete(`/api/menu`, { data: { menu } });
        dispatch({ type: MENU_DELETE_SUCCESS });
        getAllMenu();
      } catch (err) {
        dispatch({
          type: MENU_ERROR,
          payload: err.response && err.response.data.message ? err.response.data.message : err.message,
        });
      }
    },
    [getAllMenu]
  );
  const clearMenuError = useCallback(() => {
    dispatch({ type: MENU_CLEAR_ERROR });
  }, []);
  const clearMenuMessage = useCallback(() => {
    dispatch({ type: MENU_CLEAR_MESSAGE });
  }, []);

  const {
    authState: { isLogin },
  } = useContext(AuthContext);
  useEffect(() => {
    if (isLogin) getAllMenu();
  }, [getAllMenu, isLogin]);
  return (
    <MenuContext.Provider
      value={{ menuState, getAllMenu, createMenu, updateMenu, deleteMenu, clearMenuError, clearMenuMessage }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
