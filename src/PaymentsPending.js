import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentsPending = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const res = await axios.get(`https://server.loca.lt/paymentspending`);

    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const onClick = async (id) => {
    await axios.post(`https://server.loca.lt/markpaid`, { id });
    fetchPayments();
  };

  const renderedPayments = Object.values(payments).map((payment) => {
    return (
      <div
        className="card"
        style={{ width: "100%", marginBottom: "20px" }}
        key={payment.id}
      >
        <div className="card-body">
          <h4>{payment.vendor}</h4>
          <h5>{payment.amount}</h5>
          <button
            className="btn btn-success"
            onClick={() => onClick(payment.id)}
          >
            Mark as Paid
          </button>
        </div>
      </div>
    );
  });

  return <div className="d-flex flex-row flex-wrap">{renderedPayments}</div>;
};

export default PaymentsPending;
