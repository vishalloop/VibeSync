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
  const params = new URLSearchParams({ query });

  if (pageToken) {
    params.set("pageToken", pageToken);
  }

  const response = await fetch(`/api/youtube/search?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch YouTube songs");
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