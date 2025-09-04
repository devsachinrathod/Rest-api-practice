export function authChecker(req, res, next) {
    const { username, password } = req.body;
    if (username !== "sachin" || password !== "echan") {
        return res.status(401).json({ message: "User does not exist in this website" });
    }
    console.log("✅ User authenticated successfully");
    next(); // continue
}
//# sourceMappingURL=middleware.js.map