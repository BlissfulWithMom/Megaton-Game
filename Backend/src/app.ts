import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import Routes from "./routes";
import sequelize from "./db";

export class Server {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.config();
    this.initializeServer();
  }

  private config(): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8080"
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private async initializeServer(): Promise<void> {
    try {
      await this.syncDatabase();
      new Routes(this.app);
    } catch (error) {
      console.error("Error initializing server:", error);
    }
  }

  private async syncDatabase(): Promise<void> {
    try {
      await sequelize.sync();
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  }
}
