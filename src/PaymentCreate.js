import React, { useState } from "react";
import axios from "axios";

const PaymentCreate = () => {
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");

  const onClick = async () => {
    if (vendor === "" || amount === "") {
    } else {
      await axios.post(`https://server.loca.lt/newpayment`, {
        vendor,
        amount,
      });
    }

    setVendor("");
    setAmount("");
  };

  return (
    <div>
        <div className="card" style={{ width: "100%", marginBottom: "20px" }}>
          <div className="card-body">
            <label>Enter Vendor: </label>
            <input
              className="form-control"
              placeholder="Vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
            />
            <br />
            <label>Enter Amount: </label>
            <input
              className="form-control"
              placeholder="Amount"
              value={amount}
              type="number"
              step="0.01"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={(e) => onClick()}>Submit</button>
        </div>
    </div>
  );
};

export default PaymentCreate;
