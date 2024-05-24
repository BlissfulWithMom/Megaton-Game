import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import sequelize from "./db";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    this.syncDatabase();
    new Routes(app);
  }

  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8080"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private async syncDatabase(): Promise<void> {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  }
}
