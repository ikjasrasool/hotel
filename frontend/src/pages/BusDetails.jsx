import React, { useState } from 'react';
import { MapPin, Clock, Bus, Coffee, Search, Phone, Star, Utensils, Home, Mail, Navigation, Calendar, AlertCircle, Info, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const SaravanaBhavanBusInfo = () => {
  const [activeTab, setActiveTab] = useState('schedules');
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFilter, setTimeFilter] = useState('all');

  const busStopInfo = {
    name: "Saravana Bhavan Hotel Bus Stop",
    address: "National Highway 44, Salem-Coimbatore Highway, Tamil Nadu",
    description: "A premium bus stop with 24/7 facilities located at the renowned Saravana Bhavan Hotel, offering convenience and safety for travelers on the NH44 corridor.",
    exactLocation: "45km from Salem, near Sankari Junction",
    gpsCoordinates: "11.5647° N, 78.2345° E",
    landmarkDistance: "500m from Sankari Railway Station",
    operatingHours: "Open 24/7 for highway travelers",
    facilities: ["24/7 Waiting Area", "Clean Restrooms", "Food Court", "Luggage Storage", "Travel Desk", "ATM", "EV Charging", "First Aid"],
    hotelAmenities: [
      "South Indian Vegetarian Restaurant",
      "AC Dining Hall",
      "Takeaway Counter",
      "Special Tiffin Items",
      "Pure Vegetarian Food",
      "Famous for Dosa & Idli varieties"
    ],
    contacts: ["04526-245700", "manager@saravanabhavan.com"],
    rating: 4.7
  };

  const cityDistances = [
    { from: "Salem", to: "Saravana Bhavan", distance: "45 km", drivingTime: "50 mins" },
    { from: "Saravana Bhavan", to: "Sankari", distance: "3 km", drivingTime: "5 mins" },
    { from: "Saravana Bhavan", to: "Bhavani", distance: "38 km", drivingTime: "45 mins" },
    { from: "Saravana Bhavan", to: "Erode", distance: "56 km", drivingTime: "1 hr 5 mins" },
    { from: "Saravana Bhavan", to: "Tiruppur", distance: "84 km", drivingTime: "1 hr 45 mins" },
    { from: "Saravana Bhavan", to: "Coimbatore", distance: "111 km", drivingTime: "2 hr 15 mins" }
  ];

  const busServices = [
    {
      operator: "Tamil Nadu State Transport Corporation (TNSTC)",
      routes: [
        {
          routeNumber: "45A",
          routeName: "Salem - Coimbatore Super Express",
          arrivalTimes: ["5:45 AM", "7:15 AM", "9:00 AM", "10:45 AM", "12:30 PM", "2:15 PM", "4:00 PM", "5:45 PM", "7:30 PM", "9:15 PM"],
          departureTimes: ["5:55 AM", "7:25 AM", "9:10 AM", "10:55 AM", "12:40 PM", "2:25 PM", "4:10 PM", "5:55 PM", "7:40 PM", "9:25 PM"],
          busType: "Super Deluxe",
          frequency: "Every 90 minutes",
          busNumbers: ["TN 30 N 1245", "TN 30 N 1255", "TN 30 N 1265", "TN 30 N 1275", "TN 30 N 1285"]
        },
        {
          routeNumber: "72B",
          routeName: "Salem - Tiruppur Express",
          arrivalTimes: ["6:30 AM", "8:30 AM", "10:30 AM", "12:30 PM", "2:30 PM", "4:30 PM", "6:30 PM", "8:30 PM"],
          departureTimes: ["6:40 AM", "8:40 AM", "10:40 AM", "12:40 PM", "2:40 PM", "4:40 PM", "6:40 PM", "8:40 PM"],
          busType: "Deluxe",
          frequency: "Every 2 hours",
          busNumbers: ["TN 30 N 2345", "TN 30 N 2355", "TN 30 N 2365", "TN 30 N 2375"]
        },
        {
          routeNumber: "88C",
          routeName: "Salem - Erode Express",
          arrivalTimes: ["6:00 AM", "7:30 AM", "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", "9:00 PM"],
          departureTimes: ["6:10 AM", "7:40 AM", "9:10 AM", "10:40 AM", "12:10 PM", "1:40 PM", "3:10 PM", "4:40 PM", "6:10 PM", "7:40 PM", "9:10 PM"],
          busType: "Regular",
          frequency: "Every 90 minutes",
          busNumbers: ["TN 30 N 3345", "TN 30 N 3355", "TN 30 N 3365", "TN 30 N 3375", "TN 30 N 3385"]
        },
        {
          routeNumber: "92D",
          routeName: "Salem - Coimbatore Via Sankari",
          arrivalTimes: ["5:30 AM", "7:00 AM", "8:30 AM", "10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM", "7:00 PM", "8:30 PM"],
          departureTimes: ["5:40 AM", "7:10 AM", "8:40 AM", "10:10 AM", "11:40 AM", "1:10 PM", "2:40 PM", "4:10 PM", "5:40 PM", "7:10 PM", "8:40 PM"],
          busType: "Ordinary",
          frequency: "Every 90 minutes",
          busNumbers: ["TN 30 N 4345", "TN 30 N 4355", "TN 30 N 4365", "TN 30 N 4375", "TN 30 N 4385"]
        }
      ]
    },
    {
      operator: "Private Bus Operators",
      routes: [
        {
          routeNumber: "SRS-01",
          routeName: "Salem - Coimbatore Premium",
          arrivalTimes: ["6:45 AM", "10:00 AM", "1:15 PM", "4:30 PM", "8:45 PM", "11:30 PM"],
          departureTimes: ["6:55 AM", "10:10 AM", "1:25 PM", "4:40 PM", "8:55 PM", "11:40 PM"],
          busType: "AC Sleeper",
          frequency: "6 services daily",
          busNumbers: ["TN 33 R 5555", "TN 33 R 5556", "TN 33 R 5557"]
        },
        {
          routeNumber: "KPN-03",
          routeName: "Salem - Tiruppur - Coimbatore",
          arrivalTimes: ["6:15 AM", "9:15 AM", "12:15 PM", "3:15 PM", "6:15 PM", "9:15 PM", "11:45 PM"],
          departureTimes: ["6:25 AM", "9:25 AM", "12:25 PM", "3:25 PM", "6:25 PM", "9:25 PM", "11:55 PM"],
          busType: "AC Semi-Sleeper",
          frequency: "Every 3 hours",
          busNumbers: ["TN 33 K 6555", "TN 33 K 6556", "TN 33 K 6557", "TN 33 K 6558"]
        },
        {
          routeNumber: "PVR-22",
          routeName: "Salem - Erode - Palani",
          arrivalTimes: ["8:00 AM", "12:00 PM", "4:00 PM", "8:00 PM", "11:00 PM"],
          departureTimes: ["8:10 AM", "12:10 PM", "4:10 PM", "8:10 PM", "11:10 PM"],
          busType: "Non-AC Seater",
          frequency: "5 services daily",
          busNumbers: ["TN 33 P 7555", "TN 33 P 7556", "TN 33 P 7557"]
        }
      ]
    },
    {
      operator: "Town Bus Services",
      routes: [
        {
          routeNumber: "12",
          routeName: "Salem Central - Saravana Bhavan - Sankari",
          arrivalTimes: ["Every 20 minutes from 5:00 AM to 10:00 PM"],
          departureTimes: ["Every 20 minutes from 5:10 AM to 10:10 PM"],
          busType: "City Service",
          frequency: "Every 20 minutes",
          busNumbers: ["TN 30 N 8345", "TN 30 N 8355", "TN 30 N 8365"]
        },
        {
          routeNumber: "15A",
          routeName: "Salem Bus Stand - Saravana Bhavan - Sankari",
          arrivalTimes: ["Every 30 minutes from 5:15 AM to 9:45 PM"],
          departureTimes: ["Every 30 minutes from 5:25 AM to 9:55 PM"],
          busType: "City Service",
          frequency: "Every 30 minutes",
          busNumbers: ["TN 30 N 9345", "TN 30 N 9355", "TN 30 N 9365"]
        }
      ]
    }
  ];

  const specialServices = [
    {
      name: "Morning Special",
      description: "Complimentary coffee/tea for passengers at Saravana Bhavan Restaurant from 6:00 AM to 8:00 AM",
      applicableBuses: "All morning buses between 6:00 AM to 8:00 AM"
    },
    {
      name: "Midnight Traveler Package",
      description: "10% discount on late dinner and early morning breakfast for overnight bus passengers",
      applicableBuses: "Buses arriving/departing between 10:00 PM to 6:00 AM"
    },
    {
      name: "Weekend Tourist Special",
      description: "Special buses to Yercaud Hills with breakfast package included",
      applicableBuses: "Weekend tourist specials, advance booking required"
    },
    {
      name: "Business Traveler Combo",
      description: "High-speed WiFi access and coffee package for business travelers",
      applicableBuses: "All AC buses on weekdays"
    }
  ];

  const filteredBusServices = busServices.map(operator => {
    const filteredRoutes = operator.routes.filter(route => {
      // Search term filter
      const searchMatch = route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          route.routeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (route.busNumbers && route.busNumbers.some(num => num.toLowerCase().includes(searchTerm.toLowerCase())));

      // Time filter
      let timeMatch = true;
      if (timeFilter === 'morning') {
        timeMatch = Array.isArray(route.arrivalTimes[0]) ?
            true :
            route.arrivalTimes.some(time => time.includes('AM'));
      } else if (timeFilter === 'afternoon') {
        timeMatch = Array.isArray(route.arrivalTimes[0]) ?
            true :
            route.arrivalTimes.some(time => time.includes('PM') && parseInt(time.split(':')[0]) < 6);
      } else if (timeFilter === 'evening') {
        timeMatch = Array.isArray(route.arrivalTimes[0]) ?
            true :
            route.arrivalTimes.some(time => time.includes('PM') && parseInt(time.split(':')[0]) >= 6);
      }

      return searchMatch && timeMatch;
    });

    return {
      ...operator,
      routes: filteredRoutes
    };
  }).filter(operator => operator.routes.length > 0);

  const toggleRoute = (index) => {
    if (expandedRoute === index) {
      setExpandedRoute(null);
    } else {
      setExpandedRoute(index);
    }
  };

  return (
      <div className="bg-gray-100 min-h-screen">


        {/* Quick Info Bar */}
        <div className="bg-red-900 text-white px-4 py-2">
          <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center mr-4 my-1">
              <MapPin size={14} className="mr-1" />
              <span>{busStopInfo.exactLocation}</span>
            </div>
            <div className="flex items-center mr-4 my-1">
              <Navigation size={14} className="mr-1" />
              <span>{busStopInfo.gpsCoordinates}</span>
            </div>
            <div className="flex items-center mr-4 my-1">
              <Phone size={14} className="mr-1" />
              <span>{busStopInfo.contacts[0]}</span>
            </div>
            <div className="flex items-center my-1">
              <AlertCircle size={14} className="mr-1" />
              <span>45km from Salem Junction</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto">
              <button
                  className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'schedules' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('schedules')}
              >
                <Bus size={16} className="inline mr-1" /> Bus Schedules
              </button>
              <button
                  className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'distances' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('distances')}
              >
                <MapPin size={16} className="inline mr-1" /> Distance Chart
              </button>
              <button
                  className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'amenities' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('amenities')}
              >
                <Coffee size={16} className="inline mr-1" /> Amenities
              </button>
              <button
                  className={`px-4 py-3 font-medium text-sm border-b-2 ${activeTab === 'special' ? 'border-red-600 text-red-600' : 'border-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('special')}
              >
                <Star size={16} className="inline mr-1" /> Special Services
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-6">
          {/* Search and Filter */}
          {activeTab === 'schedules' && (
              <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by route number, destination or bus number..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                          className="appearance-none bg-gray-100 border border-gray-300 text-gray-700 pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                          value={timeFilter}
                          onChange={(e) => setTimeFilter(e.target.value)}
                      >
                        <option value="all">All Times</option>
                        <option value="morning">Morning (AM)</option>
                        <option value="afternoon">Afternoon (12-6 PM)</option>
                        <option value="evening">Evening (After 6 PM)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Bus Schedules Content */}
          {activeTab === 'schedules' && (
              <div className="space-y-6">
                {filteredBusServices.length > 0 ? (
                    filteredBusServices.map((operatorService, opIdx) => (
                        <div key={opIdx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                          <div className="bg-red-700 text-white px-6 py-3">
                            <h3 className="font-bold">{operatorService.operator}</h3>
                          </div>

                          <div className="divide-y divide-gray-200">
                            {operatorService.routes.map((route, routeIdx) => {
                              const routeIdentifier = `${opIdx}-${routeIdx}`;
                              const isExpanded = expandedRoute === routeIdentifier;

                              return (
                                  <div key={routeIdx} className="hover:bg-gray-50">
                                    <div
                                        className="p-4 cursor-pointer"
                                        onClick={() => toggleRoute(routeIdentifier)}
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
                                          <span className="text-gray-600 text-sm hidden md:block">{route.frequency}</span>
                                          {isExpanded ?
                                              <ChevronUp size={18} className="text-gray-500 ml-2" /> :
                                              <ChevronDown size={18} className="text-gray-500 ml-2" />
                                          }
                                        </div>
                                      </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-4 pb-4 pt-1">
                                          <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-red-50 rounded-lg p-3">
                                              <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                <Clock size={15} className="mr-1 text-red-600" /> Arrival Times at Saravana Bhavan:
                                              </h5>
                                              <div className="flex flex-wrap gap-2">
                                                {Array.isArray(route.arrivalTimes[0]) ? (
                                                    <p className="text-sm text-gray-600">{route.arrivalTimes}</p>
                                                ) : (
                                                    route.arrivalTimes.map((time, timeIdx) => (
                                                        <span key={timeIdx} className="bg-white border border-red-200 text-gray-700 px-2 py-1 rounded text-sm">
                                          {time}
                                        </span>
                                                    ))
                                                )}
                                              </div>
                                            </div>

                                            <div className="bg-blue-50 rounded-lg p-3">
                                              <h5 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                                <Clock size={15} className="mr-1 text-blue-600" /> Departure Times from Saravana Bhavan:
                                              </h5>
                                              <div className="flex flex-wrap gap-2">
                                                {Array.isArray(route.departureTimes[0]) ? (
                                                    <p className="text-sm text-gray-600">{route.departureTimes}</p>
                                                ) : (
                                                    route.departureTimes.map((time, timeIdx) => (
                                                        <span key={timeIdx} className="bg-white border border-blue-200 text-gray-700 px-2 py-1 rounded text-sm">
                                          {time}
                                        </span>
                                                    ))
                                                )}
                                              </div>
                                            </div>
                                          </div>

                                          {route.busNumbers && (
                                              <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                                                <h5 className="text-sm font-medium text-gray-700 mb-2">Bus Numbers on this route:</h5>
                                                <div className="flex flex-wrap gap-2">
                                                  {route.busNumbers.map((num, numIdx) => (
                                                      <span key={numIdx} className="bg-gray-200 px-2 py-1 rounded text-xs font-medium text-gray-700">
                                        {num}
                                      </span>
                                                  ))}
                                                </div>
                                              </div>
                                          )}
                                        </div>
                                    )}
                                  </div>
                              );
                            })}
                          </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-white p-8 rounded-lg shadow text-center">
                      <Info size={32} className="mx-auto text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium text-gray-700 mb-1">No bus routes found</h3>
                      <p className="text-gray-500">Try changing your search criteria or filters</p>
                    </div>
                )}
              </div>
          )}

          {/* Distance Chart Content */}
          {activeTab === 'distances' && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-red-700 text-white px-6 py-3">
                  <h3 className="font-bold flex items-center">
                    <MapPin className="mr-2" /> Distance Chart from Saravana Bhavan Hotel
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Distance</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Driving Time</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {cityDistances.map((route, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 text-sm text-gray-700">{route.from}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{route.to}</td>
                          <td className="px-4 py-3 text-sm font-medium text-red-700">{route.distance}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{route.drivingTime}</td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex items-start">
                    <Info size={18} className="text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Located 45km from Salem on NH-44 (Salem-Coimbatore Highway), Saravana Bhavan Hotel serves as a convenient stopover for travelers. All distances are calculated from the hotel's location near Sankari Junction.
                    </p>
                  </div>
                </div>
              </div>
          )}

          {/* Amenities Content */}
          {activeTab === 'amenities' && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                  <h3 className="font-semibold text-red-800 mb-4 flex items-center">
                    <Utensils className="mr-2" /> Restaurant Features
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {busStopInfo.hotelAmenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center bg-red-50 p-3 rounded-lg">
                          <span className="text-red-600 mr-2">•</span>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                  <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <Bus className="mr-2" /> Bus Stop Facilities
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {busStopInfo.facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center bg-blue-50 p-3 rounded-lg">
                          <span className="text-blue-600 mr-2">•</span>
                          <span className="text-gray-700">{facility}</span>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Additional facility notes */}
                <div className="md:col-span-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Facility Highlights</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-red-700 mb-2">For Travelers</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span>24/7 waiting area with security and CCTV surveillance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span>Clean and hygienic restrooms maintained hourly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span>Free WiFi for all bus passengers (2-hour access)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-red-600 mr-2">•</span>
                          <span>Electronic bus arrival display board with real-time updates</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-2">For Diners</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Air-conditioned dining hall with 200+ seating capacity</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Express takeaway counter for travelers in hurry</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Special menu for bus passengers with quick service</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Mobile app ordering available for pre-ordering meals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Special Services Content */}
          {activeTab === 'special' && (
              <div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {specialServices.map((service, idx) => (
                      <div key={idx} className="bg-white rounded-lg shadow-lg p-5 border-t-4 border-red-500">
                        <h3 className="font-bold text-red-800 mb-2">{service.name}</h3>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="bg-gray-50 p-3 rounded text-sm text-gray-500">
                          <span className="font-medium">Applicable for:</span> {service.applicableBuses}
                        </div>
                      </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Info className="mr-2" /> Important Travel Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 border-b border-white/20 pb-1">For Bus Passengers</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Request driver to stop at Saravana Bhavan specifically when boarding</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>All buses announce "Saravana Bhavan Stop" before arrival</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Dedicated pickup zone with clear signage for different bus operators</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Show your bus ticket to get 10% discount at the restaurant</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 border-b border-white/20 pb-1">Travel Tips</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Arrive 15 minutes before scheduled departure time</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Free luggage storage available for dining customers (up to 2 hours)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>Download "TN Bus Track" app for real-time bus tracking</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-red-300">•</span>
                          <span>For bus inquiries, contact TNSTC helpline: 1800-425-6151</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {/* Contact and Help Section */}
          <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Need Help with Bus Information?</h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Phone className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Call Center</h4>
                    <p className="text-gray-600 text-sm">04526-245700</p>
                    <p className="text-gray-500 text-xs mt-1">Available 24x7 for bus inquiries</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email Support</h4>
                    <p className="text-gray-600 text-sm">manager@saravanabhavan.com</p>
                    <p className="text-gray-500 text-xs mt-1">Response within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Information Desk</h4>
                    <p className="text-gray-600 text-sm">Located at hotel entrance</p>
                    <p className="text-gray-500 text-xs mt-1">Get assistance with bus tickets & schedules</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
  );
};

export default SaravanaBhavanBusInfo;