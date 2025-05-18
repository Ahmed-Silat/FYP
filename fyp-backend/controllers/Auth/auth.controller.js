import User from '../../models/UserAuth/user.js';
import db from '../../models/db.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Test if User model is properly connected
    console.log(User === db.models.User); // Should be true

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Detailed error:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }

    res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
};