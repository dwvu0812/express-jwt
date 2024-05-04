import express from "express";
import { studentController } from "../controllers/index.js";

const router = express.Router();

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);

// put or patch
router.patch("/:id", studentController.updateStudent);

router.post("/insert", studentController.insertStudent);
// router.post("/insertFakeStudents", studentController.insertFakeStudents);

export default router;
