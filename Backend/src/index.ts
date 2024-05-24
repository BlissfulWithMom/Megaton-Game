import express, { Application } from "express";
import { Server } from "./app";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const HOST: string = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, function () {
  console.log(`Server is running on port ${PORT}.`);
}).on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    console.log("Error: address already in use");
  } else {
    console.log(err);
  }
});
