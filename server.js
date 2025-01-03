const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { swaggerUi, swaggerSpec } = require("./swagger");
const booksRoutes = require("./routes/books");

dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON payloads

// Swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/books", booksRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
