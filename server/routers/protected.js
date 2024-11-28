const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", authenticate, (req, res) => {
    res.json({ message: `Welcome, user ${req.user.id}!`});
});

router.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
    res.json({ message: "welocome, admin!"});
})

module.exports = router;