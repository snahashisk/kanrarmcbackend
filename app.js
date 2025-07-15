import express from "express";

import { PORT } from "./config/env.js";

import statsRouter from "./routes/stats.routes.js";
import pookieRouter from "./routes/pookie.routes.js";

const app = express();

app.use("/api/v1/stats", statsRouter);
app.use("/api/v1/pookie", pookieRouter);

app.get("/", (req, res) => {
  res.send(
    "This is KanrarMC Website Backend Working in Progress: www.kanrarmc.net"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT = ${PORT}`);
});

export default app;
