const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDb = require("./configs/mongoose-connection");
const cors = require("cors");

connectDb();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests. Please try again later."
    },
});
app.use(limiter);

// Security Policy
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
            imgSrc: ["'self'", "https://res.cloudinary.com"],
            mediaSrc: ["'self'", "https://res.cloudinary.com"],
        },
    })
);

// // Force www redirect
// app.use((req, res, next) => {
//     const host = req.headers.host?.split(':')[0];
//     if (host === 'manjushamann.com') {
//         return res.redirect(301, 'https://www.manjushamann.com' + req.url);
//     }
//     next();
// });

const indexRouter = require("./routes/indexRouter");
const adminRouter = require("./routes/adminRouter");

// API Routes
app.get("/", function (req, res) {
    res.send("hey");
});
app.use("/api/dashboard", indexRouter);
app.use("/api/admin", adminRouter);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "API route not found!" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
