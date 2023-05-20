const fs = require("fs");
const csv = require("fast-csv");
const service = require("../services/compoundService");

//retrive all compounds with pagination
const getAllCompounds = async (req, res) => {
  try {
    const page = req.query.page ? +req.query.page : 1;
    const size = req.query.size ? +req.query.size : 10;
    const condition = {
      limit: size,
      offset: (page - 1) * size,
    };
    const result = await service.getAllCompounds(condition);
    res.status(201).json({
      status: "success",
      message: "Compounds Fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message || "Error occured while fetching all compounds!.",
    });
  }
};

// get compound details for specific id
const getCompoundById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Id is required!");
    }
    const result = await service.getCompoundById(id);
    if (result) {
      res.status(201).json({
        status: "success",
        message: "Compounds Fetched",
        data: [result],
      });
    } else {
      res
        .status(404)
        .json({
          status: "ERROR",
          message: `Compound not found with id=${id}.`,
        });
    }
  } catch (error) {
    res.status(500).json({
      status: "ERROR",
      message: error.message || "Error occured while fetching a compound!",
    });
  }
};

// update compound details for specific id
const updateCompound = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id is required!");
    }

    const updatedCompound = { ...req.body };
    updatedCompound.dateModified = new Date();
    const condition = {
      where: { id },
    };
    const result = await service.updateCompound(updatedCompound, condition);
    if (result[0] > 0) {
      res
        .status(201)
        .json({
          status: "Success",
          message: "Compound was updated successfully!",
        });
    } else {
      res.status(404).json({ status: "Error", message: `No compound found!` });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: "Error",
        message: error.message || "Error while updating compound!",
      });
  }
};

// delete compound with specific id
const deleteCompound = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("Id is required!");
    }

    const condition = {
      where: { id },
    };
    const result = await service.deleteCompound(condition);
    if (result > 0) {
      res
        .status(201)
        .json({ status: "Success", message: "Compound deleted successfully!" });
    } else {
      res.status(404).json({ status: "Error", message: "No compound found!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: "Error",
        message: error.message || "Error while deleting compound",
      });
  }
};

const addBulkCompounds = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res
        .status(400)
        .json({ status: "Error", message: "Please upload a CSV file!" });
    }

    let compounds = [];
    let path = `data/${req.file.filename}`;
    fs.createReadStream(path)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error;
      })
      .on("data", (row) => {
        compounds.push({
          id: row.id,
          name: row.CompoundName,
          description: row.CompounrDescription,
          image: row.strImageSource,
          link: row.strImageAttribution,
          dateModified: row.dateModified,
        });
      })
      .on("end", async () => {
        await service.bulkInsertCompounds(compounds);
        res.status(200).json({
          status: "Success",
          message: `Data inserted from file=${req.file.originalname} succesfully!`,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message:
        error.message ||
        `Error while inserting data from ${req.file.originalName}`,
    });
  }
};

module.exports = {
  getAllCompounds,
  getCompoundById,
  updateCompound,
  deleteCompound,
  addBulkCompounds,
};
