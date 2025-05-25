import express from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  updateCompany,
} from "../controllers/Company/company.controller.js";

const router = express.Router();

router.post("/create", createCompany);
router.put("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);
router.get("/getAll", getAllCompanies);

export default router;
