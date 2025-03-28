import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { shortUrl, getOriginalUrl } from './Controllers/Url.js';

dotenv.config(); // Load .env file

const app = express();
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { dbName: "Nodejs_Course" })
    .then(() => console.log("MongoDB Connected..!"))
    .catch((err) => console.log("MongoDB Connection Error:", err));

// Rendering EJS file
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("index.ejs", { shortUrl: null });
});

// Shortening URL logic
app.post('/short', shortUrl);

// Redirect to original URL using short code
app.get('/:shortCode', getOriginalUrl);

const port = process.env.PORT || 1000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
