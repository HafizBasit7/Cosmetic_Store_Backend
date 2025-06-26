const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const handleLoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  console.log(admin)
  if (!admin) return res.status(401).json({ message: 'Admin not found' });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: 'Invalid password' });

  const token = jwt.sign(
    { id: admin._id,
     role: admin.role },
     process.env.JWT_SECRET_KEY,
    {   expiresIn: process.env.EXPRIE_DAY,
 });
  res.json({ token }
  );

};


const getProfile = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select('-password');
  res.json(admin);
};
module.exports ={ handleLoginAdmin,getProfile}