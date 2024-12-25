import {
  GET_PROPERTIES_REQUEST,
  GET_PROPERTIES_SUCCESS,
  GET_PROPERTIES_FAILED,
  GET_PROPERTY_REQUEST,
  GET_PROPERTY_SUCCESS,
  GET_PROPERTY_FAILED,
  CLEAR_PROPERTIES,
  POST_PROPERTY_REQUEST,
  POST_PROPERTY_SUCCESS,
  POST_PROPERTY_FAILED,
} from "./type";

export const initialState = {
  properties: [],
  getPropertiesRequest: false,
  getPropertiesSuccess: false,
  getPropertiesFailed: false,

  detailProperty: null,
  getPropertyRequest: false,
  getPropertySuccess: false,
  getPropertyFailed: false,

  postPropertyRequest: false,
  postPropertySuccess: false,
  postPropertyFailed: false,
};
export const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROPERTIES_REQUEST:
      return {
        ...state,
        getPropertiesRequest: true,
      };
    case GET_PROPERTIES_SUCCESS:
      return {
        ...state,
        getPropertiesSuccess: true,
        getPropertiesRequest: false,
        properties: action.properties,
      };
    case GET_PROPERTIES_FAILED:
      return {
        ...state,
        getPropertiesRequest: false,
        getPropertiesFailed: true,
      };
    case GET_PROPERTY_REQUEST:
      return {
        ...state,
        getPropertyRequest: true,
      };
    case GET_PROPERTY_SUCCESS:
      return {
        ...state,
        getPropertySuccess: true,
        getPropertyRequest: false,
        detailProperty: action.detailProperty,
      };
    case GET_PROPERTY_FAILED:
      return {
        ...state,
        getPropertyRequest: false,
        getPropertyFailed: true,
      };
    case CLEAR_PROPERTIES:
      return {
        ...state,
        detailProperty: null,
      };
      case POST_PROPERTY_REQUEST:
        return {
          ...state,
          postPropertyRequest: true,
        };
      case POST_PROPERTY_SUCCESS:
        return {
          ...state,
          postPropertySuccess: true,
          postPropertyRequest: false,
          property: action.property,
        };
      case POST_PROPERTY_FAILED:
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
