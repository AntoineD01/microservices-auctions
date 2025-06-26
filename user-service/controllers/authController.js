const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({ name, email, passwordHash });
  await user.save();
  res.status(201).send('User registered');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
  res.json({ token });
};
