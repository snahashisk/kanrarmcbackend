import { Router } from "express";

const statsRouter = Router();

statsRouter.get("/stats", (req, res) => {
  res.send(
    "Get Player Stats from Here. This endpoint will be used to fetch player statistics from the minecraft server database directly and will be showed in the website."
  );
});

export default statsRouter;
