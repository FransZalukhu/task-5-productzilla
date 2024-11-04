import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api", authRoutes);
app.use("/api", bookRoutes);

export default app;
