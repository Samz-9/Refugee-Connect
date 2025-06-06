import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: 502 });
    }

    const data = await res.json();

    const events2025 = data.events.filter(event =>
      event.geometry.some(geo => new Date(geo.date).getFullYear() === 2025)
    );

    events2025.sort((a, b) => {
      const latestDateA = new Date(
        Math.max(
          ...a.geometry
            .filter(g => new Date(g.date).getFullYear() === 2025)
            .map(g => new Date(g.date).getTime())
        )
      );

      const latestDateB = new Date(
        Math.max(
          ...b.geometry
            .filter(g => new Date(g.date).getFullYear() === 2025)
            .map(g => new Date(g.date).getTime())
        )
      );

      return latestDateB - latestDateA;
    });

    return NextResponse.json({ events: events2025 });
  } catch (error) {
    return NextResponse.json({ error: `Catch error: ${error.message}` }, { status: 500 });
  }
}