const express = require("express");
const cors = require("cors");

const app = express();

const userRouter = require("./routes/user");
const testRouter = require("./routes/test");

const errorHandler = require("./middlewares/error");

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// add cors
app.use(cors());

// Requiring db
const connectDB = require("./config/db");

app.use("/user", userRouter);
app.use("/test", testRouter);

// Error Middleware
app.use(errorHandler);

// connect db
connectDB();

// Start Server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhanlded promise error
process.on("unhandledRejection", (err, response) => {
  console.error(`Error:  ${err.message}`.inverse.red);
  // exit process
  server.close(() => process.exit(1));
});
