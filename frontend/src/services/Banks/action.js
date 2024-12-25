import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import { convertToBase64 } from '../../utils/uploadImage';
import {
  GET_BANKS_REQUEST,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAILED,
} from './type'


export const getBanks = () => {
  return function (dispatch) {
    dispatch({
      type: GET_BANKS_REQUEST
    });
    requestApi("/banks/").then(res => {
      dispatch({
            type: GET_BANKS_SUCCESS,
            banks: res
          });
    }).catch((err) => {
        dispatch({
          type: GET_BANKS_FAILED
        });
    });
  };
}

