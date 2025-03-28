const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// API Đăng ký tài khoản
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra nếu user đã tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email đã được sử dụng" });
    }

    // Tạo user mới
    const user = await User.create({ name, email, password });

    // Trả về thông tin user (không trả password)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Đăng ký thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});


// API Đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra user có tồn tại không
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu không đúng" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
      message: "Đăng nhập thành công!",
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;