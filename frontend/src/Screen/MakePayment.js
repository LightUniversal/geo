import React from "react";
import Flutterwave from "flutterwave-node-v3";

const MakePayment = () => {
    const config = {
      public_key: "FLWPUBK_TEST-7011ecee391c903c1739d52d220477c8-X",
      tx_ref: "FLWSECK_TEST-97ef62aa83a60eb7cd05b840fc87e97a-X",
      amount: "10000",
      currency: "NGN",
      payment_options: "card, mobilemoney, ussd",

      customer: {
        email: "customer@email.com",
        phone_number: "customer_phone_number",
        description: "Payment for items bought",
        name: "customer_name",
      },
    };

  const handlePayment = Flutterwave.useFlutterwave(config);
  return <div>
    <button onClick={}></button>
  </div>;
};

export default MakePayment;
