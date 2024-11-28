const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
    try{
        const { username, password, role } = req.body;
        const user = new user({ username, password, role });
        await user.save();
        res.status(201).json({ message: "user registered successfully" });
    } catch (err) {
        res.status(400).json({ error: "user registration failed"});
    }
});

router.post("/login", async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await user.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role}, JWT_SECRET, { expiresIn: "1h"});
        res.cookie("token", token, {httpOnly: true});
        res.json({ message: "Login successful", token});
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;