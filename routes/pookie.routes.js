import { Router } from "express";

const pookieRouter = Router();

pookieRouter.get("/love", (req, res) => {
  res.send("Pookie Baby Love You 💖💖💖💖💖💖");
});

export default pookieRouter;
