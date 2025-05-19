import User from "../../models/UserAuth/User.js";
import db from "../../models/db.js";

export const createUser = async (req, res) => {
  try {
    const { firebase_id, full_name, email, role, company_id } = req.body;

    if (!firebase_id || !full_name || !email || !company_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUser = await User.create({
      firebase_id,
      full_name,
      email,
      role,
      company_id,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        firebase_id: newUser.firebase_id,
        full_name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company_id: newUser.company_id,
      },
    });
  } catch (error) {
    console.error("Detailed error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Email already exists" });
    }

    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
