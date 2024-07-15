import { ActionTypes } from "../../types/Customer.types";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
  balance: 0,
};

export default function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case ActionTypes.CREATE_CUSTOMER:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case ActionTypes.UPDATE_NAME:
      return {
        ...state,
        fullName: action.payload.fullName,
      };
    default:
      return state;
  }
}
export function createCustomer(fullName, nationalID) {
  return {
    type: ActionTypes.CREATE_CUSTOMER,
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return {
    type: ActionTypes.UPDATE_NAME,
    payload: { fullName },
  };
}
