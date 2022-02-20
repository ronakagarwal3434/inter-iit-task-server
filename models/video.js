const mongoose = require("mongoose");

const videoBody = {
    link: {
        type: String,
        unique: true,
    },
    nextPageToken: {
        type: String,
    },
};

const videoSchema = mongoose.Schema(videoBody, { timestamps: true });

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
