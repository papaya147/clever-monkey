import React, { useState } from "react";
import PaymentsPending from "./PaymentsPending";
import PaymentCreate from "./PaymentCreate";
import PaymentsOld from "./PaymentsOld";
import LoginPage from "./LoginPage";

const App = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [visible, setVisible] = useState(false);

  const makeVisible = () => {
    setVisible(false);
  };

  return (
    <div>
      {/* <div
        className={visible ? "container-fluid" : "d-none"}
        style={{ padding: "5%" }}
      >
        <h1>Welcome to the payments app!</h1>
        <br />
        <LoginPage vision={makeVisible} />
      </div> */}
      <div
        className={visible ? "d-none" : "container-fluid"}
        style={{ padding: "5%" }}
      >
        <h1>New Payment</h1>
        <PaymentCreate />
        <hr />
        <h1>Pending Payments</h1>
        <PaymentsPending  />
        <hr />
        <h1>Old Payments</h1>
        <label>Filters:</label>
        <br />
        <input
          className="form-control"
          placeholder="Enter year"
          style={{ width: "30%", margin: "0.25%", display: "inline-block" }}
          value={year}
          type="number"
          onChange={(e) => setYear(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Enter month"
          style={{ width: "30%", margin: "2%", display: "inline-block" }}
          value={month}
          type="number"
          onChange={(e) => setMonth(e.target.value)}
        />
        <input
          className="form-control"
          placeholder="Enter day"
          style={{ width: "30%", margin: "2%", display: "inline-block" }}
          value={day}
          type="number"
          onChange={(e) => setDay(e.target.value)}
        />
        <PaymentsOld year={year} month={month} day={day} />
      </div>
    </div>
  );
};

export default App;
