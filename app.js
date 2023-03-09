import express from "express";
import dotenv from 'dotenv';
import { connectionDb } from "./config/Database.js";
import employee from "./routers/EmployeeRouter.js";
import teams from "./routers/TeamsRouter.js";

const app = express();

dotenv.config({path: "./config/config.env"});

console.log(process.env.PORT);

const port = process.env.PORT || 5000;

connectionDb();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(express.json());

app.use(
    express.urlencoded({
      extended: true,
    })
);



app.use("/api/v1", employee);
app.use("/api/v1", teams);

app.listen(port, (req, res) => {
    console.log(`App is listening on http://localhost:${port}`);
});