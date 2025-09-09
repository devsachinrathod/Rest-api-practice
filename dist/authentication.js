import jwt from "jsonwebtoken";
import zod from "zod";
const jwtPassword = "secret";
const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});
function GenerateToken(username, password) {
    const result = userSchema.safeParse({ username, password });
    if (!result.success) {
        return null;
    }
    const token = jwt.sign({ username }, jwtPassword);
    return token;
}
function decodeToken(token) {
    try {
        const decoded = jwt.decode(token);
        return !!decoded;
    }
    catch {
        return false;
    }
}
function VerifyToken(token) {
    try {
        jwt.verify(token, jwtPassword);
        return true;
    }
    catch {
        return false;
    }
}
const token = GenerateToken("akhil@example.com", "mypassword");
console.log("Generated Token:", token);
console.log("Can decode token:", decodeToken(token));
console.log("Can verify token:", VerifyToken(token));
//# sourceMappingURL=authentication.js.map