"use client";
import { useEffect, useState } from 'react';

export default function Alerts() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    setLoading(true);
    try {
      const res = await fetch('/api/eonet');
      const data = await res.json();

      if (data.events) {
        setEvents(data.events); 
      }
    } catch (e) {
      console.error('Failed to fetch events:', e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 600000);
    return () => clearInterval(interval);
  }, []);



  const marqueeStyle = {
    height : '78vh',
    borderRadius: '10px',
    overflow: 'hidden',
    position: 'relative',
  };

  const scrollContentStyle = {
    display: 'flex',
    flexDirection: 'column',
    animation: 'scrollUp 3000s linear infinite',
  };

  return (
    <div>
      <div className='py-2 text-center font-semibold font-serif text-lg'>Latest Events (2025 only)</div>
      {loading ? (
        <p className='text-center'>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events for 2025 found.</p>
      ) : (
        <div style={marqueeStyle}>
          <div style={scrollContentStyle}>
            {events.map((event) => {
              const geom2025 = event.geometry
                .filter(g => new Date(g.date).getFullYear() === 2025)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

              return (
                <div
                  key={event.id}
                  style={{
                    borderRadius: '5px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    margin: '6px 10px',
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    background: 'white',
                  }}
                >
                  <strong>{event.title}</strong>
                  <br />
                  Category: {event.categories.map((c) => c.title).join(', ')}
                  <br />
                  Source:{' '}
                  {event.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer">
                      {s.id}
                    </a>
                  ))}
                  <br />
                  Date: {new Date(geom2025.date).toLocaleString()}
                </div>
              );
            })}
            {events.map((event) => {
              const geom2025 = event.geometry
                .filter(g => new Date(g.date).getFullYear() === 2025)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

              return (
                <div
                  key={event.id + '-repeat'}
                  style={{
                    padding: '10px',
                    borderBottom: '1px solid #ddd',
                    background: 'white',
                    border: '1px solid #ddd',
                    margin: '10px',

                  }}
                >
                  <strong>{event.title}</strong>
                  <br />
                  Category: {event.categories.map((c) => c.title).join(', ')}
                  <br />
                  Source:{' '}
                  {event.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noreferrer">
                      {s.id}
                    </a>
                  ))}
                  <br />
                  Date: {new Date(geom2025.date).toLocaleString()}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}
