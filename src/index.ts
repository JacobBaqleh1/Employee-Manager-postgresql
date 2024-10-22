import inquirer from "inquirer";
import express from "express";
import { QueryResult } from "pg";
import { pool, connectToDb } from "./connection.js";
import Table from "cli-table3";

await connectToDb();

//const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startCli = (): void => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      if (answers.action === "View all departments") {
        pool.query(
          `SELECT id, department_name AS name FROM department`,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log("error viewing departments");
            } else if (result) {
              const table = new Table({
                head: ["ID", "Name"],
                colWidths: [5, 10],
              });
              result.rows.forEach((row) => {
                table.push([row.id, row.name]);
              });
              console.log(table.toString());
              startCli();
            }
          }
        );
      } else if (answers.action === "View all roles") {
        pool.query(
          `SELECT id, title, department_id AS department, salary FROM roles`,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log("error viewing departments");
            } else if (result) {
              const table = new Table({
                head: ["ID", "Title", "Department", "Salary"],
                colWidths: [5, 20, 15, 10],
              });
              result.rows.forEach((row) => {
                table.push([row.id, row.title, row.department, row.salary]);
              });
              console.log(table.toString());
              startCli();
            }
          }
        );
      } else if (answers.action === "View all employees") {
        pool.query(
          //its wrong
          `SELECT
           employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.department_name AS department, employee.manager_id AS manager FROM employee 
           JOIN
            roles ON employee.role_id = roles.id 
          JOIN
           department ON roles.department_id = department.id
           JOIN
           `,
          (err: Error, result: QueryResult) => {
            if (err) {
              console.log("error viewing departments");
            } else if (result) {
              const table = new Table({
                head: [
                  "ID",
                  "First Name",
                  "Last Name",
                  "Title",
                  "Department",
                  "Salary",
                  "Manager",
                ],
                colWidths: [5, 15, 15, 20, 15, 15, 15],
              });
              result.rows.forEach((row) => {
                table.push([
                  row.id,
                  row.first_name,
                  row.last_name,
                  row.title,
                  row.department,
                  row.salary,
                  row.manager,
                ]);
              });
              console.log(table.toString());
              startCli();
            }
          }
        );
      } else if (answers.action === "Add a department") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "response",
              message: "What is the name of the department",
            },
          ])
          .then((answer) => {
            const departmentName = answer.response;

            pool.query(
              `INSERT INTO department (department_name) VALUES ($1) RETURNING id, department_name`,
              [departmentName],
              (err: Error, result: QueryResult) => {
                if (err) {
                  console.log("error adding department");
                } else {
                  const table = new Table({
                    head: ["ID", "Department"],
                    colWidths: [5, 20],
                  });
                  result.rows.forEach((row) => {
                    table.push([row.id, row.department_name]);
                  });
                  console.log(table.toString());
                  startCli();
                }
              }
            );
          });
      } else if (answers.action === "Add a department") {
      } else if (answers.action === "Add a role") {
      } else if (answers.action === "Add an employee") {
      } else if (answers.action === "Update an employee role") {
      }
    });
};

startCli();
