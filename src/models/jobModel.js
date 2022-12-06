const mongoose = require('mongoose');



const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'position is required'],
        maxLength: 100
    },
    position: {
        type: String,
        required: [true, 'position is required'],
        maxLength: 50
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'please provide a user'],
    }
}, { timestamps: true });


module.exports = mongoose.model('Job', JobSchema);