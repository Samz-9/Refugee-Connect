'use client';
import { useState, useEffect } from 'react';

function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MuseJobs({  skills, proplocation }) {
    const [disasters, setDisasters] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citiesRes = await fetch('/cities.json');
                const citiesData = await citiesRes.json();
                const parsedCities = citiesData.map(city => ({
                    ...city,
                    lat: parseFloat(city.lat),
                    lng: parseFloat(city.lng),
                }));

                const userCity = parsedCities.find(
                    city => city.name.toLowerCase() === proplocation.toLowerCase()
                );
                if (!userCity) {
                    throw new Error('User city not found in cities.json');
                }
                const eonetRes = await fetch(
                    'https://eonet.gsfc.nasa.gov/api/v3/events?start=2025-01-01&end=2025-12-31'
                );
                const eonet = await eonetRes.json();
                const disasterPoints = eonet.events.flatMap(event =>
                    event.geometry.map(geo => ({
                        lat: geo.coordinates[1],
                        lng: geo.coordinates[0],
                    }))
                );
                setDisasters(disasterPoints);

                const safeCities = parsedCities.filter(city =>
                    disasterPoints.every(
                        d => haversine(city.lat, city.lng, d.lat, d.lng) > 600
                    )
                );

                const sortedCities = safeCities
                    .map(city => ({
                        ...city,
                        distance: haversine(userCity.lat, userCity.lng, city.lat, city.lng),
                    }))
                    .sort((a, b) => a.distance - b.distance)
                    .slice(0, 5); 

                const jobResults = [];
                for (const city of sortedCities) {
                    let allJobs = [];
                    for (const skill of skills) {
                        let page = 1;
                        let hasMore = true;
                        while (hasMore && page <= 3) {
                            const res = await fetch(
                                `https://www.themuse.com/api/public/jobs?location=${encodeURIComponent(
                                    city.name
                                )}&category=${encodeURIComponent(skill)}&page=${page}`
                            );
                            const data = await res.json();
                            if (data?.results?.length) {
                                allJobs.push(...data.results);
                                hasMore = data.page_count && page < data.page_count;
                                page++;
                            } else {
                                hasMore = false;
                            }
                        }
                    }

                    if (allJobs.length) {
                        jobResults.push({
                            city: city.name,
                            country: city.country || 'Unknown',
                            jobs: allJobs,
                        });
                    }
                }

                setJobs(jobResults);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-3 relative space-y-4">
            {loading && <div className="p-6 text-lg absolute top-0 left-0 font-semibold text-gray-700 animate-pulse text-center">Loading safe jobs...</div>}
            {!loading && jobs.length === 0 && (
                <div className="text-center absolute top-4 left-0 text-red-500 font-medium">No safe jobs found nearby based on your location and skills.</div>
            )}

            <div className="flex flex-col h-[65vh] overflow-y-auto gap-2">
                {jobs.map((entry, i) => (
                    <div key={i} className="bg-white p-1 w-full border-2 rounded-xl shadow space-y-3">
                        <h2 className="text-lg text-center font-semibold">{entry.city}, {entry.country}</h2>
                        <div className="w-full h-[40vh] overflow-y-scroll px-2">
                            <ul className="text-sm space-y-2">
                                {entry.jobs.map((job, j) => (
                                    <li key={j} className="border-b pb-2">
                                        <a
                                            href={job.refs?.landing_page}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            {job.name}
                                        </a>
                                        <p>{job.company?.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
