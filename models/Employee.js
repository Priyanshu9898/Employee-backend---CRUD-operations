import mongoose, { Schema } from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    name: {
        
        first: {
            type: String,
            required: [true, "First Name is Required"],
        },
        last: {

            type: String,
            required: [true, "Last Name is Required"],
        },
    },

    team: {
        
            name: {
                type: String,
                required: [true, "Team Name is Required"],
            },
        
            id: {
                type: Schema.Types.ObjectId,
                ref: "Team",
            }
    },
    image: {
        type: String,
        default: 'images/user.png',
    },
    address: {
        lines : {
            type: [String],
        },
        postal: {
            type: String,
        }
    }
})

const Employee = mongoose.model("Employee", EmployeeSchema);
export default Employee ;