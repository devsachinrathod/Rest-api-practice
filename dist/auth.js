const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = mongoose.model("Admin"); // example model
// Admin Middleware
function adminMiddleware(req, res, next) {
    const dataData = req.get("datadata");
    if (!dataData) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    // Example admin validation
    mAdmin.findOne({ apiKey: dataData })
        .then((admin) => {
        if (!admin) {
            return res.status(403).json({ error: "Forbidden" });
        }
        req.admin = admin;
        next();
    })
        .catch((err) => res.status(500).json({ error: "Server Error", details: err }));
}
// Auth Middleware
function authMiddleware(req, res, next) {
    const token = req.get("token");
    if (!token)
        return res.status(401).json({ message: "Token missing" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
// Post Courses
function postCourses(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({ message: "Please provide input data" });
    }
    // Assuming you have a Course model
    const Course = mongoose.model("Course");
    Course.create(body)
        .then(() => res.status(201).json({ message: "Course created successfully" }))
        .catch((err) => res.status(500).json({ error: "Failed to create course", details: err }));
}
module.exports = { adminMiddleware, authMiddleware, postCourses };
export {};
//# sourceMappingURL=auth.js.map