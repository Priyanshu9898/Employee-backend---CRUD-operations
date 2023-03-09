import express from 'express';
import { Router } from 'express';
import { createTeam, retrieveTeams } from '../controllers/TeamsController.js';

const router = express.Router();

router.route("/createTeam").post(createTeam);
router.route("/getTeams").get(retrieveTeams);


export default router;