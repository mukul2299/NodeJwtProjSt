
const appRouter= require('express').Router();
const userRoute = require('../modules/user/user.routes');

userRoute(appRouter);
// require('../modules/postRoutes')(appRouter)
require('../modules/product/product.routes')(appRouter);

module.exports=appRouter;

