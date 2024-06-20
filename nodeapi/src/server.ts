import App from "./app";
import HomeController from "./controller/home.controller";
import AuthController from "./controller/auth.controller";
import bodyParser from "body-parser";

const app = new App({
  port: 3001,
  controllers: [new HomeController(), new AuthController()],
  middlewares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();
