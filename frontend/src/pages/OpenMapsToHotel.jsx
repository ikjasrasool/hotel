import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Car, AlertCircle } from 'lucide-react';

const OpenMapsToHotel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hotelName = "Saravana Bhavan";
  const hotelAddress = "Opposite To Excel Engineering College, Salem, Tamil Nadu";

  
  const openGoogleMaps = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        
        const hotelLat = 11.450667;
        const hotelLng = 77.771944;
        
        // Construct Google Maps directions URL
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${hotelLat},${hotelLng}&travelmode=driving`;
        
        // Open in new tab
        window.open(mapsUrl, '_blank');
        setLoading(false);
      },
      (error) => {
        setError("Unable to fetch location. Please allow location access.");
        console.error(error);
        setLoading(false);
      }
    );
  };
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0">
          <div className="h-48 w-full object-cover md:h-full md:w-48 bg-blue-600 flex items-center justify-center">
            <MapPin className="text-white" size={64} />
          </div>
        </div>
        <div className="p-8 w-full">
          <div className="block mt-1 text-lg leading-tight font-medium text-black">
            {hotelName}
          </div>
          <div className="flex items-center mt-2 text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="text-sm">{hotelAddress}</p>
          </div>
        
          <div className="mt-6">
            <button
              onClick={openGoogleMaps}
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting your location...
                </span>
              ) : (
                <span className="flex items-center">
                  <Navigation className="mr-2" />
                  Distance From Current Location to Hotel
                </span>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 flex items-center text-red-500 bg-red-50 p-3 rounded-md">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          
         
        </div>
      </div>
    </div>
  );
};

export default OpenMapsToHotel;