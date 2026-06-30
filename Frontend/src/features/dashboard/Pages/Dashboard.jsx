import { useMemo, useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import { fetchMoodTracks } from "../services/youtube.api";
import { getPlaylistForMood } from "../data/moodPlaylists";

const Dashboard = () => {
    const [detectedMood, setDetectedMood] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [nextPageToken, setNextPageToken] = useState("");
    const [isFetchingSongs, setIsFetchingSongs] = useState(false);
    const [fetchError, setFetchError] = useState("");

    const playlist = useMemo(
        () => getPlaylistForMood(detectedMood),
        [detectedMood]
    );

    const visibleTracks = tracks.length > 0 ? tracks : playlist.tracks;
    const currentTrack = visibleTracks[currentTrackIndex] || visibleTracks[0];
    const hasDetectedMood = Boolean(detectedMood);

    const playerUrl = currentTrack
        ? `https://www.youtube.com/embed/${currentTrack.id}?autoplay=${isPlaying ? 1 : 0}&rel=0&modestbranding=1&playsinline=1`
        : "";

    const appendFetchedTracks = async ({
        targetPlaylist = playlist,
        pageToken = nextPageToken,
        replace = false,
    } = {}) => {
        if (isFetchingSongs) return 0;

        setIsFetchingSongs(true);
        setFetchError("");

        try {
            const data = await fetchMoodTracks({
                query: targetPlaylist.searchQuery,
                pageToken,
            });

            let addedCount = 0;

            setTracks((currentTracks) => {
                const baseTracks = replace ? [] : currentTracks;
                const usedIds = new Set(baseTracks.map((track) => track.id));
                const newTracks = data.tracks.filter((track) => !usedIds.has(track.id));

                addedCount = newTracks.length;
                return [...baseTracks, ...newTracks];
            });

            setNextPageToken(data.nextPageToken);
            return addedCount;
        } catch (err) {
            console.log(err);
            setFetchError("Using fallback songs. Add a YouTube API key for endless recommendations.");
            return 0;
        } finally {
            setIsFetchingSongs(false);
        }
    };

    const handleMoodDetected = (mood) => {
        if (!mood) return;

        const nextPlaylist = getPlaylistForMood(mood);

        setDetectedMood(mood);
        setTracks(nextPlaylist.tracks);
        setCurrentTrackIndex(0);
        setNextPageToken("");
        setIsPlaying(true);
        appendFetchedTracks({ targetPlaylist: nextPlaylist, pageToken: "", replace: true });
    };

    const handleTrackSelect = (index) => {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
    };

    const handlePrevious = () => {
        setCurrentTrackIndex((index) =>
            index === 0 ? visibleTracks.length - 1 : index - 1
        );
        setIsPlaying(true);
    };

    const handleNext = async () => {
        setIsPlaying(true);

        if (currentTrackIndex < visibleTracks.length - 1) {
            const nextIndex = currentTrackIndex + 1;
            setCurrentTrackIndex(nextIndex);

            if (hasDetectedMood && nextIndex >= visibleTracks.length - 2) {
                appendFetchedTracks();
            }

            return;
        }

        const addedCount = hasDetectedMood ? await appendFetchedTracks() : 0;

        if (addedCount > 0) {
            setCurrentTrackIndex((index) => index + 1);
            return;
        }

        setCurrentTrackIndex(0);
    };

    return (
        <main className="min-h-screen bg-[#f6f7fb] pb-28 text-slate-950 md:pb-32">
            <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7F265B]">
                        VibeSync
                    </p>
                    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-950 md:text-5xl">
                                Mood-based music player
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
                                Detect your expression and get a fresh mood-based queue that keeps adding songs as you listen.
                            </p>
                        </div>
                        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                            Current mood:{" "}
                            <span className="text-[#7F265B]">
                                {hasDetectedMood ? playlist.label : "Waiting"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(320px,420px)_1fr]">
                    <FaceExpression onMoodDetected={handleMoodDetected} />

                    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                        <div className={`h-2 bg-gradient-to-r ${playlist.accent}`} />
                        <div className="p-5 sm:p-6">
                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <p className="text-sm font-semibold text-slate-500">
                                        Recommended queue
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold text-slate-950">
                                        {hasDetectedMood ? `${playlist.label} mood` : "Detect your mood first"}
                                    </h2>
                                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                                        {hasDetectedMood
                                            ? playlist.description
                                            : "Click detect expression to build a playlist around your current expression."}
                                    </p>
                                    {fetchError && (
                                        <p className="mt-2 text-sm font-medium text-amber-700">
                                            {fetchError}
                                        </p>
                                    )}
                                </div>
                                {hasDetectedMood && (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-full rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7F265B] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                                        disabled={isFetchingSongs && currentTrackIndex === visibleTracks.length - 1}
                                    >
                                        {isFetchingSongs ? "Finding songs..." : "Play next"}
                                    </button>
                                )}
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                                {!hasDetectedMood && (
                                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-500 md:col-span-2 xl:col-span-3">
                                        Your personalized playlist will appear here after expression detection.
                                    </div>
                                )}

                                {hasDetectedMood && visibleTracks.map((track, index) => {
                                    const isActive = currentTrack?.id === track.id;

                                    return (
                                        <button
                                            type="button"
                                            key={`${track.id}-${index}`}
                                            onClick={() => handleTrackSelect(index)}
                                            className={`group overflow-hidden rounded-2xl border bg-white text-left transition hover:-translate-y-1 hover:shadow-lg ${
                                                isActive
                                                    ? "border-[#7F265B] shadow-md"
                                                    : "border-slate-200"
                                            }`}
                                        >
                                            <div className="relative aspect-video overflow-hidden bg-slate-200">
                                                <img
                                                    src={`https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`}
                                                    alt={track.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xs font-bold text-slate-950">
                                                    {isActive && isPlaying ? "II" : "Play"}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="line-clamp-1 font-bold text-slate-950">
                                                    {track.title}
                                                </h3>
                                                <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                                                    {track.artist}
                                                </p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            {hasDetectedMood && currentTrack && (
                <section className="fixed inset-x-0 bottom-0 z-30 border-t border-white/20 bg-slate-900/95 text-white shadow-2xl backdrop-blur">
                    <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-3 py-2 sm:px-5 md:gap-4 md:py-3 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3 md:gap-4">
                            <img
                                src={`https://i.ytimg.com/vi/${currentTrack.id}/mqdefault.jpg`}
                                alt={currentTrack.title}
                                className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-white/10 sm:h-14 sm:w-20 md:h-16 md:w-24 md:rounded-xl"
                            />
                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-bold sm:text-base">
                                    {currentTrack.title}
                                </h3>
                                <p className="truncate text-xs text-slate-300 sm:text-sm">
                                    {currentTrack.artist}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 md:justify-center md:gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[10px] font-black transition hover:bg-white/20 sm:h-10 sm:w-10 md:h-11 md:w-11"
                                aria-label="Previous track"
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsPlaying((value) => !value)}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ff5b2e] text-[10px] font-black text-white transition hover:bg-[#ff734d] sm:h-11 sm:w-11 md:h-12 md:w-12"
                                aria-label={isPlaying ? "Pause track" : "Play track"}
                            >
                                {isPlaying ? "II" : "Play"}
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[10px] font-black transition hover:bg-white/20 sm:h-10 sm:w-10 md:h-11 md:w-11"
                                aria-label="Next track"
                            >
                                Next
                            </button>
                        </div>

                        {isPlaying && (
                            <iframe
                                key={currentTrack.id}
                                className="pointer-events-none fixed bottom-0 right-0 h-px w-px opacity-0"
                                src={playerUrl}
                                title={`${currentTrack.title} YouTube player`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        )}
                    </div>
                </section>
            )}
        </main>
    );
};

export default Dashboard;
