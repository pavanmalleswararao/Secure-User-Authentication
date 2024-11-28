const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routers/auth");
const protectedRoutes = require("./routers/protected");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Database Connected"))
.catch(err => console.error("Database Connection error:", err));

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));