import React, { useState } from "react";
import axios from "axios";

const LoginPage = ({ vision }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    if (user === "" || pass === "") {
    } else {
      const res = await axios.get(`https://server.loca.lt/login`, {
        params: {
          user,
          pass,
        },
      });

      if (res.data.length === 1) {
        vision();
      }
    }

    setUser("");
    setPass("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="card" style={{ width: "100%", marginBottom: "20px" }}>
          <div className="card-body">
            <input
              className="form-control"
              placeholder="Enter username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <br />
            <input
              className="form-control"
              placeholder="Enter password"
              value={pass}
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
