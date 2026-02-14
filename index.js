const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let employees = [];
let id = 1;

// CREATE
app.post('/employees', (req, res) => {
  const employee = { id: id++, ...req.body };
  employees.push(employee);
  res.json(employee);
});

// READ
app.get('/employees', (req, res) => {
  res.json(employees);
});

// UPDATE
app.put('/employees/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  const index = employees.findIndex(e => e.id === empId);

  if (index === -1) return res.status(404).json({ message: "Employee not found" });

  employees[index] = { ...employees[index], ...req.body };
  res.json(employees[index]);
});

// DELETE
app.delete('/employees/:id', (req, res) => {
  const empId = parseInt(req.params.id);
  employees = employees.filter(e => e.id !== empId);
  res.json({ message: "Employee deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});