const { ticketStatus } = require("../utils/constants");

exports.validateTicketReqBody = (req, res, next) => {
    if(!req.body.title){
        return res.status(400).send({
            message: "Failed! Title is not provided!"
        });
    }
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Description is not provided!"
        });
    }
    next();
}

exports.validateUpdateTicketStatus = (req, res, next) => {
    if(req.body.status && !ticketStatus.includes(req.body.status)){
        return res.status(400).send({
            message: "Failed! status provided is invalid. Possible values CLOSED | BLOCKED | IN_PROGESS | OPEN"
        });
    }
    next();
}