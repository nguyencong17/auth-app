const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Danh sách các domain được phép truy cập API
const allowedOrigins = [
  "http://localhost:5173",  // React frontend chạy local
];

// Cấu hình CORS để chỉ cho phép các domain trên
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // ✅ Cho phép truy cập nếu domain hợp lệ
    } else {
      callback(new Error("Not allowed by CORS")); // ❌ Chặn domain không hợp lệ
    }
  },
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Nếu dùng cookies hoặc JWT token
};

app.use(cors(corsOptions));

app.use(express.json()); // Middleware để đọc JSON từ request body

// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Một route test API
app.get("/api/test", (req, res) => {
  res.json({ message: "API đang chạy và CORS đã được cấu hình!" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));