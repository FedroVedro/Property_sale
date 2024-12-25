import {
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_FAILED,
  GET_REQUEST_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_FAILED,
  CLEAR_REQUESTS,
  POST_REQUEST_REQUEST,
  POST_REQUEST_SUCCESS,
  POST_REQUEST_FAILED,
  UPDATE_REQUEST_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAILED,
} from "./type";


export const initialState = {
  requests: [],
  getRequestsRequest: false,
  getRequestsSuccess: false,
  getRequestsFailed: false,

  detailRequest: null,
  getRequestRequest: false,
  getRequestSuccess: false,
  getRequestFailed: false,

  postRequestRequest: false,
  postRequestSuccess: false,
  postRequestFailed: false,

  updateRequestRequest: false,
  updateRequestSuccess: false,
  updateRequestFailed: false,
};
export const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return {
        ...state,
        getRequestsRequest: true,
      };
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        getRequestsSuccess: true,
        getRequestsRequest: false,
        requests: action.requests,
      };
    case GET_REQUESTS_FAILED:
      return {
        ...state,
        getRequestsRequest: false,
        getRequestsFailed: true,
      };
    case GET_REQUEST_REQUEST:
      return {
        ...state,
        getRequestRequest: true,
      };
    case GET_REQUEST_SUCCESS:
      return {
        ...state,
        getRequestSuccess: true,
        getRequestRequest: false,
        detailRequest: action.detailRequest,
      };
    case GET_REQUEST_FAILED:
      return {
        ...state,
        getRequestRequest: false,
        getRequestFailed: true,
      };
    case CLEAR_REQUESTS:
      return {
        ...state,
        detailRequest: null,
      };
    case POST_REQUEST_REQUEST:
      return {
        ...state,
        postRequestRequest: true,
      };
    case POST_REQUEST_SUCCESS:
      return {
        ...state,
        postRequestSuccess: true,
        postRequestRequest: false,
        request: action.request,
      };
    case POST_REQUEST_FAILED:
      return {
        ...state,
        postRequestRequest: false,
        postRequestFailed: true,
      };
    case UPDATE_REQUEST_REQUEST:
      return {
        ...state,
        updateRequestRequest: true,
      };
    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        updateRequestSuccess: true,
        updateRequestRequest: false,
        request: state.requests.map((item) => item.id === action.requests.id ? action.requests : item),
      };
    case UPDATE_REQUEST_FAILED:
      return {
        ...state,
        updateRequestRequest: false,
        updateRequestFailed: true,
      };
    default: {
      return state;
    }
  }
};
