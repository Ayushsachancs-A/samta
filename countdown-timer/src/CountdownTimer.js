import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let timer = null;
        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            clearInterval(timer);
            setIsActive(false);
            setMessage('Time is up!');
        }
        return () => clearInterval(timer);
    }, [isActive, timeLeft]);

    const handleStart = () => {
        if (!isPaused) {
            const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
            if (totalSeconds > 0) {
                setTimeLeft(totalSeconds);
                setIsActive(true);
                setMessage('');
            } else {
                alert('Please set a time greater than 0');
            }
        } else {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    const handleStop = () => {
        setIsActive(false);
        setIsPaused(true);
        setMessage('');
    };

    const handleReset = () => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(0);
        setMinutes(0);
        setSeconds(0);
        setMessage('');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const startButtonStyle = {
        backgroundColor: 'green'
    };

    const stopButtonStyle = {
        backgroundColor: 'red'
    };

    const reset={
        backgroundColor:'blue'
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
            <button onClick={handleStart} disabled={isActive} style={startButtonStyle}>Start</button>
            <button onClick={handleStop} style={stopButtonStyle}>Stop</button>
            <button onClick={handleReset} style={reset}>Reset</button>
            <div id="countdown-display">{formatTime(timeLeft)}</div>
            <div className="message">{message}</div>
        </div>
    );
};

export default CountdownTimer;
