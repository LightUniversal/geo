import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import products from "./data/product.js";
import users from "./data/user.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  // every mongoose method returns a promise
  try {
    await User.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed!");
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      };
    });
    
    await Product.insertMany(sampleProducts);

    console.log("Data Imported");
    // process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  // every mongoose method returns a promise
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
