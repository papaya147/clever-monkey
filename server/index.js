const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin");
  next();
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "paymentapp",
  password: "^R&KLbxIfiKlgukDUJc<;JF^&ofl",
  database: "payments",
  multipleStatements: "true",
});

app.get("/paymentspending", (req, res) => {
  const query = `SELECT id, vendor, amount FROM transactions WHERE paid = 0`;

  setResult = (result) => {
    res.send(result);
  };

  conn.query(query, (err, rows) => {
    if (err) throw err;
    console.log("Fetched");

    setResult(rows);
  });
});

app.post("/newpayment", (req, res) => {
  const { vendor, amount } = req.body;
  const query = `INSERT INTO transactions (vendor, amount, paid) VALUES ("${vendor}", ${amount}, 0)`;

  conn.query(query, (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record updated");
  });

  res.sendStatus(200);
});

app.post("/markpaid", (req, res) => {
  const { id } = req.body;

  query = `UPDATE transactions SET paid = 1, date_paid = now() WHERE id = ${id}`;

  conn.query(query, (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record updated");
  });

  res.sendStatus(200);
});

app.get("/oldpayments", (req, res) => {
  const { year, month, day } = req.query;
  let query = "";

  if (day == 0 && month == 0) {
    query = `SELECT SUM(amount) as sum FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year};`;
    query += `SELECT id, vendor, amount FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year}`;
  } else if (day == 0) {
    query = `SELECT SUM(amount) as sum FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year} AND MONTH(date_created) = ${month};`;
    query += `SELECT id, vendor, amount FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year} AND MONTH(date_created) = ${month}`;
  } else {
    query = `SELECT SUM(amount) as sum FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year} AND MONTH(date_created) = ${month} AND DAY(date_created) = ${day};`;
    query += `SELECT id, vendor, amount FROM transactions WHERE paid = 1 AND YEAR(date_created) = ${year} AND MONTH(date_created) = ${month} AND DAY(date_created) = ${day}`;
  }

  conn.query(query, (err, rows) => {
    if (err) throw err;
    console.log("Fetched");

    res.send(rows);
  });
});

app.get("/login", (req, res) => {
  const { user, pass } = req.query;

  const query = `SELECT id FROM accounts WHERE username = "${user}" AND pass = md5("${pass}")`;

  conn.query(query, (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

app.listen(4000, "0.0.0.0", () => {
  console.log(`Listening on 4000`);
});
