import express from "express";
import { Application } from "express";
import cors, { CorsOptions } from "cors";

class App {
  public app: Application;
  public port: number;

  private corsOptions: CorsOptions = {
    origin: "http://localhost:3000", // Specify your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  };

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express();
    this.app.use(cors(this.corsOptions));
    this.app.options("*", cors(this.corsOptions));
    this.port = appInit.port;
    this.middlewares(appInit.middlewares);
    this.routes(appInit.controllers);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App has started on port:${this.port}`);
    });
  }

  private middlewares(middlewares: any) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  private routes(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use(controller.path, controller.router);
    });
  }
}

export default App;
