import { Router } from "express";

import { createResearch } from "../controllers/research-controller.js";

export const researchRouter = Router();

researchRouter.post("/", createResearch);
