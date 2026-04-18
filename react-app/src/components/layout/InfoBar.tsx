'use client';

import { useState, useEffect, useCallback } from 'react';

export default function InfoBar() {
  const [rate, setRate] = useState('1 USD = ₱ --');
  const [temp, setTemp] = useState('--°C');
  const [dateStr, setDateStr] = useState('--- --, ----');
  const [timeStr, setTimeStr] = useState('--:-- --');

  const updateClock = useCallback(() => {
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    setDateStr(`${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`);
    let h = now.getHours();
    const m = now.getMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setTimeStr(`${h}:${m < 10 ? '0' + m : m} ${ampm}`);
  }, []);

  useEffect(() => {
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [updateClock]);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rates?.PHP) setRate(`1 USD = ₱ ${data.rates.PHP.toFixed(2)}`);
      })
      .catch(() => {});

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=16.5167&longitude=121.1833&current_weather=true'
    )
      .then((r) => r.json())
      .then((data) => {
        if (data?.current_weather?.temperature != null) {
          setTemp(`${Math.round(data.current_weather.temperature)}°C`);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="info-bar" role="complementary" aria-label="Real-time information">
      <div className="container">
        <div className="info-bar-inner" aria-live="polite" aria-atomic="false">
          <div className="info-bar-item info-bar-rates" aria-label="Exchange rates">
            <i className="bi bi-currency-exchange" aria-hidden="true" />
            <span className="rate-rotator">
              <span className="rate-display">{rate}</span>
            </span>
          </div>
          <div className="info-bar-item info-bar-weather" aria-label="Current weather in Solano">
            <i className="bi bi-thermometer-half" aria-hidden="true" />
            <span className="weather-location">Solano</span>
            <span className="weather-temp">{temp}</span>
          </div>
          <div className="info-bar-item info-bar-datetime" aria-label="Philippine Date and Time">
            <i className="bi bi-calendar3" aria-hidden="true" />
            <span className="date-value">{dateStr}</span>
            <span className="datetime-separator" aria-hidden="true">
              •
            </span>
            <i className="bi bi-clock" aria-hidden="true" />
            <span className="time-value">{timeStr}</span>
            <span className="time-label">PHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
