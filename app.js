import express from "express";

import { PORT } from "./config/env.js";

import cors from "cors";

import statsRouter from "./routes/stats.routes.js";
4;

const app = express();
app.use(cors());

app.use("/api/v1/stats", statsRouter);

app.get("/", (req, res) => {
  res.send(
    "This is KanrarMC Website Backend Working in Progress: www.kanrarmc.net"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT = ${PORT}`);
});

export default app;
