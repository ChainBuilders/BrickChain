import React from "react";

interface LocationsProps {
  propertyLocationData: {
    mapLocation: string;
  }; 
}

export default function Locations({ propertyLocationData }: LocationsProps) {
    const map = "https://www.openstreetmap.org/export/embed.html?bbox=3.3915%2C6.4197%2C3.4315%2C6.4397&amp;layer=mapnik"
  return (
    <div
      data-state="active"
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby="radix-«ra»-trigger-location"
      id="radix-«ra»-content-location"
      tabIndex={0}
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-6"
    >
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900">
          Location &amp; Neighborhood
        </h3>
        <div className="h-64 bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg flex items-center justify-center">
        {/* Live Map Integration using react-leaflet */}
        {propertyLocationData.mapLocation ? ( // Replace `true` with a prop or state to control map presence
            <>
                <div className="w-full h-full rounded-lg overflow-hidden">
                    <iframe
                        title="Victoria Island, Lagos Map"
                        src={propertyLocationData.mapLocation}
                        className="w-full h-full border-0"
                        style={{ minHeight: "220px" }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </>
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                <span className="text-slate-500">
                    Interactive map would be displayed here
                </span>
            </div>
        )}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">
              Nearby Amenities
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Shopping Mall</span>
                <span className="text-sm text-slate-500">0.5 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">International Airport</span>
                <span className="text-sm text-slate-500">15 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Business District</span>
                <span className="text-sm text-slate-500">2 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Hospital</span>
                <span className="text-sm text-slate-500">1.2 km</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3">
              Transportation
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Bus Stop</span>
                <span className="text-sm text-slate-500">200 m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Metro Station</span>
                <span className="text-sm text-slate-500">1.5 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Major Highway</span>
                <span className="text-sm text-slate-500">800 m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Taxi Stand</span>
                <span className="text-sm text-slate-500">100 m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
