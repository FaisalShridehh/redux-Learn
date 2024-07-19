// import { ActionTypes } from "../../types/Customer.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    createCustomer: {
      prepare: (fullName, nationalID) => ({
        payload: { fullName, nationalID, createdAt: new Date().toISOString() },
      }),
      reducer: (state, action) => {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName: (state, action) => {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case ActionTypes.CREATE_CUSTOMER:
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case ActionTypes.UPDATE_NAME:
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//       };
//     default:
//       return state;
//   }
// }
// export function createCustomer(fullName, nationalID) {
//   return {
//     type: ActionTypes.CREATE_CUSTOMER,
//     payload: {
//       fullName,
//       nationalID,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: ActionTypes.UPDATE_NAME,
//     payload: { fullName },
//   };
// }
