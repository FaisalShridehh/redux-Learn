import { useSelector } from "react-redux";

function Customer() {
  const fullName = useSelector((store) => store.customer.fullName);
  // const customer = useSelector((store) => store.customer);
  // console.log(customer);
  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
