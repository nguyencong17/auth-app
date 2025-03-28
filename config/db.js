const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // mongoose.connect() → Kết nối đến MongoDB với URI từ .env.
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    // console.log() → Hiển thị thông báo nếu kết nối thành công.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);

    // process.exit(1) → Thoát chương trình nếu kết nối thất bại.
    process.exit(1);
  }
};

module.exports = connectDB;