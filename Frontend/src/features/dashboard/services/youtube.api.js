const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

const getVideoId = (item) => {
  if (typeof item.id === "string") return item.id;
  return item.id?.videoId;
};

const cleanText = (value) => {
  const element = document.createElement("textarea");
  element.innerHTML = value || "";
  return element.value;
};

export const fetchMoodTracks = async ({ query, pageToken = "" }) => {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_YOUTUBE_API_KEY");
  }

  const params = new URLSearchParams({
    part: "snippet",
    maxResults: "8",
    q: query,
    type: "video",
    videoCategoryId: "10",
    videoEmbeddable: "true",
    safeSearch: "none",
    key: apiKey,
  });

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Unable to fetch YouTube songs");
  }

  return {
    nextPageToken: data.nextPageToken || "",
    tracks: (data.items || [])
      .map((item) => ({
        id: getVideoId(item),
        title: cleanText(item.snippet?.title),
        artist: cleanText(item.snippet?.channelTitle),
      }))
      .filter((track) => track.id),
  };
};
