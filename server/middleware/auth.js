const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(403).json({ error: "Access denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token"});
    }
};

const authorize = (roles) => (req, res, next) =>{
    if(!roles.includes(req.user.role)) {
        return res.status(403).json({ error : "Forbidden" });
    }
    next();
};

module.exports = { authenticate, authorize };