import { useState, useEffect, useRef } from 'react';

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number; // Float for sweeping
  date: number;
  dayOfWeek: string;
}

export const useBeijingTime = () => {
  const [time, setTime] = useState<TimeData>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: 1,
    dayOfWeek: 'MON'
  });

  const requestRef = useRef<number>(0);

  const animate = () => {
    // Current time
    const now = new Date();
    
    // Convert to Beijing Time (UTC+8)
    // We get UTC time in ms, add 8 hours in ms, then create new date
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const beijingOffset = 8 * 60 * 60 * 1000;
    const beijingDate = new Date(utc + beijingOffset);

    // Calculate components
    const hours = beijingDate.getHours();
    const minutes = beijingDate.getMinutes();
    const seconds = beijingDate.getSeconds();
    const milliseconds = beijingDate.getMilliseconds();
    const date = beijingDate.getDate();
    const dayIndex = beijingDate.getDay();

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    // Smooth seconds for sweeping effect (0-60 float)
    const smoothSeconds = seconds + (milliseconds / 1000);

    setTime({
      hours,
      minutes,
      seconds: smoothSeconds,
      date,
      dayOfWeek: days[dayIndex]
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return time;
};