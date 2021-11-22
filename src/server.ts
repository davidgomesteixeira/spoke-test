import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes";

class ExpressServer {
  initServer() {
    const app = express();
    app.use(bodyParser.json());

    Routes.forEach(route => {
      (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
  
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });
  
    const port = process.env.PORT || 3000;
    app.listen(port);
  
    console.log(`Express server has started on port ${port}. Open http://localhost:${port} to see results`);
  }
}

export { ExpressServer };
