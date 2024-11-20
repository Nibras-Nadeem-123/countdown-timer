"use client";
import React, { useEffect, useRef, useState } from "react";

const Countdown = () => {
  // STATE AND REFERENCE
  const [timeduration, setTimeDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timeActive, setTimeActive] = useState<boolean>(false);
  const [timePause, setTimePause] = useState<boolean>(false);
  const [format, setFormat] = useState<string>("full");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClear = () => {
    setTimeActive(false);
    setTimePause(false);
    setTimeLeft(0);
    setTimeDuration("");
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleTimeDuration = () => {
    const timeValue = Number(timeduration);
    if (!isNaN(timeValue) && timeValue > 0) {
      setTimeLeft(timeValue);
      setTimeActive(false);
      setTimePause(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      alert("Please enter a valid positive number");
    }
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setTimeActive(true);
      setTimePause(false);
    }
  };

  const handlePause = () => {
    if (timeActive) {
      setTimePause(true);
      setTimeActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = () => {
    setTimeActive(false);
    setTimePause(false);
    setTimeLeft(Number(timeduration) || 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (timeActive && !timePause) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeActive, timePause]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600) % 24;
    const minutes = Math.floor((time / 60) % 60);
    const seconds = time % 60;

    switch (format) {
      case "full":
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
      case "hours-minutes":
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}`;
      case "minutes-seconds":
        const t_minutes = Math.floor(time / 60);
        return `${String(t_minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;
      default:
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeDuration(e.target.value);
  };

  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value);
  };

  return (
    <div className="bg-[url('/heroimage.jpg')] bg-cover bg-center min-h-screen p-5 text-center">
      <div className="bg-blue-100 shadow-lg shadow-blue-300 rounded-3xl p-5 dark:text-gray-700 items-center max-w-2xl md:max-w-3xl sm:max-w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl bg-blue-950 rounded-lg shadow-md shadow-blue-950 text-gray-50 font-bold p-4 mb-5 text-shadow-custom-light">
          Countdown Timer
        </h1>

        <h4 className="text-lg sm:text-xl lg:text-2xl mt-3 text-gray-800">
          Time Duration (in seconds)
        </h4>

        <input
          type="number"
          id="timeDuration"
          placeholder="Enter Time Duration"
          value={timeduration}
          onChange={handleDurationChange}
          className="text-base sm:text-lg lg:text-xl rounded-md p-2 focus:outline-none shadow w-full max-w-xs mx-auto"
        />

        <button
          onClick={handleTimeDuration}
          className="bg-blue-950 hover:bg-blue-900 text-gray-100 p-2 text-xl rounded-lg shadow-md shadow-blue-950 m-3 hover:text-shadow-custom-dark"
        >
          Set
        </button>

        <h4 className="mt-5 text-lg sm:text-xl lg:text-2xl text-gray-800">
          Choose Format
        </h4>
        <select
          onChange={handleFormatChange}
          value={format}
          className="text-base sm:text-lg lg:text-xl p-2 rounded-lg shadow-md w-full max-w-xs mx-auto focus:outline-none"
        >
          <option value="full">Hours, Minutes, Seconds</option>
          <option value="hours-minutes">Hours, Minutes</option>
          <option value="minutes-seconds">Minutes, Seconds</option>
        </select>

       
          <button
            onClick={handleStart}
            className="bg-blue-950 hover:bg-blue-900 text-gray-100 text-xl p-2 rounded-lg shadow-md shadow-blue-950 mx-2 text-shadow-custom-dark"
          >
            Start
          </button>

          <div className="mt-5">
          <div className=" text-7xl sm:text-6xl lg:text-7xl text-gray-800 text-shadow-custom-dark">
             {formatTime(timeLeft)} 
          </div>
           
         <div className="text-[30%] text-shadow-custom-dark lg:text-xl md:text-lg sm:text-md">
         {
              format === "full" ?
              <p className="ml-7"> Hours : Minutes : Seconds </p>
              : format === "hours-minutes"?
              <p className="ml-4">Hours : Minutes</p>
              : format === "minutes-seconds" ?
              <p className="ml-2">Minutes : Seconds</p>
              : <p></p>
            }
         </div>
 
          <div className="flex justify-center gap-2 flex-wrap mt-5">
            <button
              onClick={handlePause}
              className="bg-blue-950 hover:bg-blue-900 text-gray-100 text-xl p-2 rounded-lg shadow-md shadow-blue-950 mx-2 text-shadow-custom-dark"
              >
              {timePause ? <p onClick={handleStart}>Resume</p> : <p>Pause</p>}
            </button>
            <button
              onClick={handleReset}
              className="bg-blue-950 hover:bg-blue-900 text-gray-100 text-xl p-2 rounded-lg shadow-md shadow-blue-950 mx-2 text-shadow-custom-dark"
              >
              Reset
            </button>
            <button
              onClick={handleClear}
              className="bg-blue-950 hover:bg-blue-900 text-gray-100 text-xl p-2 rounded-lg shadow-md shadow-blue-950 mx-2 text-shadow-custom-dark"
              >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
