const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');

module.exports = (app) => {
    app.use("/crm/api/v1/auth", authRouter);
    app.use("/crm/api/v1/users", userRouter);
}