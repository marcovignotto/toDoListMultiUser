import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, data: [] });
  } catch (error) {
    return next({
      status: 404,
      success: false,
      error: "Not able to get the requested data!",
    });
  }
});

export default router;
