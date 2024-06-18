const mongoose = require('mongoose')
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true
    },
    file: {
        type: [String],
        require:true
    },
    address: {
        country: {
            type: String,
            require:true
        },
        state: {
            type: String,
            require:true
        },
        city: {
            type: String,
            require:true
        },
        
    },
    password: {
        type: String,
        required: true,
        trim:true
    }
})
const Employee = mongoose.model('employees', empSchema, 'employees')
module.exports=Employee