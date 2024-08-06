import { createContext, useState, useContext } from "react";

const CheckoutContext = createContext();

const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState({});

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => useContext(CheckoutContext);
export { useCheckout, CheckoutProvider };
