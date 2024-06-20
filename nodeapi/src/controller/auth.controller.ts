import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import Cognitoservice from "../services/cognito.service";
import multer from "multer";

class AuthController {
  public path = "/auth";
  public router = express.Router();
  private upload = multer();

  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.post(
      "/register",
      this.upload.none(),
      this.validateBody("signup"),
      this.signup
    );
    this.router.post(
      "/login",
      this.upload.none(),
      this.validateBody("signin"),
      this.signin
    );
    this.router.post(
      "/verify-email",
      this.upload.none(),
      this.validateBody("verify"),
      this.verify
    );
    this.router.post(
      "/resend-confirmation-pin",
      this.upload.none(),
      this.validateBody("resend"),
      this.resendpin
    );
    this.router.post(
      "/forgot-password",
      this.upload.none(),
      this.validateBody("forgot"),
      this.forgotpassword
    );
    this.router.post(
      "/confirm-password",
      this.upload.none(),
      this.validateBody("confirmpassword"),
      this.confirmpassword
    );
  }

  async signup(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, name, password } = req.body;
    let userAttr = [];
    userAttr.push({ Name: "email", Value: email });
    userAttr.push({ Name: "name", Value: name });
    const cognito = new Cognitoservice();
    await cognito
      .signUpUser(email, password, userAttr)
      .then((response) => {
        return res.status(200).json({
          message: "Sign up successful",
          result: JSON.stringify(response),
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  async signin(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    const cognito = new Cognitoservice();
    await cognito
      .signInUser(email, password)
      .then((response) => {
        const authResult = response["AuthenticationResult"];
        const accessToken = authResult["AccessToken"] ?? null;
        const idToken = authResult["IdToken"] ?? null;
        const refreshToken = authResult["RefreshToken"] ?? null;
        return res.status(200).json({
          message: "Sign-in successful",
          accessToken: accessToken,
          idToken: idToken,
          refreshToken: refreshToken,
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  async verify(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, verificationPin } = req.body;
    const cognito = new Cognitoservice();
    await cognito
      .verifyUser(email, verificationPin)
      .then((response) => {
        return res.status(200).json({
          message: "Email verified successfully.",
          result: JSON.stringify(response),
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  async resendpin(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email } = req.body;
    const cognito = new Cognitoservice();
    await cognito
      .resendConfirmationCode(email)
      .then((response) => {
        return res.status(200).json({
          message: "Confirmation code resent successfully",
          result: JSON.stringify(response),
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  async forgotpassword(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email } = req.body;
    const cognito = new Cognitoservice();
    await cognito
      .forgotPassword(email)
      .then((response) => {
        return res.status(200).json({
          message: "Password reset code sent successfully.",
          result: JSON.stringify(response),
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  async confirmpassword(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }
    const { email, code, password } = req.body;
    const cognito = new Cognitoservice();
    await cognito
      .confirmForgotPassword(email, code, password)
      .then((response) => {
        return res.status(200).json({
          message: "Password reset successfully.",
          result: JSON.stringify(response),
        });
      })
      .catch((error) => {
        return res.status(400).json({ error: error.message });
      });
  }

  private validateBody(type: string) {
    switch (type) {
      case "signup":
        return [
          body("name").notEmpty().isString(),
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("password").isString().isLength({ min: 8 }),
        ];
      case "signin":
        return [
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("password").isString().isLength({ min: 8 }),
        ];
      case "verify":
        return [
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("verificationPin").isNumeric().isLength({ min: 6, max: 6 }),
        ];
      case "resend":
        return [body("email").notEmpty().normalizeEmail().isEmail()];
      case "forgot":
        return [body("email").notEmpty().normalizeEmail().isEmail()];
      case "confirmpassword":
        return [
          body("email").notEmpty().normalizeEmail().isEmail(),
          body("code").isNumeric().isLength({ min: 6, max: 6 }),
          body("password").isString().isLength({ min: 8 }),
        ];
    }
  }
}

export default AuthController;
