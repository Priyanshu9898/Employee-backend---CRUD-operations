import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    name: {
        
        type: String,
        required: [true, "Team Name is Required"],
        
    },
    
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;