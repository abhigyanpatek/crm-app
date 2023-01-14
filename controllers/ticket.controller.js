const Ticket = require('../models/ticket.model');
const User = require('../models/user.model');
const { ticketResponse, ticketListResponse } = require('../utils/objectConverter');

const createTicket = async (req, res) => {
    const ticketObject = {
        title: req.body.title,
        description: req.body.description,
        ticketPriority: req.body.ticketPriority,
        reporter: req.id
    }
    try {
        // finding an engineer for assigning the ticket
        const engineer = await User.findOne({
            userType: "ENGINEER",
            userStatus: "APPROVED"
        });
        ticketObject.assignee = engineer._id;

        // creating new ticket and finding requested user details
        const [ticket, user] = await Promise.all([Ticket.create(ticketObject), User.findById(req.id)]);

        // updating user's and engineer's details  
        user.ticketCreated.push(ticket._id);
        engineer.ticketAssigned.push(ticket._id);
        await Promise.all([user.save(), engineer.save()]);

        res.status(201).send(ticketResponse(ticket));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in creating ticket. Please try again after sometime!"
        });
    }
}

const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if(ticket.reporter == req.id || ticket.assignee == req.id || req.role == "ADMIN"){
            ticket.title = req.body.title ?? ticket.title;
            ticket.description = req.body.description ?? ticket.description;
            ticket.ticketPriority = req.body.ticketPriority ?? ticket.ticketPriority;
            ticket.status = req.body.status ?? ticket.status;

            const updatedTicket = await ticket.save();
            res.status(200).send(ticketResponse(updatedTicket));
        }else {
            console.log("Ticket was being updated by someone who has not created the ticket");
            res.status(401).send({
                message: "Ticket can be updated only by the customer who created it or engineer who got assigned"
            });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in updating ticket. Please try again after sometime!"
        });
    }
}

const getAllTickets = async (req, res) => {
    const queryObj = {};
    if(req.query.status){
        queryObj.status = req.query.status;
    }

    if(req.role === "ENGINEER"){
        queryObj.assignee = req.id;
    }
    if(req.role === "CUSTOMER"){
        queryObj.reporter = req.id;
    }
    try {
        const tickets = await Ticket.find(queryObj);
        res.status(200).send(ticketListResponse(tickets));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in fetching tickets. Please try again after sometime!"
        });
    }
}

const getTicketOnId = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if(!ticket){
            return res.status(404).send({
                message: "Ticket doesn't exist!"
            });
        }
        res.status(200).send(ticketResponse(ticket));
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "Error occured in fetching ticket. Please try again after sometime!"
        });
    }
}

module.exports = {
    createTicket,
    updateTicket,
    getAllTickets,
    getTicketOnId
}