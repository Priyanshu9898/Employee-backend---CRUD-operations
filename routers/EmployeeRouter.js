import express from 'express';
import { createEmployee, retrieveAllEmployee, retrieveEmployee, updateEmployee } from '../controllers/EmployeeController.js';

const router = express.Router();


router.route("/retrieveEmployee").get(retrieveEmployee);
router.route("/retrieveAllEmployee").get(retrieveAllEmployee);
router.route("/createEmployee").post(createEmployee);
router.route("/updateEmployee/:id").put(updateEmployee);

export default router;