'use client';

import { useState, useEffect } from 'react';

export default function InfoBar() {
  const [dateTime, setDateTime] = useState({ date: '--- --, ----', time: '--:-- --' });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Manila', month: 'short', day: '2-digit', year: 'numeric' };
      const timeOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hour12: true };
      setDateTime({
        date: now.toLocaleDateString('en-US', dateOptions),
        time: now.toLocaleTimeString('en-US', timeOptions),
      });
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="info-bar" role="complementary" aria-label="Real-time information">
      <div className="container">
        <div className="info-bar-inner" aria-live="polite" aria-atomic="false">
          <div className="info-bar-item info-bar-rates" aria-label="Exchange rates">
            <i className="bi bi-currency-exchange" aria-hidden="true"></i>
            <span className="rate-rotator">
              <span className="rate-display">1 USD = ₱ 56.50</span>
            </span>
          </div>
          <div className="info-bar-item info-bar-weather" aria-label="Current weather in Solano">
            <i className="bi bi-thermometer-half" aria-hidden="true"></i>
            <span className="weather-location">Solano</span>
            <span className="weather-temp">29°C</span>
          </div>
          <div className="info-bar-item info-bar-datetime" aria-label="Philippine Date and Time">
            <i className="bi bi-calendar3" aria-hidden="true"></i>
            <span className="date-value">{dateTime.date}</span>
            <span className="datetime-separator" aria-hidden="true">•</span>
            <i className="bi bi-clock" aria-hidden="true"></i>
            <span className="time-value">{dateTime.time}</span>
            <span className="time-label">PHT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
