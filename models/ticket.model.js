const mongoose = require('mongoose');
const { ticketStatus } = require('../utils/constants');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: Number,
        default: 4
    },
    status: {
        type: String,
        enum: ticketStatus,
        default: "OPEN"
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("Ticket", ticketSchema);