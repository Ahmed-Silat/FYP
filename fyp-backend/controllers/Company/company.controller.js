import Company from "../../models/company/Company.js";

export const createCompany = async (req, res) => {
  try {
    const { company_name } = req.body;

    if (!company_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const isCompanyExists = await Company.findOne({
      where: {
        company_name,
      },
    });

    if (isCompanyExists) {
      return res.status(400).json({ error: "Company already exists" });
    }

    const newCompany = await Company.create({
      company_name,
    });

    await newCompany.save();

    res.status(201).json({
      message: "Company created successfully",
      company: {
        id: newCompany.id,
        company_name: newCompany.company_name,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Company already exists" });
    }

    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name } = req.body;

    if (!company_name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    company.company_name = company_name;
    await company.save();

    res.status(200).json({
      message: "Company updated successfully",
      company: {
        id: company.id,
        company_name: company.company_name,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByPk(id);

    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }

    await company.destroy();

    res.status(200).json({
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();

    if (!companies) {
      return res.status(404).json({ error: "No companies found" });
    }

    res.status(200).json({
      message: "Companies retrieved successfully",
      companies,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
