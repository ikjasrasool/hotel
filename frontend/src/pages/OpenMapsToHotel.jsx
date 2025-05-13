import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Bus, AlertCircle, Info, Utensils, ChevronDown, ChevronUp, Coffee, Star } from 'lucide-react';

const SaravanaDistanceCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [nearestBusRoutes, setNearestBusRoutes] = useState([]);
  const [expandedRoute, setExpandedRoute] = useState(null);

  const hotelName = "Saravana Bhavan Hotel";
  const hotelAddress = "National Highway 44, Salem-Coimbatore Highway, Tamil Nadu";
  const hotelCoordinates = {
    lat: 11.5647,
    lng: 78.2345
  };

  const busRoutes = [
    {
      routeNumber: "45A",
      routeName: "Salem - Coimbatore Super Express",
      operatingHours: "5:45 AM - 9:25 PM",
      frequency: "Every 90 minutes",
      busType: "Super Deluxe",
      nextDepartures: ["10:45 AM", "12:30 PM", "2:15 PM"]
    },
    {
      routeNumber: "72B",
      routeName: "Salem - Tiruppur Express",
      operatingHours: "6:30 AM - 8:40 PM",
      frequency: "Every 2 hours",
      busType: "Deluxe",
      nextDepartures: ["12:30 PM", "2:30 PM", "4:30 PM"]
    },
    {
      routeNumber: "88C",
      routeName: "Salem - Erode Express",
      operatingHours: "6:00 AM - 9:10 PM",
      frequency: "Every 90 minutes",
      busType: "Regular",
      nextDepartures: ["11:30 AM", "1:00 PM", "2:30 PM"]
    },
    {
      routeNumber: "SRS-01",
      routeName: "Salem - Coimbatore Premium",
      operatingHours: "6:45 AM - 11:40 PM",
      frequency: "6 services daily",
      busType: "AC Sleeper",
      nextDepartures: ["1:15 PM", "4:30 PM", "8:45 PM"]
    }
  ];

  const cityDistances = [
    { from: "Salem", to: "Saravana Bhavan", distance: "45 km", drivingTime: "50 mins" },
    { from: "Saravana Bhavan", to: "Sankari", distance: "3 km", drivingTime: "5 mins" },
    { from: "Saravana Bhavan", to: "Bhavani", distance: "38 km", drivingTime: "45 mins" },
    { from: "Saravana Bhavan", to: "Erode", distance: "56 km", drivingTime: "1 hr 5 mins" },
    { from: "Saravana Bhavan", to: "Tiruppur", distance: "84 km", drivingTime: "1 hr 45 mins" },
    { from: "Saravana Bhavan", to: "Coimbatore", distance: "111 km", drivingTime: "2 hr 15 mins" }
  ];

  useEffect(() => {
    // When component mounts, try to get user location
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);

          // Calculate mock distance and duration (in a real app, use Maps API)
          calculateMockDistance(userLoc);

          // Find nearby bus routes
          findNearbyBusRoutes();

          setLoading(false);
        },
        (error) => {
          setError("Unable to fetch location. Please allow location access.");
          console.error(error);
          setLoading(false);
        }
    );
  };

  const calculateMockDistance = (userLoc) => {
    // This is a mock calculation - in a real app, use Google Maps Distance Matrix API
    // Using the Haversine formula to get crow-flies distance
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(hotelCoordinates.lat - userLoc.lat);
    const dLon = deg2rad(hotelCoordinates.lng - userLoc.lng);

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(userLoc.lat)) * Math.cos(deg2rad(hotelCoordinates.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = Math.round(R * c); // Distance in km

    setDistance(distance);
    // Assuming average speed of 60 km/h for simplicity
    const timeInMinutes = Math.round(distance * 60 / 60);
    setDuration(timeInMinutes);
  };

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  const findNearbyBusRoutes = () => {
    // In a real app, this would filter routes based on user's location
    // For demo purposes, we're just showing all routes
    setNearestBusRoutes(busRoutes);
  };

  const openGoogleMaps = () => {
    if (!userLocation) {
      getUserLocation();
      return;
    }

    // Construct Google Maps directions URL
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${hotelCoordinates.lat},${hotelCoordinates.lng}&travelmode=driving`;

    // Open in new tab
    window.open(mapsUrl, '_blank');
  };

  const toggleRoute = (index) => {
    if (expandedRoute === index) {
      setExpandedRoute(null);
    } else {
      setExpandedRoute(index);
    }
  };

  return (
      <div className="max-w-4xl mx-auto">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-t-xl text-white shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold flex items-center">
                  <Utensils className="mr-2" /> {hotelName}
                </h1>
                <div className="flex items-center mt-1">
                  <MapPin size={16} className="mr-1" />
                  <p className="text-white/90">{hotelAddress}</p>
                  <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-medium ml-2">
                    Open 24/7
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Navigation size={16} className="mr-1" />
                  <p className="text-white/90">45km from Salem, near Sankari Junction</p>
                </div>
              </div>
              <div className="bg-white text-red-800 rounded-lg p-3 flex items-center shadow-lg mt-4 md:mt-0">
                <Star fill="gold" color="gold" className="mr-1" />
                <span className="font-bold text-xl">4.7/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Distance calculator card */}
        <div className="bg-white rounded-b-xl shadow-lg overflow-hidden border-t-4 border-red-600">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Distance Calculator</h2>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-red-100 text-red-800 p-3 rounded-full">
                    <MapPin size={24} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">Your Location</p>
                    <p className="font-medium text-gray-800">
                      {userLocation ? "Location detected" : "Not detected yet"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button
                      onClick={getUserLocation}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    {loading ? "Detecting..." : "Update My Location"}
                  </button>
                </div>
              </div>

              {error && (
                  <div className="mt-4 flex items-center text-red-500 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
              )}

              {distance && duration && (
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                          <Navigation size={20} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-500">Distance</p>
                          <p className="text-lg font-bold text-blue-600">{distance} km</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center">
                        <div className="bg-green-100 text-green-600 p-2 rounded-full">
                          <Clock size={20} />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-gray-500">Estimated Travel Time</p>
                          <p className="text-lg font-bold text-green-600">
                            {duration < 60 ? `${duration} min` : `${Math.floor(duration/60)} hr ${duration % 60} min`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
              )}

              <div className="mt-6">
                <button
                    onClick={openGoogleMaps}
                    disabled={loading || !userLocation}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <Navigation className="mr-2" />
                  Open Directions in Google Maps
                </button>
              </div>
            </div>

            {/* Bus routes from cities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Bus className="mr-2 text-red-600" /> Major City Distances
              </h3>

              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driving Time</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {cityDistances.map((city, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{city.from}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{city.to}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-red-700">{city.distance}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{city.drivingTime}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bus routes section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Bus className="mr-2 text-red-600" /> Available Bus Routes
              </h3>

              <div className="space-y-4">
                {nearestBusRoutes.map((route, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                      <div
                          className="p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleRoute(idx)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                              {route.routeNumber}
                            </div>
                            <h4 className="font-semibold text-gray-800">{route.routeName}</h4>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm mr-3">
                          {route.busType}
                        </span>
                            {expandedRoute === idx ?
                                <ChevronUp size={18} className="text-gray-500 ml-2" /> :
                                <ChevronDown size={18} className="text-gray-500 ml-2" />
                            }
                          </div>
                        </div>
                      </div>

                      {expandedRoute === idx && (
                          <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="bg-gray-50 rounded-lg p-3">
                                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <Clock size={15} className="mr-1 text-gray-600" /> Operating Hours:
                                </h5>
                                <p className="text-sm text-gray-600">{route.operatingHours}</p>
                                <h5 className="text-sm font-medium text-gray-700 mt-3 mb-1 flex items-center">
                                  <Info size={15} className="mr-1 text-gray-600" /> Frequency:
                                </h5>
                                <p className="text-sm text-gray-600">{route.frequency}</p>
                              </div>

                              <div className="bg-red-50 rounded-lg p-3">
                                <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                  <Clock size={15} className="mr-1 text-red-600" /> Next departures:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {route.nextDepartures.map((time, timeIdx) => (
                                      <span key={timeIdx} className="bg-white border border-red-200 text-gray-700 px-2 py-1 rounded text-sm">
                                {time}
                              </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                      )}
                    </div>
                ))}
              </div>
            </div>

            {/* Special services highlight */}
            <div className="mt-6 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
              <div className="flex items-start">
                <Coffee className="text-red-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">Special Traveler Service</h4>
                  <p className="mt-1 text-sm text-gray-700">Complimentary coffee/tea for passengers at Saravana Bhavan Restaurant from 6:00 AM to 8:00 AM. Show your bus ticket to get 10% discount at the restaurant.</p>
                </div>
              </div>
            </div>

            {/* Help & Contact */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Need help with bus information?</h3>
                <a href="tel:04526245700" className="flex items-center text-red-600 hover:text-red-800">
                  <Phone size={16} className="mr-1" />
                  <span className="text-sm font-medium">04526-245700</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const Phone = ({ size, className }) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
  );
};

export default SaravanaDistanceCalculator;