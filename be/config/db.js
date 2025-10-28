import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://admin:wM%3F%237995@10.62.169.176:27017/?tls=false&authSource=admin", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
