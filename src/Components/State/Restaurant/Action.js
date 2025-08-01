
import { api } from "../../Config/Api";
import { CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, GET_RESTAURANT_BY_ID_FAILURE, GET_RESTAURANT_BY_ID_REQUEST, GET_RESTAURANT_BY_ID_SUCCESS, GET_RESTAURANTS_FAILURE, GET_RESTAURANTS_REQUEST, GET_RESTAURANTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";


import {
    CREATE_CATEGORY_FAILURE,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_EVENTS_FAILURE,
    CREATE_EVENTS_REQUEST,
    CREATE_EVENTS_SUCCESS,
    DELETE_EVENTS_FAILURE,
    DELETE_EVENTS_REQUEST,
    DELETE_EVENTS_SUCCESS,
    GET_ALL_EVENTS_FAILURE,
    GET_ALL_EVENTS_REQUEST,
    GET_ALL_EVENTS_SUCCESS,
    GET_RESTAURANTS_EVENTS_FAILURE,
    GET_RESTAURANTS_EVENTS_REQUEST,
    GET_RESTAURANTS_EVENTS_SUCCESS,
    GET_RESTAURANTS_CATEGORY_FAILURE,
    GET_RESTAURANTS_CATEGORY_REQUEST,
    GET_RESTAURANTS_CATEGORY_SUCCESS,
    GET_RESTAURANT_BY_USER_ID_FAILURE,
    GET_RESTAURANT_BY_USER_ID_REQUEST,
    GET_RESTAURANT_BY_USER_ID_SUCCESS,
    UPDATE_RESTAURANT_STATUS_FAILURE,
    UPDATE_RESTAURANT_STATUS_REQUEST,
    UPDATE_RESTAURANT_STATUS_SUCCESS,
    GET_ALL_RESTAURANT_REQUEST,
    GET_ALL_RESTAURANT_SUCCESS,
    GET_ALL_RESTAURANT_FAILURE,

} from "./ActionType";


export const fetchRestaurantsBasedOnRole = (jwt, role) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_REQUEST });
    console.log("Fetching restaurants for role:", role);

    if (!role) {
      console.error("Missing role in fetchRestaurantsBasedOnRole");
      dispatch({
        type: GET_RESTAURANTS_FAILURE,
        payload: "User role is missing. Cannot fetch restaurants.",
      });
      return;
    }

    try {
      let endpoint;
      if (role === 'ROLE_ADMIN') {
        endpoint = '/api/admin';
      } else if (role === 'ROLE_RESTAURANT_OWNER') {
        endpoint = '/api/admin/user-owned';
      } else {
        throw new Error("Unsupported role: " + role);
      }

      const { data } = await api.get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetched restaurants data:", data);

      dispatch({
        type: GET_RESTAURANTS_SUCCESS,
        payload: role === 'ROLE_ADMIN' ? data : [data],
      });

    } catch (error) {
        console.error("Error fetching restaurants:", error);
      dispatch({
        type: GET_RESTAURANTS_FAILURE,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
};



export const getAllRestaurantsAction=(token)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_RESTAURANT_REQUEST});
        try{
            const {data} =await api.get("/api/restaurants", {
                headers: {
                    Authorization:`Bearer ${token}`,
                },
            });
            dispatch({type:GET_ALL_RESTAURANT_SUCCESS,payload:data});
            console.log("all restaurant ", data);
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:GET_ALL_RESTAURANT_FAILURE,payload:error})
        }
    }
}

export const getRestaurantById=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_ID_REQUEST});
        try{
            const response =await api.get(`api/restaurants/${reqData.restaurantId}`, {
                headers: {
                    Authorization:`Bearer ${reqData.jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANT_BY_ID_SUCCESS,payload:response.data});
        
        }catch (error) {
            console.log(" error", error);
            
            dispatch({type:GET_RESTAURANT_BY_ID_FAILURE,payload:error})
        }
    }
}


export const getRestaurantByUserId=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURANT_BY_USER_ID_REQUEST});
        try{
            const {data} =await api.get(`/api/admin/restaurants/user`, {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANT_BY_USER_ID_SUCCESS,payload:data});
            console.log("get restaurant by user id", data);
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:GET_RESTAURANT_BY_USER_ID_FAILURE,payload:error.message})
        }
    }
}

export const createRestaurant=(reqData)=>{
    console.log("token..........", reqData.token);
    
    return async(dispatch)=>{
        dispatch({type:CREATE_RESTAURANT_REQUEST});
        try{
            const {data} =await api.post(`/api/admin/restaurants`, reqData.data, {
                headers: {
                    Authorization:`Bearer ${reqData.token}`,
                },
            });
            dispatch({type:CREATE_RESTAURANT_SUCCESS,payload:data});
            console.log("created restaurant", data);
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:CREATE_RESTAURANT_FAILURE,payload:error})
        }
    }
}

export const updateRestaurant=({restaurantId,restaurantData,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURANT_REQUEST});
        try{
            const res =await api.put(`api/admin/restaurant/${restaurantId}`, restaurantData, {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:UPDATE_RESTAURANT_SUCCESS,payload:res.data});
            
        }catch (error) {
            
            dispatch({type:UPDATE_RESTAURANT_FAILURE ,payload:error})
        }
    }
}

export const deleteRestaurant=({restaurantId,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:DELETE_RESTAURANT_REQUEST});
        try{
            const res =await api.delete(`api/admin/restaurant/${restaurantId}`, {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:DELETE_RESTAURANT_SUCCESS,payload:restaurantId});
            console.log("delete restaurant ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:DELETE_RESTAURANT_FAILURE ,payload:error})
        }
    }
}

export const updateRestaurantStatus = ({ restaurantId, jwt, newStatus }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
    try {
      const res = await api.put(
        `api/admin/restaurants/${restaurantId}/status`,
        { open: newStatus },  // <-- send new status here
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: res.data });
      console.log("Updated restaurant status response:", res.data);
    } catch (error) {
      console.log("Error updating status", error);
      dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
    }
  };
};

export const createEventAction=({data,restaurantId,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:CREATE_EVENTS_REQUEST});
        try{
            const res =await api.post(`api/admin/events/restaurant/${restaurantId}`, 
                data,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_EVENTS_SUCCESS,payload:res.data});
            console.log("create events ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:CREATE_EVENTS_FAILURE ,payload:error})
        }
    }
}

export const getAllEvents=({jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:GET_ALL_EVENTS_REQUEST});
        try{
            const res =await api.get(`api/events`,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_ALL_EVENTS_SUCCESS,payload:res.data});
            console.log("get all events ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:GET_ALL_EVENTS_FAILURE ,payload:error})
        }
    }
}

export const deleteEventAction=({eventId,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:DELETE_EVENTS_REQUEST});
        try{
            const res =await api.delete(`api/admin/events/${eventId}`,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:DELETE_EVENTS_SUCCESS,payload:eventId});
            console.log("delete events ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:DELETE_EVENTS_FAILURE ,payload:error})
        }
    }
}

export const getRestaurantsEvents=({restaurantId,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURANTS_EVENTS_REQUEST});
        try{
            const res =await api.get(`/api/admin/events/restaurant/${restaurantId}`,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANTS_EVENTS_SUCCESS,payload:res.data});
            console.log("get restaurants events ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:GET_RESTAURANTS_EVENTS_FAILURE ,payload:error})
        }
    }
}

export const createCategoryAction=({reqData,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST});
        try{
            const res =await api.post(`/api/admin/category`, reqData,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:CREATE_CATEGORY_SUCCESS,payload:res.data});
            console.log("create category ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:CREATE_CATEGORY_FAILURE ,payload:error})
        }
    }
}

export const getRestaurantsCategory=({restaurantId,jwt})=>{
    
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURANTS_CATEGORY_REQUEST});
        
        try{
            const res =await api.get(`/api/category/restaurant/${restaurantId}`,
                {
                headers: {
                    Authorization:`Bearer ${jwt}`,
                },
            });
            dispatch({type:GET_RESTAURANTS_CATEGORY_SUCCESS,payload:res.data});
            console.log("get restaurants category ",res.data);
            
        }catch (error) {
            console.log("catch error", error);
            
            dispatch({type:GET_RESTAURANTS_CATEGORY_FAILURE ,payload:error})
        }
    }
}