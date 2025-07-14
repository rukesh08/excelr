import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from "./ActionTypes";

import axios from "axios";
import { api, API_URL } from "../../Config/Api";

// REGISTER USER
export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData);

    if (data.jwt) localStorage.setItem("jwt", data.jwt);

    // ✅ Role-based navigation
    switch (data.role) {
      case "ROLE_RESTAURANT_OWNER":
        reqData.navigate("/admin/restaurant");
        break;
      case "ROLE_DELIVERY_PARTNER":
        reqData.navigate("/partner/home");
        break;
      case "ROLE_CUSTOMER":
      default:
        reqData.navigate("/my-profile");
        break;
    }

    dispatch({ type: REGISTER_SUCCESS, payload: data.jwt });
    console.log("Register success", data);

  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.message });
    console.error("Register error:", error);
  }
};

// LOGIN USER
export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);

    if (data.jwt) localStorage.setItem("jwt", data.jwt);

    //  Role-based navigation
    switch (data.role) {
      case "ROLE_RESTAURANT_OWNER":
        reqData.navigate("/admin/restaurant");
        break;
      case "ROLE_DELIVERY_PARTNER":
        reqData.navigate("/partner/home");
        break;
      case "ROLE_CUSTOMER":
      default:
        reqData.navigate("/");
        break;
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });
    console.log("Login success", data);

  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
    console.error("Login error:", error);
  }
};

// GET USER PROFILE
export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await api.get(`/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("User profile", data);

  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error.message });
    console.error("Get user error:", error);
  }
};

// ADD TO FAVORITE
export const addToFavorite = ({ jwt, restaurantId }) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });

  try {
    const { data } = await api.put(`/api/restaurants/${restaurantId}/add-favorites`, {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    console.log("Added to favorites", data);

  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error.message });
    console.error("Add to favorite error:", error);
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: LOGOUT });
  console.log("Logout success");
};
