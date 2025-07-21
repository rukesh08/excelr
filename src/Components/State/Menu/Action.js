import { api } from "../../Config/Api";
import {
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,

} from "./ActionType";

export const createMenuItem=({menu,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST});
        try {
            const { data } = await api.post("api/admin/food", menu,
                {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });
                console.log("created menu", data);
                dispatch({type:CREATE_MENU_ITEM_SUCCESS,payload:data})                
        }catch (error) {
            console.log("catch error",error);
            dispatch({type:CREATE_MENU_ITEM_FAILURE,payload:error});
            
        }
    };
};

export const getMenuItemsByRestaurantId=(reqData)=>{
    return async (dispatch)=>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST});
        try {
            let url = `/api/food/restaurant/${reqData.restaurantId}`;
            const params = [];

            if (reqData.vegetarian !== undefined) params.push(`vegetarian=${reqData.vegetarian}`);
            if (reqData.nonveg !== undefined) params.push(`nonveg=${reqData.nonveg}`);
            if (reqData.seasonal !== undefined) params.push(`seasonal=${reqData.seasonal}`);
            if (reqData.foodCategory !== undefined) params.push(`food_category=${reqData.foodCategory}`);

            if (params.length > 0) {
            url += `?${params.join("&")}`;
            }

            const { data } = await api.get(url, {
            headers: {
                Authorization: `Bearer ${reqData.jwt}`,
            },
            });

                console.log("menu item by restaurants", data);
                dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,payload:data})                
        }catch (error) {
            console.log("catch error",error);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,payload:error});
            
        }
    };
};

export const searchMenuItem=({keyword,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST});
        try {
            const { data } = await api.get(`api/food/search?name=${keyword}`,
                {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });
                console.log("data......... ", data);
                dispatch({type:SEARCH_MENU_ITEM_SUCCESS,payload:data})                
        }catch (error) {
            console.log("catch error",error);
            dispatch({type:SEARCH_MENU_ITEM_FAILURE,payload:error});
            
        }
    };
};

export const updateMenuItemsAvailability=({foodId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST});
        try {
            const { data } = await api.put(`/api/food/${foodId}`,{},
                {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });
                console.log("update menuItems Availability ", data);
                dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,payload:data})                
        }catch (error) {
            console.log("catch error",error);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,payload:error});
            
        }
    };
};

export const deleteFoodAction=({foodId,jwt})=>{
    return async (dispatch)=>{
        dispatch({type:DELETE_MENU_ITEM_REQUEST});
        try {
            const { data } = await api.delete(`/api/admin/food/${foodId}`,
                {
                    headers: {
                        Authorization:`Bearer ${jwt}`,
                    },
                });
                console.log("delete food ", data);
                dispatch({type:DELETE_MENU_ITEM_SUCCESS,payload:foodId})                
        }catch (error) {
            console.log("catch error",error);
            dispatch({type:DELETE_MENU_ITEM_FAILURE,payload:error});
            
        }
    };
};