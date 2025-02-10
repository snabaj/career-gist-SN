import { Router } from "express";
import favoritesRoutes from "./favorites.js";
import jobsRoutes from "./jobsRoutes.js";
import apiRoutes from "./api/index.js"; // Import the API index file

const router : Router = Router();

router.use("/favorites", favoritesRoutes);
router.use("/jobs", jobsRoutes);
router.use("/", apiRoutes); // Forward API sub-routes

export default router;
