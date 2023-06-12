//server.js
const express = require("express");
const app = express();
const cors = require("cors");
const scraper = require("./scraper");

app.use(cors());

app.get("/api/cars", async (req, res) => {
    try {
        const cars = await scraper.getCars();
        res.json(cars);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching data.",
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
