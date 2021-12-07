require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const app = express();

// * MongoDB

// * PORT
const PORT: string | undefined = process.env.PORT;

// * Middleware
app.use(express.json({ extended: true }));

// * Routes

// * Swagger UI

// * Set static in prod

// * Page not Found Middleware

// * Listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
