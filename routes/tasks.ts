import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ success: true, data: [] });
});

export default router;
