import cors from "cors";
import express, { type Express } from "express";

import { env } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { healthRouter } from "./routes/health-route.js";
import { researchRouter } from "./routes/research-route.js";

export function createApp(): Express {
  const app = express();

  const corsOrigin = env.CORS_ORIGIN;

  app.disable("x-powered-by");
  app.use(
    cors({
      origin: corsOrigin,
      credentials: true,
    })
  );
  app.use(express.json({ limit: "1mb" }));

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      service: "competitor-intelligence",
    });
  });

  app.use("/api/health", healthRouter);
  app.use("/api/research", researchRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
