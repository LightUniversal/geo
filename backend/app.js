import path from "path";
import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./Middlewares/errorHandler.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config(); //Configure the .env

connectDB(); // Connect to mongodb database
// create an express app
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);


// make the upload folder accessible/static folder
const __dirname = path.resolve(); // set the current directory to be __dirname
app.use("/backend/public", express.static(path.join(__dirname, "backend/public"))); 

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  // get requests
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// get requests
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

// Listen to port
const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log("Port started on " + port);
});
