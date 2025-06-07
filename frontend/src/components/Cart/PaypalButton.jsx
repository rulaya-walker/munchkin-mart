import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PaypalButton = ({amount,onSuccess,onError}) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID }}>
    <PayPalButtons
      style={{ layout: 'vertical', color: 'blue', shape: 'rect', label: 'pay' }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount // Replace with the total amount from your cart
            }
          }]
        });
      }}
      onApprove={async (data, actions) => {
        return await actions.order.capture().then(onSuccess);
        //console.log('Order captured:', order);
        // Here you can handle the order confirmation, e.g., save to your database
      }}
      onError={(err) => {
        onError;
      }}
    />
    </PayPalScriptProvider>
  )
}

export default PaypalButton