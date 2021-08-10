const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // to access req.body

// Define routes
app.use("/api/student", require("./routes/api/student"));
app.use("/api/class", require("./routes/api/class"));
app.use("/api/society", require("./routes/api/society"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
