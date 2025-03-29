const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ["https://auranews.netlify.app", "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

const NEWS_API_URL = "https://newsapi.org/v2/top-headlines?country=us";

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      `${NEWS_API_URL}&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (response.data.status !== "ok") {
      return res.status(400).json({ error: "Failed to fetch news" });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
