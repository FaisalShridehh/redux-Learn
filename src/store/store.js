import accountReducer from "../features/accounts/accountSlice";
import customerReducer from "../features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = {
  account: accountReducer,
  customer: customerReducer,
};

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
