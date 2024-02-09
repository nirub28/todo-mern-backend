const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");


router.get("/", homeController.home);
router.use("/todo", require("./todoRoutes"));
router.use("/auth", require("./authRoutes"));


module.exports = router;