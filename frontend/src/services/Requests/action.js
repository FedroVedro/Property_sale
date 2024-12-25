import { useNavigate } from 'react-router';
import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import { convertToBase64 } from '../../utils/uploadImage';
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
} from './type'


export const getRequests = () => {
  return function (dispatch) {
    dispatch({
      type: GET_REQUESTS_REQUEST
    });
    requestApi("/requests/").then(res => {
      console.log('getREQUESTS', res)
      dispatch({
            type: GET_REQUESTS_SUCCESS,
            requests: res
          });
    }).catch((err) => {
        dispatch({
          type: GET_REQUESTS_FAILED
        });
    });
  };
}


export const getDetailRequest = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_REQUEST_REQUEST
    });
    requestApi("/requests/" + id).then(res => {
      dispatch({
        type: GET_REQUEST_SUCCESS,
        detailRequests: res
      });
    }).catch((err)=>{
      dispatch({
        type: GET_REQUEST_FAILED
      });
    });
  };
}

export const postRequest = (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data})

  };
  return function (dispatch) {
    dispatch({
      type: POST_REQUEST_REQUEST
    });
    requestApi("/requests/", requestOptions).then(res => {
      dispatch({
        type: POST_REQUEST_SUCCESS,
        request: res
      });
    }).catch((err)=>{
      console.log("err",err)

      dispatch({
        type: POST_REQUEST_FAILED
      });
    });
  };
}

export const updateRequest = (id, data) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data})

  };
  return function (dispatch) {
    dispatch({
      type: UPDATE_REQUEST_REQUEST
    });
    requestApi(`/requests/${id}/`, requestOptions).then(res => {
      dispatch({
        type: UPDATE_REQUEST_SUCCESS,
        request: res
      });
    }).catch((err)=>{
      console.log("err",err)

      dispatch({
        type: UPDATE_REQUEST_FAILED
      });
    });
  };
}


export const clearDetailREQUESTS = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_REQUESTS
    });
  };
}