import { useNavigate } from 'react-router';
import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import { convertToBase64 } from '../../utils/uploadImage';
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
} from './type'


export const getPropeties = () => {
  return function (dispatch) {
    dispatch({
      type: GET_PROPERTIES_REQUEST
    });
    requestApi("/properties/").then(res => {
      console.log('getproperties', res)
      dispatch({
            type: GET_PROPERTIES_SUCCESS,
            properties: res
          });
    }).catch((err) => {
        dispatch({
          type: GET_PROPERTIES_FAILED
        });
    });
  };
}


export const getDetailProperty = (id) => {
  return function (dispatch) {
    dispatch({
      type: GET_PROPERTY_REQUEST
    });
    requestApi("/properties/" + id).then(res => {
      dispatch({
        type: GET_PROPERTY_SUCCESS,
        detailProperty: res
      });
    }).catch((err)=>{
      dispatch({
        type: GET_PROPERTY_FAILED
      });
    });
  };
}

export const postProperty = (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data})

  };
  return function (dispatch) {
    dispatch({
      type: POST_PROPERTY_REQUEST
    });
    requestApi("/properties/", requestOptions).then(res => {
      dispatch({
        type: POST_PROPERTY_SUCCESS,
        property: res
      });
      window.location.href = `properties/${res.id}`
    }).catch((err)=>{
      console.log("err",err)

      dispatch({
        type: POST_PROPERTY_FAILED
      });
    });
  };
}

export const clearDetailProperties = () => {
  return function (dispatch) {
    dispatch({
      type: CLEAR_PROPERTIES
    });
  };
}