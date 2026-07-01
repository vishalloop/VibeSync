import express from "express";
import config from "../config/config.js";

const youtubeRouter = express.Router();

youtubeRouter.get("/search", async (req, res, next) => {
    try {
        const { query, pageToken = "" } = req.query;

        if (!query) {
            return res.status(400).json({
                message: "Query is required"
            });
        }

        const params = new URLSearchParams({
            part: "snippet",
            maxResults: "8",
            q: query,
            type: "video",
            videoCategoryId: "10",
            videoEmbeddable: "true",
            safeSearch: "none",
            key: config.YOUTUBE_API_KEY,
        });

        if (pageToken) {
            params.set("pageToken", pageToken);
        }

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                message: data.error?.message || "Unable to fetch YouTube songs"
            });
        }

        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

export default youtubeRouter;