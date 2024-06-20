import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import dotenv from "dotenv";

dotenv.config();

class AuthMiddleware {
  private client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`,
  });

  private getKey(header: any, callback: any) {
    this.client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key?.getPublicKey();
      callback(err, signingKey);
    });
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send({ message: "No token provided." });
    }

    const bearerToken = token.split(" ")[1];
    jwt.verify(
      bearerToken,
      this.getKey.bind(this),
      {
        algorithms: ["RS256"],
      },
      (err: any, decoded: any) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Failed to authenticate token." });
        }
        // Add user information to request for use in protected routes
        (req as any).user = decoded;
        next();
      }
    );
  }
}

export default AuthMiddleware;
