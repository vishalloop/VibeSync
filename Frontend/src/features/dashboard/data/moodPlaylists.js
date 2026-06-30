export const moodPlaylists = {
  happy: {
    label: "Happy",
    description: "Bright, upbeat songs to keep the good energy moving.",
    accent: "from-amber-400 to-rose-500",
    searchQuery: "happy upbeat pop songs official music",
    tracks: [
      {
        id: "ZbZSe6N_BXs",
        title: "Happy",
        artist: "Pharrell Williams",
      },
      {
        id: "OPf0YbXqDm0",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
      },
      {
        id: "ru0K8uYEZWw",
        title: "Can't Stop the Feeling!",
        artist: "Justin Timberlake",
      },
    ],
  },
  sad: {
    label: "Sad",
    description: "Soft songs for slower moments and late-night feelings.",
    accent: "from-sky-500 to-indigo-600",
    searchQuery: "sad emotional songs official music",
    tracks: [
      {
        id: "hLQl3WQQoQ0",
        title: "Someone Like You",
        artist: "Adele",
      },
      {
        id: "RB-RcX5DS5A",
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
      },
      {
        id: "uelHwf8o7_U",
        title: "Love The Way You Lie",
        artist: "Eminem ft. Rihanna",
      },
    ],
  },
  surprised: {
    label: "Surprised",
    description: "High-energy tracks for that sudden spark.",
    accent: "from-fuchsia-500 to-orange-500",
    searchQuery: "energetic surprise party songs official music",
    tracks: [
      {
        id: "fLexgOxsZu0",
        title: "The Lazy Song",
        artist: "Bruno Mars",
      },
      {
        id: "YqeW9_5kURI",
        title: "Lean On",
        artist: "Major Lazer & DJ Snake",
      },
      {
        id: "RgKAFK5djSk",
        title: "See You Again",
        artist: "Wiz Khalifa ft. Charlie Puth",
      },
    ],
  },
  neutral: {
    label: "Neutral",
    description: "Balanced tracks for focus, browsing, and calm listening.",
    accent: "from-emerald-400 to-cyan-600",
    searchQuery: "chill focus music official",
    tracks: [
      {
        id: "jfKfPfyJRdk",
        title: "Lofi Hip Hop Radio",
        artist: "Lofi Girl",
      },
      {
        id: "5qap5aO4i9A",
        title: "Chillhop Radio",
        artist: "Lofi Girl",
      },
      {
        id: "DWcJFNfaw9c",
        title: "Deep Focus",
        artist: "Ambient Study Music",
      },
    ],
  },
};

export const getPlaylistForMood = (mood) => {
  const normalizedMood = mood?.toLowerCase();
  return moodPlaylists[normalizedMood] || moodPlaylists.neutral;
};
