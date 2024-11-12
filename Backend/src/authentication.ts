import { Context, Next } from "hono"
import { verify } from "hono/jwt"

interface dec {
    userID:string,
    password:string,
    email:string
}
export const AuthMiddleware = async (c: Context, next: Next) => {
    const authHeader = c.req.header("Authorization") || "";
    console.log("Authorization Header:", authHeader); // Add this line

    try {
        const decoded = await verify(authHeader, c.env.JWT_SECRET);

        const response = {
            userID: decoded.userID,
            password: decoded.password,
            email: decoded.email
        } as dec;

        if (response) {
            c.set("userID", response.userID);
            c.set("password", response.password);
            c.set("email", response.email);
            await next();
        } else {
            c.status(401);
            return c.json({
                msg: "Unauthorized",
                msg2: "Invalid token"
            });
        }
    } catch (error) {
        console.error("Token Verification Error:", error); 
        c.status(401);
        return c.json({
            msg: "Unauthorized",
            msg2: "Token verification failed"
        });
    }
};
