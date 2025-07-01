const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const handleLoginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  console.log(admin);
  if (!admin) return res.status(401).json({ message: "Admin not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.EXPRIE_DAY }
  );
  res.json({ token });
};
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // You should get this from auth middleware

    const user = await Admin.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Update Password Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while updating password",
    });
  }
};

const getProfile = async (req, res) => {
  const admin = await Admin.findById(req.user.id).select("-password");
  res.json(admin);
};
module.exports = { handleLoginAdmin, getProfile, updatePassword };
