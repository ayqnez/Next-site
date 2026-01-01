"use client";

import styles from "./styles.module.css";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Tabs, { TabsProps } from "./Tabs";

import { getDataPhoto, connectEmotionWS, sendFrameToWS, disconnectEmotionWS, saveEmotionResult } from "./apiClient";

export default function EmotionStream() {
    const [mode, setMode] = useState<TabsProps>("photo");
    const [active, setActive] = useState(true);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [emotion, setEmotion] = useState<string | null>(null);
    const [probs, setProbs] = useState<Record<string, number> | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const intervalRef = useRef<any>(null);

    const handleFile = (e: any) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image || mode !== "photo") return;

        const formData = new FormData();
        formData.append("file", image);

        const res = await getDataPhoto("predict", formData);
        setEmotion(res.emotion);
        setProbs(res.probabilities);
    };

    const startRealtime = async () => {
        if (!videoRef.current) return;

        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;

        connectEmotionWS((data) => {
            setEmotion(data.emotion);
            setProbs(data.probabilities);
        });
        setActive(true);

        intervalRef.current = setInterval(sendFrame, 200);
    };

    const stopRealtime = () => {
        intervalRef.current && clearInterval(intervalRef.current);
        disconnectEmotionWS();
        setActive(false);

        const stream = videoRef.current?.srcObject as MediaStream;
        stream?.getTracks().forEach((t) => t.stop());
    };

    const sendFrame = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 48;
        canvas.height = 48;

        ctx.drawImage(videoRef.current, 0, 0, 48, 48);
        const base64 = canvas.toDataURL("image/jpeg", 0.6);

        sendFrameToWS(base64);
    };


    useEffect(() => {
        setEmotion(null);
        setProbs(null);

        if (mode === "realtime") {
            startRealtime();
        } else {
            stopRealtime();
        }

        return stopRealtime;
    }, [mode]);

    const handleSaveEmotion = async () => {
        if (!emotion || !probs) return;

        try {
            await saveEmotionResult({
                dominantEmotion: emotion.toUpperCase(),
                probabilities: probs,
            });

            alert("Emotion saved");

        } catch (error: any) {
            if (error.response?.status === 403) {
                alert("You need to login");
            } else {
                alert("Failed to save emotion");
            }
        }
    };

    return (
        <div className={clsx("bs-flex-container l", "bg-light-grey", styles.wrapper)}>
            <h1 className={styles.title}>
                Emotion Recognize {mode === "photo" ? "by Photo" : "by Realtime"}
            </h1>

            <Tabs value={mode} onChange={setMode} />

            <div className={styles.container}>
                {mode === "photo" && (
                    <div className={styles.inputContainer}>
                        <input
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className={styles.input}
                        />

                        <div className={styles.buttons}>
                            <label
                                htmlFor="file-input"
                                className="button bg-purple color-white"
                            >
                                Select Photo
                            </label>

                            <button
                                onClick={handleUpload}
                                className="button bg-white color-purple"
                            >
                                Recognize Emotion
                            </button>
                        </div>

                        {preview && (
                            <img
                                src={preview}
                                alt="preview"
                                style={{
                                    width: 400,
                                    borderRadius: 10,
                                    marginTop: 20,
                                }}
                            />
                        )}
                    </div>
                )}

                {mode === "realtime" && (
                    <div className={styles.inputContainer}>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            style={{ width: 400, borderRadius: 10 }}
                        />
                        <canvas ref={canvasRef} style={{ display: "none" }} />

                        <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
                            {active ? (
                                <>
                                    <button
                                        onClick={stopRealtime}
                                        className="button bg-white color-purple"
                                    >
                                        Stop realtime
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={startRealtime}
                                        className="button bg-white color-purple"
                                    >
                                        Start realtime
                                    </button>

                                    <button
                                        onClick={handleSaveEmotion}
                                        className="button bg-purple color-white"
                                    >
                                        Save emotions
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className={styles.emotionContainer}>
                    {emotion && <h2>Emotion: <b>{emotion}</b></h2>}

                    {probs && (
                        <div style={{ width: 300 }}>
                            <h3>Probabilities</h3>
                            {Object.entries(probs).map(([name, value]) => (
                                <div key={name} style={{ marginBottom: 8 }}>
                                    <b>{name}</b> — {(value * 100).toFixed(2)}%
                                    <div style={{
                                        height: 8,
                                        background: "#ddd",
                                        borderRadius: 4
                                    }}>
                                        <div style={{
                                            width: `${value * 100}%`,
                                            height: "100%",
                                            background: "#4f46e5"
                                        }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
