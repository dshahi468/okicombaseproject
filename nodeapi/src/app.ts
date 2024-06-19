import express from 'express'
import { Application } from 'express'

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middlewares: any; controllers: any }) {
    this.app = express()
    this.port = appInit.port
    this.middlewares(appInit.middlewares)
    this.routes(appInit.controllers)
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App has started on port:${this.port}`)
    })
  }

  private middlewares(middlewares: any) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware)
    })
  }

  private routes(contorllers: any) {
    contorllers.forEach((controller) => {
      this.app.use(controller.path, controller.router)
    })
  }
}

export default App
