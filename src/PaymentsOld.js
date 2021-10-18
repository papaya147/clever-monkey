import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentsOld = (props) => {
  const { year, month, day } = props;
  const [oldpayments, setOldpayments] = useState({});
  const [sum, setSum] = useState("");

  const getPayments = async () => {
    if (year === "" && month === "" && day === "") {
    } else {
      const res = await axios.get(`http://localhost:4000/oldpayments`, {
        params: {
          year,
          month,
          day,
        },
      });

      setSum(res.data[0][0].sum);
      setOldpayments(res.data[1]);
    }
  };

  useEffect(() => {
    getPayments();
  }, [props.year, props.month, props.day]);

  const renderedTable = Object.values(oldpayments).map((payment) => {
    return (
      <tr key={payment.id}>
        <td>{payment.vendor}</td>
        <td>{payment.amount}</td>
      </tr>
    );
  });

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderedTable}
          <tr key="sum">
            <td>Total: </td>
            <td>{sum}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsOld;
