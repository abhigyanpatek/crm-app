const authRouter = require('./auth.routes');

module.exports = (app) => {
    app.use("/crm/api/v1/auth", authRouter);
}