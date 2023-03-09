import express, { request } from 'express';
import Employee from '../models/Employee.js';
import Team from '../models/Team.js';

export const createEmployee = async (req, res, next) => {
    const {name, team, address} = req.body;

    if(!name || !team){
        return res.json({
            success: false,
            message: "All fields are required"
        });
    }

    // console.log(name, team, address);

    const first = name.first;
    const last = name.last;
    const lines = address.lines;
    const postal = address.postal;

    let employee = await Employee.findOne({name: {first: first , last : last}});
    
    // console.log(employee);
    if(employee){
        return res.json({
            success: false,
            message: "Employee Already exists",
        })
    }


    const teams = await Team.find({});

    // console.log(teams);

    const isTeam = teams.find((item) => {
        if(item.name === team.name){
            return true;
        }
    });

    // console.log(isTeam);

    if(!isTeam){
        return res.json({
            success: false,
            message: "Team does not exist",

        });
    }

    const emp = await Employee.create({
        name: {
            first: first,
            last: last,
        },
        team: {
            name: isTeam.name,
            id : isTeam._id
        },
        address: {
            lines: lines,
            postal: postal
        }
    })

    return res.json({
        success: true,
        message: "Employee Created successfully",
        emp
    });
    
}


export const retrieveAllEmployee = async (req, res, next) => {



    const employee = await Employee.find({});

    // console.log(employee);

    if(!employee){
        return res.json({
            success: false,
            message: "Employees does not exist",
        });
    }

    return res.json({
        success: true, 
        employee
    });
}





export const retrieveEmployee = async (req, res, next) => {

    const {name} = req.body;

    if(!name){
        return res.json({
            success: false,
            message: "Name is required",
        });
    }

    let first = name.first;
    let last = name.last;

    // console.log(first, last);
    // console.log(await Employee.find({}));
    const employee = await Employee.findOne({name: {first: first , last : last}});

    // console.log(employee);

    if(!employee){
        return res.json({
            success: false,
            message: "Employee does not exist",
        });
    }

    return res.json({
        success: true, 
        employee
    });
}


export const updateEmployee = async (req, res, next) => {


    const id = req.params.id;
    const employee = await Employee.findOne({_id : id});

    console.log(employee);

    const {name, address, team} = req.body;

    if(!name && !address && !team) {
        return res.json({
            success:false,
            message: "Some fields required to update"
        });
    }

    if(name){

        let first = name.first;
        let last = name.last;
        
        employee.name.first = first;
        employee.name.last = last;
     
    }

    if(address){
        const lines = [address.lines];
        const postal = address.postal;

        employee.address.lines = lines;
        employee.address.postal = postal;
    }

    if(team){
        const teams = await Team.find({});

    // console.log(teams);

        const isTeam = teams.find((item) => {
            if(item.name === team.name){
                return true;
            }
        });

        if(!isTeam){
            return res.json({
                success: false,
                message: "Team does not exist",
            });
        }

        employee.team.id = isTeam._id;
        employee.team.name = isTeam.name;


    }

    await employee.save();

    return res.json({
        success: true, 
        message: "Employee has been updated successfully",
        employee
    });
}