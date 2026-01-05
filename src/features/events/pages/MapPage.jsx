import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet'; // For custom icons

// Fix default blue icon (Tailwind conflict)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapPage = () => {
  const events = [  // Copy your events array here
    {
      id: 1,
      title: 'AWS Tech 2026',
      location: 'Technopark, Trivandrum',
      lat: 8.9097,  // Technopark coords
      lng: 76.8631,
      category: 'Tech',
      price: 0,
    },
    {
      id: 2,
      title: 'Music Fest',
      location: 'Kazhakkoottam',
      lat: 8.8528,
      lng: 76.8415,
      category: 'Music',
      price: 150,
    },
    // Add more with real lat/lng from Google Maps
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-slate-800 to-pink-600 bg-clip-text text-transparent mb-4">
          Events Map
        </h1>
        <p className="text-xl text-slate-600">Click markers for event details (Technopark, Kazhakkoottam...)</p>
      </div>
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <MapContainer center={[8.5241, 76.9366]} zoom={11} style={{ height: '600px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {events.map((event) => (
            <Marker key={event.id} position={[event.lat, event.lng]}>
              <Popup>
                <div className="p-4 min-w-[250px]">
                  <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                  <p className="text-slate-600 mb-2">{event.location}</p>
                  <p className="text-pink-600 font-medium">₹{event.price}</p>
                  <Link
                    to={`/events/${event.id}`}
                    className="mt-3 block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg text-center hover:shadow-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
