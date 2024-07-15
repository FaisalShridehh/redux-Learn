import { ActionTypes } from "../../types/account.types";
/**
 * some important notes about reducers
 *  * 1- reducers are pure functions
 *  * 2- reducers are not allowed to modify the existing state
 *  * 3- reducers are not allowed to do any asynchronous operations,logic or sideEffect
 *  * 4- they always return the same output for the same input
 *  * 5- they don't have any side effects (e.g. making API calls, modifying the DOM, etc.)
 *  * 6- reducers are deterministic (they always return the same output for the same input)
 *  * 7- reducers are not mutable (they don't modify the input data)
 *  * 8- reducers are composable (you can combine multiple reducers to create a new reducer)
 */

/**
 * the action names must model what happened or what should happen so ,
 * redux team advices that the naming of the reducer actions must be :
 *  *  write them in in the shape of the state domain
 *  *- stateDomain then the event/action name in this case
 *  *- e.g. state/eventName
 *  *- examples:
 *      - account/deposit
 *      - account/withdraw
 *      - account/requestLoan
 *      - account/payLoan
 */

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

/**
 * Account reducer function
 * @param state
 * @param action
 * @returns {*}
 */
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ActionTypes.DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        isLoading: false,
      };
    case ActionTypes.WITHDRAW:
      return {
        ...state,
        balance: state.balance - action.payload.amount,
      };
    case ActionTypes.REQUEST_LOAN:
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: state.loan + action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case ActionTypes.PAY_LOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case ActionTypes.CONVERT_CURRENCY:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  // api.frankfurter.app;
  // fetch(`https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`);
  if (currency === "USD")
    return {
      type: ActionTypes.DEPOSIT,
      payload: { amount },
    };

  return async (dispatch, getState) => {
    dispatch({
      type: ActionTypes.CONVERT_CURRENCY,
    });
    try {
      // Api call
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      // return action
      dispatch({
        type: ActionTypes.DEPOSIT,
        payload: { amount: data.rates.USD },
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function withdraw(amount) {
  return {
    type: ActionTypes.WITHDRAW,
    payload: { amount },
  };
}
export function requestLoan(amount, purpose) {
  return {
    type: ActionTypes.REQUEST_LOAN,
    payload: { amount, purpose },
  };
}
export function payLoan() {
  return {
    type: ActionTypes.PAY_LOAN,
  };
}
