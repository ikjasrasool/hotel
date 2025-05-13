import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Bus, AlertCircle, Info, Coffee, ChevronDown, ChevronUp, Car } from 'lucide-react';

const SaravanaDistanceCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [nearestBusRoutes, setNearestBusRoutes] = useState([]);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState('highway'); // 'highway' or 'local'

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
      nextDepartures: ["10:45 AM", "12:30 PM", "2:15 PM"],
      avgSpeed: 45 // km/h
    },
    {
      routeNumber: "72B",
      routeName: "Salem - Tiruppur Express",
      operatingHours: "6:30 AM - 8:40 PM",
      frequency: "Every 2 hours",
      busType: "Deluxe",
      nextDepartures: ["12:30 PM", "2:30 PM", "4:30 PM"],
      avgSpeed: 40 // km/h
    },
    {
      routeNumber: "88C",
      routeName: "Salem - Erode Express",
      operatingHours: "6:00 AM - 9:10 PM",
      frequency: "Every 90 minutes",
      busType: "Regular",
      nextDepartures: ["11:30 AM", "1:00 PM", "2:30 PM"],
      avgSpeed: 35 // km/h
    },
    {
      routeNumber: "SRS-01",
      routeName: "Salem - Coimbatore Premium",
      operatingHours: "6:45 AM - 11:40 PM",
      frequency: "6 services daily",
      busType: "AC Sleeper",
      nextDepartures: ["1:15 PM", "4:30 PM", "8:45 PM"],
      avgSpeed: 50 // km/h
    }
  ];

  // Updated with more realistic travel times reflecting actual road conditions
  const cityDistances = [
    { from: "Salem", to: "Saravana Bhavan", distance: "45 km", drivingTime: "1 hr 10 mins" },
    { from: "Saravana Bhavan", to: "Sankari", distance: "3 km", drivingTime: "8 mins" },
    { from: "Saravana Bhavan", to: "Bhavani", distance: "38 km", drivingTime: "55 mins" },
    { from: "Saravana Bhavan", to: "Erode", distance: "56 km", drivingTime: "1 hr 25 mins" },
    { from: "Saravana Bhavan", to: "Tiruppur", distance: "84 km", drivingTime: "2 hr 10 mins" },
    { from: "Saravana Bhavan", to: "Coimbatore", distance: "121 km", drivingTime: "3 hr 00 mins" }
  ];

  // Different travel speeds based on road types
  const travelSpeeds = {
    highway: {
      clear: 70, // km/h on clear highways
      normal: 55, // km/h on normal traffic
      heavy: 40  // km/h on heavy traffic
    },
    local: {
      clear: 45, // km/h on clear local roads
      normal: 35, // km/h on normal traffic local roads
      heavy: 25  // km/h on heavy traffic local roads
    }
  };

  // Different traffic conditions based on time of day
  const getTrafficCondition = () => {
    const hour = new Date().getHours();

    // Morning rush hours (7-10 AM)
    if (hour >= 7 && hour <= 10) {
      return "heavy";
    }
    // Evening rush hours (4-8 PM)
    else if (hour >= 16 && hour <= 20) {
      return "heavy";
    }
    // Normal daytime traffic
    else if (hour > 10 && hour < 16) {
      return "normal";
    }
    // Clear traffic (late night/early morning)
    else {
      return "clear";
    }
  };

  useEffect(() => {
    // When component mounts, try to get user location
    getUserLocation();
  }, []);

  // Recalculate when route type changes
  useEffect(() => {
    if (userLocation) {
      calculateRealDistance(userLocation);
    }
  }, [selectedRoute, userLocation]);

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

          // Calculate distance and duration with improved algorithm
          calculateRealDistance(userLoc);

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

  const calculateRealDistance = (userLoc) => {
    // Calculate crow-flies distance using Haversine formula
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(hotelCoordinates.lat - userLoc.lat);
    const dLon = deg2rad(hotelCoordinates.lng - userLoc.lng);

    const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(userLoc.lat)) * Math.cos(deg2rad(hotelCoordinates.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    // Direct distance calculation
    let directDistance = Math.round(R * c);

    // Apply road winding factor based on terrain and route type
    // Roads are rarely straight line distances
    const windingFactor = selectedRoute === 'highway' ? 1.2 : 1.4;

    // Apply distance correction
    const adjustedDistance = Math.round(directDistance * windingFactor);
    setDistance(adjustedDistance);

    // Calculate travel time based on road type and traffic conditions
    const trafficCondition = getTrafficCondition();
    const avgSpeed = travelSpeeds[selectedRoute][trafficCondition];

    // Time calculation in minutes with additional buffer for stops, signals, etc.
    const baseTimeMinutes = Math.round((adjustedDistance / avgSpeed) * 60);
    const bufferTime = selectedRoute === 'highway' ? 15 : 25; // Additional time in minutes

    setDuration(baseTimeMinutes + bufferTime);
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

              {/* Route type selection */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Select Route Type:</p>
                <div className="flex space-x-3">
                  <button
                      onClick={() => setSelectedRoute('highway')}
                      className={`px-4 py-2 rounded-md flex items-center ${
                          selectedRoute === 'highway'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    <Car size={18} className="mr-2" />
                    Highway Route
                  </button>
                  <button
                      onClick={() => setSelectedRoute('local')}
                      className={`px-4 py-2 rounded-md flex items-center ${
                          selectedRoute === 'local'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                  >
                    <Bus size={18} className="mr-2" />
                    Local Roads
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedRoute === 'highway'
                      ? 'Highway routes may be longer but faster'
                      : 'Local routes may be shorter but slower due to traffic'}
                </p>
              </div>

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
                                <h5 className="text-sm font-medium text-gray-700 mt-3 mb-1 flex items-center">
                                  <Car size={15} className="mr-1 text-gray-600" /> Average Speed:
                                </h5>
                                <p className="text-sm text-gray-600">{route.avgSpeed} km/h</p>
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

            {/* Traffic information */}
            <div className="mt-6 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800">Current Traffic Information</h4>
                  <p className="mt-1 text-sm text-gray-700">
                    Travel times may vary based on traffic conditions.
                    Our calculator accounts for {getTrafficCondition()} traffic at this time of day.
                  </p>
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