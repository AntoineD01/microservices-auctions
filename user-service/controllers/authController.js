const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('Register endpoint hit');
    console.log('Request body:', req.body);

    const { name, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Password hashed');

    const user = new User({ name, email, passwordHash });
    await user.save();
    console.log('User saved to database');

    res.status(201).send('User registered');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Registration failed');
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Login endpoint hit');
    console.log('Request body:', req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      console.log('Invalid credentials');
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
    console.log('Token generated');

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Login failed');
  }
};
