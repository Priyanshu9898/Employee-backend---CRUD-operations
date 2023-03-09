import express, { request } from 'express';
import Team from '../models/Team.js';


// Create a new Team
export const createTeam = async (req, res, next) => {
    const {name} = req.body;
    // console.log(name);

    if(!name){
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }


    let team = await Team.findOne({name});

    if(team){
        return res.json({
            success: false,
            message: "Team Already exists",
        })
    }

    team = await Team.create({
        name: name
    });

    return res.json({
        success: true,
        message: "Team Created successfully",
        team
    });


}


// Retrieve all the teams
export const retrieveTeams = async (req, res, next) => {

    let teams = await Team.find({});

    if(!teams){
        return res.json({
            success: false,
            message: "Teams Not Found",
        })
    }

    return res.json({
        success: true,
        teams
    });


}
