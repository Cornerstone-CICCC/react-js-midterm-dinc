import express from "express";
import sampleRoute from "./routes/sampleRoute";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", sampleRoute);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
