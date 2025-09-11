import jwt from "jsonwebtoken";
import zod from "zod";
const jwtPassword = "secret";
const userSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
});
function GenerateTokens(username, password) {
    const results = userSchema.safeParse({ username, password });
    if (!results.success) {
        return " user is provides wrong inputs";
    }
    const token = jwt.sign({ username, password }, jwtPassword);
    return token;
}
function forDecodingToken(token) {
    const deCodedToken = jwt.decode(token);
    return deCodedToken;
}
function verifyToken(token) {
    if (!token) {
        return "token is not provide";
    }
    const verifyTokenVar = jwt.verify(token, jwtPassword);
    if (!verifyToken) {
        return false;
    }
    else {
        return true;
    }
}
console.log(GenerateTokens("sr5631080@gmail.com", "test12"));
console.log(forDecodingToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyNTYzMTA4MEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3QxMiIsImlhdCI6MTc1NzYwNDcxMX0.wxilwMkMtHSyIOdiqJIEho3Ec_icniR2cOr-I2XNcuc"));
console.log(verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNyNTYzMTA4MEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InRlc3QxMiIsImlhdCI6MTc1NzYwNDcxMX0.wxilwMkMtHSyIOdiqJIEho3Ec_icniR2cOr-I2XNcuc"));
// function GenerateToken(username:string, password:string) {
// const result = userSchema.safeParse({ username, password });
// console.log(result);
// if (!result.success) {
// return null;
// }
// const token = jwt.sign({ username }, jwtPassword);
// return token;
// }
// function decodeToken(token:any) {
// try {
// const decoded = jwt.decode(token);
// return !!decoded;
// } catch {
// return false;
// }
// }
// function VerifyToken(token:any) {
// try {
// jwt.verify(token, jwtPassword);
// return true;
// } catch {
// return false;
// }
// }
// const token = GenerateToken("akhil@example.com", "mypassword");
// console.log("Generated Token:", token);
// console.log("Can decode token:", decodeToken(token));
// console.log("Can verify token:", VerifyToken(token));
//# sourceMappingURL=authentication.js.map