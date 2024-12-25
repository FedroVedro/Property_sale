import {
  GET_BANKS_REQUEST,
  GET_BANKS_SUCCESS,
  GET_BANKS_FAILED,
} from "./type";

export const initialState = {
  banks: [],
  banksOptions: [],
  getBanksRequest: false,
  getBanksSuccess: false,
  getBanksFailed: false,

};
export const banksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BANKS_REQUEST:
      return {
        ...state,
        getBanksRequest: true,
      };
    case GET_BANKS_SUCCESS:
      return {
        ...state,
        getBanksSuccess: true,
        getBanksRequest: false,
        banks: action.banks,
        banksOptions: action.banks.map(bank => {
          return {value: bank.id, label: bank.name}
        })
      };
    case GET_BANKS_FAILED:
      return {
        ...state,
        getBanksRequest: false,
        getBanksFailed: true,
      };
    default: {
      return state;
    }
  }
};
