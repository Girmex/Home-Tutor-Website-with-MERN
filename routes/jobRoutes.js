import express from "express";
import {
  getJobById,
  getJobs,
  CreateJob,
  DeleteJob,
  UpdateJob,
} from "../controllers/jobController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get( getJobs);
router
  .route("/:id")
  .get(getJobById)
  .delete( protect,DeleteJob)
  .put(protect, UpdateJob);
router.route("/create").post(protect, CreateJob);

export default router;
