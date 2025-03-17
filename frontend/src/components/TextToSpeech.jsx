import React, { useState, useEffect, useRef } from 'react';

const TextToSpeech = ({ text }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const synthRef = useRef(window.speechSynthesis);
    const utteranceRef = useRef(null);

    useEffect(() => {
        // Initialize the utterance
        utteranceRef.current = new SpeechSynthesisUtterance(text);

        // Set up event handlers
        utteranceRef.current.onend = () => {
            setIsPlaying(false);
            setIsPaused(false);
        };

        return () => {
            // Clean up: cancel speech synthesis if component unmounts
            synthRef.current.cancel();
        };
    }, [text]);

    const handlePlay = () => {
        if (isPaused) {
            // Resume if paused
            synthRef.current.resume();
            setIsPaused(false);
        } else {
            // Start new speech
            synthRef.current.speak(utteranceRef.current);
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        synthRef.current.pause();
        setIsPaused(true);
        setIsPlaying(false);
    };

    const handleStop = () => {
        synthRef.current.cancel();
        setIsPlaying(false);
        setIsPaused(false);
    };

    return (
        <div>
            <button onClick={handlePlay} disabled={isPlaying}>
                {isPaused ? 'Resume' : 'Play'}
            </button>
            <button onClick={handlePause} disabled={!isPlaying || isPaused}>
                Pause
            </button>
            <button onClick={handleStop} disabled={!isPlaying && !isPaused}>
                Stop
            </button>
        </div>
    );
};

export default TextToSpeech;
