import { useNavigate } from 'react-router';
import { requestApi, requestApiTemplate } from '../../utils/requestApi';
import { convertToBase64 } from '../../utils/uploadImage';
import {
  // GET_PROPERTIES_REQUEST,
  // GET_PROPERTIES_SUCCESS,
  // GET_PROPERTIES_FAILED,
  POST_NOTIFICATION_REQUEST,
  POST_NOTIFICATION_SUCCESS,
  POST_NOTIFICATION_FAILED,
} from './type'


// export const getPropeties = () => {
//   return function (dispatch) {
//     dispatch({
//       type: GET_PROPERTIES_REQUEST
//     });
//     requestApi("/properties/").then(res => {
//       console.log('getproperties', res)
//       dispatch({
//             type: GET_PROPERTIES_SUCCESS,
//             properties: res
//           });
//     }).catch((err) => {
//         dispatch({
//           type: GET_PROPERTIES_FAILED
//         });
//     });
//   };
// }


// export const getDetailProperty = (id) => {
//   return function (dispatch) {
//     dispatch({
//       type: GET_NOTIFICATION_REQUEST
//     });
//     requestApi("/properties/" + id).then(res => {
//       dispatch({
//         type: GET_NOTIFICATION_SUCCESS,
//         detailProperty: res
//       });
//     }).catch((err)=>{
//       dispatch({
//         type: GET_NOTIFICATION_FAILED
//       });
//     });
//   };
// }

export const postNotification = (data) => {

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...data})

  };
  return function (dispatch) {
    dispatch({
      type: POST_NOTIFICATION_REQUEST
    });
    requestApi("/notifications/", requestOptions).then(res => {
      dispatch({
        type: POST_NOTIFICATION_SUCCESS,
        property: res
      });
    }).catch((err)=>{
      console.log("err",err)

      dispatch({
        type: POST_NOTIFICATION_FAILED
      });
    });
  };
}
