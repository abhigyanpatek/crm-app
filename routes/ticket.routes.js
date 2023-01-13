const ticketController = require('../controllers/ticket.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { validateTicketReqBody, validateUpdateTicketStatus } = require('../middlewares/verifyTicketReqBody');
const express = require('express');
const router = express.Router();

router.post("/", [verifyToken, validateTicketReqBody], ticketController.createTicket);
router.put("/:id", [verifyToken, validateUpdateTicketStatus], ticketController.updateTicket);
router.get("/", [verifyToken], ticketController.getAllTickets);
router.get("/:id", [verifyToken], ticketController.getTicketOnId);

module.exports = router;