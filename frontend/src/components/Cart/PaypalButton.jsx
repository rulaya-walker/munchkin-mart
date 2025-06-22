import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";

const PaypalButton = ({amount, onSuccess, onError}) => {

  return (
    <PayPalScriptProvider options={{ 
      "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
      currency: "USD"
    }}>
      <PayPalButtons
        style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: amount.toFixed(2) // Ensure amount is properly formatted
              }
            }]
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const orderDetails = await actions.order.capture();
            onSuccess(orderDetails);
            return orderDetails;
          } catch (error) {
            onError(error);
          }
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err);
        }}
        onCancel={() => {
          console.log("PayPal payment cancelled");
          alert("Payment cancelled. Please try again when you're ready.");
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PaypalButton