const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

// process.env.NODE_ENV => production or undefined

// middleware
app.use(cors());
app.use(express.json()); // req.body

if (process.env.NODE_ENV === "production") {
  // service static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES

// get all collects
app.get("/collects", async (req, res) => {
  try {
    const {postal_code} = req.query;
    var query = "SELECT * from tb_collect";
    if(postal_code !== "") {
      query += " where postal_code like '%" + postal_code + "%'";
    }
    const allCollects = await pool.query(query);
    res.status(200).json(allCollects.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a collects
app.get("/collects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM tb_collect WHERE todo_id = $1",
      [id]
    );
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a collects
app.post("/collects", async (req, res) => {
  try {
    const {
      date,
      associate_initial,
      individual_num_youth,
      individual_num_teen,
      individual_num_college,
      individual_num_adult,
      individual_num_senior,
      first_time_visitor,
      repeat_visitor,
      postal_code,
      outside_us,
      moca_member,
      moca_email,
      collect_type,
      institution
    } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tb_collect (associate_initial, individual_num_youth, individual_num_teen, individual_num_college, individual_num_adult, individual_num_senior, first_time_visitor, repeat_visitor, postal_code, outside_us, moca_member, moca_email, collect_type, institution, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *",
      [
        associate_initial,
        individual_num_youth,
        individual_num_teen,
        individual_num_college,
        individual_num_adult,
        individual_num_senior,
        first_time_visitor,
        repeat_visitor,
        postal_code,
        outside_us,
        moca_member,
        moca_email,
        collect_type,
        institution,
        date,
        date
      ]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a individual
app.put("/collects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      associate_initial,
      individual_num_youth,
      individual_num_teen,
      individual_num_college,
      individual_num_adult,
      individual_num_senior,
      first_time_visitor,
      repeat_visitor,
      postal_code,
      outside_us,
      moca_member,
      moca_email,
      collect_type,
      institution,
      date
    } = req.body;
    await pool.query(
      "UPDATE tb_collect SET associate_initial = $1, individual_num_youth = $2, individual_num_teen = $3, individual_num_college = $4, individual_num_adult = $5, individual_num_senior = $6, first_time_visitor = $7 , repeat_visitor = $8, postal_code = $9, outside_us = $10, moca_member = $11, moca_email = $12, collect_type=$13, institution=$14, updated_at=$15 WHERE _id = $16",
      [
        associate_initial,
        individual_num_youth,
        individual_num_teen,
        individual_num_college,
        individual_num_adult,
        individual_num_senior,
        first_time_visitor,
        repeat_visitor,
        postal_code,
        outside_us,
        moca_member,
        moca_email,
        collect_type,
        institution,
        date,
        id,
      ]
    );

    res.status(200).json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a collect
app.delete("/collects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tb_collect WHERE _id = $1", [id]);
    res.status(200).json("Collect was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
