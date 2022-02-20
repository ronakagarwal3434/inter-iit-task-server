require("dotenv").config();
const express = require("express");
var axios = require("axios");

const app = express();
require("./config/database");

const Video = require("./models/video");

app.get("/links", async (req, res) => {
    try {
        const lastVideo = await Video.findOne().sort({ _id: -1 }).limit(1);
        var config = {
            method: "get",
            url:
                lastVideo && lastVideo.nextPageToken
                    ? `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&type=video&q=sports&pageToken=${lastVideo.nextPageToken}`
                    : `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.YOUTUBE_API_KEY}&type=video&q=sports`,
            headers: {},
        };

        const response = await axios(config);
        const data = response.data;
        data.items.forEach(async (item) => {
            const video = new Video({
                link: `https://youtu.be/${item.id.videoId}`,
                nextPageToken: data.nextPageToken,
            });
            await video.save();
        });
        res.send(data);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Try Again");
    }
});

app.get("/count", async (req, res) => {
    try {
        const calls = await Video.find().count();
        res.json(calls);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Try Again");
    }
});

app.get("/videolinks/:page", async (req, res) => {
    try {
        const videoLinks = await Video.find()
            .skip((req.params.page - 1) * 5)
            .limit(5)
            .select("link -_id");
        res.send(videoLinks);
    } catch (err) {
        console.log(err);
        res.sendStatus(500).send("Try Again");
    }
});

app.listen(process.env.PORT || 3001, () =>
    console.log("Server is running on port 3001")
);
