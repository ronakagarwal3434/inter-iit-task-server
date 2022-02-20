const mongoose = require("mongoose");
var url = process.env.DB || "mongodb://127.0.0.1:27017/Task";

mongoose
    .connect(url, {
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log("DB connection error", err));
