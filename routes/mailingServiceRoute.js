const express = require("express");
const mailingServiceRouter = express.Router();
const { contactUs } = require("../controllers/mailingServiceController");

mailingServiceRouter.post("/mailingService", contactUs);

module.exports = mailingServiceRouter;
