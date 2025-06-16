import admin from "../../config/firebaseAdmin.js";
import User from "../../models/UserAuth/User.js";
import Company from "../../models/company/Company.js";

export const createUser = async (req, res) => {
  try {
    const { firebase_id, full_name, email, role, company_id } = req.body;

    if (!firebase_id || !full_name || !email || !role) {
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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firebase_id, full_name, email, role, company_id } = req.body;

    if (!firebase_id || !full_name || !email || !role || !company_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update fields
    user.firebase_id = firebase_id;
    user.full_name = full_name;
    user.email = email;
    user.role = role;
    user.company_id = company_id;

    await user.save();

    // Fetch the user again with the associated company
    const updatedUser = await User.findByPk(id, {
      include: { model: Company, required: true },
    });

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        firebase_id: updatedUser.firebase_id,
        full_name: updatedUser.full_name,
        email: updatedUser.email,
        role: updatedUser.role,
        company: updatedUser.Company, // Manual renaming to 'company'
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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Get currently logged-in user's email from token (assuming you have auth middleware)
    const currentUserEmail = req.user?.email; // or however you're decoding the token

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent self-deletion
    if (user.email === currentUserEmail) {
      return res
        .status(403)
        .json({ error: "You cannot delete yourself while logged in" });
    }

    // Delete from DB
    await user.destroy();

    // Delete from Firebase
    try {
      if (user.firebase_id) {
        await admin.auth().deleteUser(user.firebase_id);
      } else {
        const fbUser = await admin.auth().getUserByEmail(user.email);
        await admin.auth().deleteUser(fbUser.uid);
      }
    } catch (firebaseError) {
      console.warn(
        "Deleted from DB but failed to delete from Firebase:",
        firebaseError.message
      );
    }

    res.status(200).json({ message: "User deleted from DB and Firebase" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        firebase_id: user.firebase_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
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

export const getUserByRole = async (req, res) => {
  try {
    const { role } = req.query;

    const users = await User.findAll({
      where: { role },
      include: {
        model: Company,
        required: false, // ✅ Includes users with or without company
      },
    });

    res.status(200).json({
      users: users.map((user) => ({
        id: user.id,
        firebase_id: user.firebase_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        company: user.Company || null,
      })),
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};

export const getUserByFirebaseId = async (req, res) => {
  try {
    const { firebase_id } = req.params;

    const user = await User.findOne({ where: { firebase_id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      user: {
        id: user.id,
        firebase_id: user.firebase_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        company_id: user.company_id,
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
