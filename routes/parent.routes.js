const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const ticketRouter = require('./ticket.routes');

module.exports = (app) => {
    app.use("/crm/api/v1/auth", authRouter);
    app.use("/crm/api/v1/users", userRouter);
    app.use("/crm/api/v1/tickets", ticketRouter);
}