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

// get all individuals
app.get("/individuals", async (req, res) => {
  try {
    const allIndividuals = await pool.query("SELECT * from tb_individual");
    res.status(200).json(allIndividuals.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a individuals
app.get("/individuals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM tb_individual WHERE todo_id = $1",
      [id]
    );
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a individuals
app.post("/individuals", async (req, res) => {
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
    } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tb_individual (associate_initial, individual_num_youth, individual_num_teen, individual_num_college, individual_num_adult, individual_num_senior, first_time_visitor , repeat_visitor, postal_code, outside_us, moca_member, moca_email, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
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
app.put("/individuals/:id", async (req, res) => {
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
    } = req.body;
    await pool.query(
      "UPDATE tb_individual SET associate_initial = $1, individual_num_youth = $2, individual_num_teen = $3, individual_num_college = $4, individual_num_adult = $5, individual_num_senior = $6, first_time_visitor = $7 , repeat_visitor = $8, postal_code = $9, outside_us = $10, moca_member = $11, moca_email = $12 WHERE _id = $13",
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
        id,
      ]
    );

    res.status(200).json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a individual
app.delete("/individuals/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tb_individual WHERE _id = $1", [id]);
    res.status(200).json("Individual was deleted");
  } catch (err) {
    console.error(err.message);
  }
});


// get all groups
app.get("/groups", async (req, res) => {
  try {
    const allGroups = await pool.query("SELECT * from tb_group");
    res.status(200).json(allGroups.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a groups
app.get("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query(
      "SELECT * FROM tb_group WHERE todo_id = $1",
      [id]
    );
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a groups
app.post("/groups", async (req, res) => {
  try {
    const {
      date,
      associate_initial,
      individual_num_youth,
      individual_num_teen,
      individual_num_college,
      individual_num_adult,
      individual_num_senior,
      institution,
      postal_code,
      outside_us,
    } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO tb_group (associate_initial, individual_num_youth, individual_num_teen, individual_num_college, individual_num_adult, individual_num_senior, institution , postal_code, outside_us, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        associate_initial,
        individual_num_youth,
        individual_num_teen,
        individual_num_college,
        individual_num_adult,
        individual_num_senior,
        institution,
        postal_code,
        outside_us,
        date,
        date
      ]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a groups
app.put("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      associate_initial,
      individual_num_youth,
      individual_num_teen,
      individual_num_college,
      individual_num_adult,
      individual_num_senior,
      institution,
      postal_code,
      outside_us,
    } = req.body;
    await pool.query(
      "UPDATE tb_group SET associate_initial = $1, individual_num_youth = $2, individual_num_teen = $3, individual_num_college = $4, individual_num_adult = $5, individual_num_senior = $6, institution = $7, postal_code = $8, outside_us = $9 WHERE _id = $10",
      [
        associate_initial,
        individual_num_youth,
        individual_num_teen,
        individual_num_college,
        individual_num_adult,
        individual_num_senior,
        institution,
        postal_code,
        outside_us,
        id,
      ]
    );

    res.status(200).json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a groups
app.delete("/groups/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM tb_group WHERE _id = $1", [id]);
    res.status(200).json("Group was deleted");
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
