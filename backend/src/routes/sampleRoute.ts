import { Router } from "express";
import { sayHello } from "../controllers/sampleController";

const router = Router();

router.get("/", sayHello);

export default router;
