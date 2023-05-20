const express = require("express");
const router = express.Router();
const {addBulkCompounds,getAllCompounds,getCompoundById,deleteCompound,updateCompound} = require("../controllers/compoundController");
const fileHandler = require("../middlewares/fileUpload");
const compoundValidation = require('../middlewares/validators/updateValidation')
router

// Get all compounds with pagination
.get("/", getAllCompounds)

// Retrieve a single Compound with id
.get("/:id", getCompoundById)

// Update a Compound with id
.patch("/:id", compoundValidation, updateCompound)

// Delete a Compound with id
.delete("/:id", deleteCompound)

// Bulk creation of Compounds
.post("/upload",fileHandler.single('file'), addBulkCompounds)

module.exports = router;