import express, { Request, Response } from "express";
import AuthMiddleware from "../middleware/auth.middleware";

class HomeController {
  public path = "/";
  public router = express.Router();
  private authMiddleware = new AuthMiddleware();
  constructor() {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get("/", this.authMiddleware.verifyToken, this.home);
  }

  home(req: Request, res: Response) {
    res.send("success");
  }
}

export default HomeController;
