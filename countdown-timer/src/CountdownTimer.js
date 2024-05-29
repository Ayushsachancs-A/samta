import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
        if (totalSeconds > 0) {
            setTimeLeft(totalSeconds);
            setIsActive(true);
        } else {
            alert('Please set a time greater than 0');
        }
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <div className="timer-container">
            <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutes"
                min="0"
                disabled={isActive}
            />
            <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Seconds"
                min="0"
                max="59"
                disabled={isActive}
            />
            <button onClick={handleStart} disabled={isActive}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <div id="countdown-display">{formatTime(timeLeft)}</div>
        </div>
    );
};

export default CountdownTimer;