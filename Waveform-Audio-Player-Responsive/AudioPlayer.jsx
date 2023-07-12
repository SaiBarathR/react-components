import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import IconButton from "@mui/material/IconButton"
import "./audioPlayer.css"

function PlayIcon() {
    return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.32478 11.5C5.03192 11.5 5.61049 10.9214 5.61049 10.2143V3.78571C5.61049 3.07857 5.03192 2.5 4.32478 2.5C3.61763 2.5 3.03906 3.07857 3.03906 3.78571V10.2143C3.03906 10.9214 3.61763 11.5 4.32478 11.5ZM8.18192 3.78571V10.2143C8.18192 10.9214 8.76049 11.5 9.46763 11.5C10.1748 11.5 10.7533 10.9214 10.7533 10.2143V3.78571C10.7533 3.07857 10.1748 2.5 9.46763 2.5C8.76049 2.5 8.18192 3.07857 8.18192 3.78571Z" fill="#536580" />
    </svg>
}

function PauseIcon() {
    return <svg width="14" height="14" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4L-3.26266e-07 7.4641L-2.34249e-08 0.535898L6 4Z" fill="#536580" />
    </svg>
}

export default function OzTbAudioPlayer({ audio }) {
    const containerRef = useRef();
    const waveSurferRef = useRef({
        isPlaying: () => false,
    });
    const [isPlaying, toggleIsPlaying] = useState(false);
    const [currentAudioTime, setCurrentAudioTime] = useState("00:00")

    useEffect(() => {
        try {
            const waveSurfer = WaveSurfer.create({
                container: containerRef.current,
                waveColor: '#FFFFFF4D',
                barWidth: 1,
                fillParent: true,
                barMinHeight: 1,
                cursorColor: "transparent",
                backend: 'WebAudio',
                progressColor: '#FFFFFF',
                responsive: true,
                backgroundColor: "#3D8BF8",
                cursorWidth: 0,
                height: 32,
                barGap: 2,
            });
            function setAudioDurationTime() {
                if (waveSurfer.isPlaying()) {
                    const seconds = Number(waveSurfer.getCurrentTime().toFixed(1));
                    if (Number.isInteger(seconds)) {
                        const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
                        const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
                        setCurrentAudioTime(`${minutes}:${remainingSeconds}`)
                    }
                }
            }
            waveSurfer.load(audio);
            waveSurfer.on('ready', () => {
                waveSurferRef.current = waveSurfer;
            });
            waveSurfer.on('audioprocess', function () {
                setAudioDurationTime();
            });
            waveSurfer.on('interaction', () => {
                setAudioDurationTime();
            });
            waveSurfer.on('finish', () => {
                toggleIsPlaying(waveSurferRef.current.isPlaying());
            });
            return () => {
                waveSurfer.destroy();
            };
        } catch (error) {
            console.error(error);
        }
    }, [audio]);

    return (
        <div className='oz-tb-audio-player-container' >
            <IconButton
                onClick={() => {
                    waveSurferRef.current.playPause();
                    toggleIsPlaying(waveSurferRef.current.isPlaying());
                }}
                className='oz-tb-audio-player-audio-buttons'
            >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <label className='ob-tb-audio-player-current-time'>{currentAudioTime}</label>
            <div className='oz-tb-audio-player-waveform-parent-container' >
                <div id='waveform' className='oz-tb-audio-player-waveform-container' ref={containerRef} />
            </div>
        </div >
    );
};
