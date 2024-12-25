import {
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILED,
  POST_NOTIFICATION_REQUEST,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILED,
} from "./type";

export const initialState = {
  // properties: [],
  // getNotificationsRequest: false,
  // getNotificationsSuccess: false,
  // getNotificationsFailed: false,

  postPropertyRequest: false,
  postPropertySuccess: false,
  postPropertyFailed: false,
};
export const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_NOTIFICATIONS_REQUEST:
    //   return {
    //     ...state,
    //     getNotificationsRequest: true,
    //   };
    // case GET_NOTIFICATIONS_SUCCESS:
    //   return {
    //     ...state,
    //     getNotificationsSuccess: true,
    //     getNotificationsRequest: false,
    //     properties: action.properties,
    //   };
    // case GET_NOTIFICATIONS_FAILED:
    //   return {
    //     ...state,
    //     getNotificationsRequest: false,
    //     getNotificationsFailed: true,
    //   };
    case POST_NOTIFICATION_REQUEST:
      return {
        ...state,
        postPropertyRequest: true,
      };
    case POST_NOTIFICATION_SUCCESS:
      return {
        ...state,
        postPropertySuccess: true,
        postPropertyRequest: false,
        // property: action.property,
      };
    case POST_NOTIFICATION_FAILED:
      return {
        ...state,
        postPropertyRequest: false,
        postPropertyFailed: true,
      };
    default: {
      return state;
    }
  }
};
