import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onMoodDetected = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState("Waiting");
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let activeLandmarker = null;
        let activeStream = null;

        async function setupCamera() {
            try {
                await init({ landmarkerRef, videoRef, streamRef });
                activeLandmarker = landmarkerRef.current;
                activeStream = streamRef.current;
                setIsCameraReady(true);
            } catch (err) {
                console.log(err);
                setError("Camera access is needed to detect your expression.");
            }
        }

        setupCamera();

        return () => {
            if (activeLandmarker) {
                activeLandmarker.close();
            }

            if (activeStream) {
                activeStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        const detectedExpression = detect({ landmarkerRef, videoRef, setExpression });

        if (detectedExpression) {
            onMoodDetected(detectedExpression);
        }
    }


    return (
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            <div className="relative aspect-[4/3] bg-slate-950">
                <video
                    ref={videoRef}
                    className="h-full w-full object-cover"
                    playsInline
                    muted
                />

                {!isCameraReady && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-sm font-semibold text-white">
                        Starting camera...
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950 px-6 text-center text-sm font-semibold text-white">
                        {error}
                    </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                    Live camera
                </div>
            </div>

            <div className="space-y-5 p-5">
                <div>
                    <p className="text-sm font-semibold text-slate-500">
                        Detected expression
                    </p>
                    <h2 className="mt-1 text-3xl font-bold capitalize text-slate-950">
                        {expression}
                    </h2>
                </div>

                <button
                    type="button"
                    onClick={handleClick}
                    disabled={!isCameraReady}
                    className="w-full rounded-full bg-[#7F265B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#68204b] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                    Detect expression
                </button>
            </div>
        </section>
    );
}
