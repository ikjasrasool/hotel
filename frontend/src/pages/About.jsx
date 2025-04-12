import React from 'react';
import { MapPin, Phone, Mail, Clock, Award, History, Users, ChefHat, Truck, Globe, Heart } from 'lucide-react';

const About = () => {
  // Timeline data for company history
  const timeline = [
    { year: "1981", event: "First Saravana Bhavan restaurant opened in Chennai" },
    { year: "1992", event: "Expanded to 5 locations across Tamil Nadu" },
    { year: "2000", event: "First highway restaurant opened to serve bus travelers" },
    { year: "2008", event: "Introduced pre-ordering system for highway travelers" },
    { year: "2015", event: "Launched mobile app for seamless pre-ordering" },
    { year: "2022", event: "Renovated highway locations with expanded facilities" }
  ];

  // Team data
  const team = [
    { name: "Rajesh Kumar", position: "Executive Chef", experience: "25+ years in South Indian cuisine" },
    { name: "Priya Venkatesh", position: "Operations Manager", experience: "Ensures smooth service during peak hours" },
    { name: "Anand Rao", position: "Customer Experience Head", experience: "Pioneered our quick service model" }
  ];

  // Values data
  const values = [
    { icon: <ChefHat size={28} />, title: "Authentic Recipes", description: "Traditional South Indian recipes passed down through generations" },
    { icon: <Clock size={28} />, title: "Time Efficiency", description: "Optimized processes to serve travelers with time constraints" },
    { icon: <Award size={28} />, title: "Quality Ingredients", description: "Fresh, locally-sourced ingredients for the best taste" },
    { icon: <Heart size={28} />, title: "Customer Care", description: "Dedicated to making your short break comfortable and satisfying" }
  ];

  return (
    <div className="p-4 bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-yellow-700 to-red-700">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Our Story</h1>
            <p className="text-xl max-w-2xl">Serving authentic South Indian cuisine to highway travelers since 2000</p>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-200 h-64 md:h-auto relative">
            {/* This would be an image in a real implementation */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
              Restaurant Image
            </div>
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-700">Welcome to Saravana Bhavan Highway Restaurant</h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              We understand the challenges faced by bus travelers during short food breaks. With just 10-15 minutes to spare,
              getting food quickly becomes a stressful race against time.
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              That's why we created Saravana Bhavan - a revolutionary pre-ordering system that allows you to browse our menu,
              place your order, and pay online before your bus even arrives at our location.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When your bus stops at our restaurant, simply show your order code at our dedicated pickup counter, collect your freshly prepared food,
              and enjoy your meal without the rush or worry of missing your bus.
            </p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-red-700">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            To transform the travel dining experience by providing quick, delicious, and authentic
            South Indian cuisine that respects travelers' time constraints without compromising on
            taste, quality, or the joy of a satisfying meal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {values.map((value, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition duration-300 border-t-4 border-red-600">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-700 mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Timeline */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center mb-6">
          <History size={28} className="text-red-700 mr-3" />
          <h2 className="text-2xl font-bold text-red-700">Our Journey</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 transform md:translateX-px h-full w-0.5 bg-red-200"></div>

          {/* Timeline items */}
          {timeline.map((item, index) => (
            <div key={index} className={`mb-8 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 flex md:justify-end">
                <div className={`bg-white border border-red-200 rounded-lg p-4 shadow-md max-w-md
                               ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <h3 className="font-bold text-lg text-red-700 mb-2">{item.year}</h3>
                  <p className="text-gray-700">{item.event}</p>
                </div>
              </div>
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-red-600 border-4 border-red-100"></div>
              </div>
              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center mb-6">
          <Users size={28} className="text-red-700 mr-3" />
          <h2 className="text-2xl font-bold text-red-700">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition duration-300">
              <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center text-gray-500">
                {/* Placeholder for team member photo */}
                Photo
              </div>
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-red-700 font-medium mb-2">{member.position}</p>
              <p className="text-gray-600 text-sm">{member.experience}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities & Amenities */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-red-700">Our Facilities & Amenities</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex">
            <div className="flex-shrink-0 flex items-start pt-1">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                <Truck size={20} />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg mb-2">Bus-Friendly Parking</h3>
              <p className="text-gray-700">
                Our spacious parking area is designed to accommodate large vehicles like buses and trucks, making it easy for drivers to park and for passengers to disembark safely.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 flex items-start pt-1">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                <Clock size={20} />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg mb-2">Express Pickup Counter</h3>
              <p className="text-gray-700">
                Dedicated counter for pre-order pickups, ensuring you can collect your food within seconds of arriving, maximizing your break time.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 flex items-start pt-1">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                <Globe size={20} />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg mb-2">Free Wi-Fi</h3>
              <p className="text-gray-700">
                High-speed internet access throughout our premises allows you to check emails, browse social media, or make further travel arrangements during your short break.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="flex-shrink-0 flex items-start pt-1">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700">
                <Award size={20} />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="font-bold text-lg mb-2">Clean Restrooms</h3>
              <p className="text-gray-700">
                Well-maintained restroom facilities for travelers to refresh themselves during their journey breaks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact and Location Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <MapPin size={24} className="text-red-700 mr-2" />
            <h3 className="text-xl font-bold">Our Location</h3>
          </div>
          <div className="mb-6">
            <p className="mb-2 text-gray-700 flex items-center">
              <span className="font-medium w-24">Address:</span>
              <span>NH-44 Highway, Salem-Coimbatore Road</span>
            </p>
            <p className="mb-2 text-gray-700 flex items-center">
              <span className="font-medium w-24">Landmark:</span>
              <span>45km from Salem, near Sankari Junction</span>
            </p>
            <p className="mb-2 text-gray-700 flex items-center">
              <span className="font-medium w-24">GPS:</span>
              <span>11.5647° N, 78.2345° E</span>
            </p>
            <p className="text-gray-700 flex items-center">
              <span className="font-medium w-24">Hours:</span>
              <span>Open 24/7 for highway travelers</span>
            </p>
          </div>

          <div className="w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps?q=Muniyappan+Kovil+Bypass,+Namakkal,+Tamil+Nadu+638008&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>


          <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-yellow-800 text-sm">
              <span className="font-bold">Note for Bus Drivers:</span> Dedicated bus parking available at the east side of our premises.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Phone size={24} className="text-red-700 mr-2" />
            <h3 className="text-xl font-bold">Contact Us</h3>
          </div>

          <div className="mb-6 space-y-4">
            <div className="flex items-start">
              <Phone size={20} className="text-red-700 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-gray-700">+91 98765 43210 (General Inquiries)</p>
                <p className="text-gray-700">+91 98765 43211 (Bulk Orders)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={20} className="text-red-700 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-gray-700">info@saravanabhavan.com</p>
                <p className="text-gray-700">orders@saravanabhavan.com (Pre-orders)</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock size={20} className="text-red-700 mr-3 mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Contact Hours</p>
                <p className="text-gray-700">Customer Support: 24/7</p>
                <p className="text-gray-700">Management: 9:00 AM - 6:00 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold mb-3">For Bus Operators & Tour Groups:</h4>
            <p className="text-gray-700 mb-4">
              We offer special packages and dedicated service for regular bus operators and tour groups.
              Contact our business development team to set up a partnership.
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Contact:</span> Mr. Anand Rao<br />
              <span className="font-medium">Phone:</span> +91 98765 43212<br />
              <span className="font-medium">Email:</span> partnerships@saravanabhavan.com
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-red-700">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">How early should I place my pre-order?</h3>
            <p className="text-gray-700">
              We recommend placing your order at least 30 minutes before your expected arrival to ensure
              your food is freshly prepared and ready for pickup when you arrive.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">What if my bus arrives late?</h3>
            <p className="text-gray-700">
              We understand that travel schedules can change. Your food will be kept fresh and ready for up to
              30 minutes after your specified arrival time. For longer delays, please contact us to reschedule your order.
            </p>
          </div>

          <div className="border-b pb-4">
            <h3 className="font-bold text-lg mb-2">Do you cater to special dietary requirements?</h3>
            <p className="text-gray-700">
              Yes, we offer vegetarian, vegan, gluten-free, and Jain options. You can specify your dietary
              requirements when placing your order.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Can I modify or cancel my order?</h3>
            <p className="text-gray-700">
              Orders can be modified or canceled up to 20 minutes before your scheduled arrival time through
              our app or website. For assistance with last-minute changes, please call our customer support.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg shadow-lg p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Hassle-Free Dining?</h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Download our app or browse our menu online to pre-order your meal and make the most of your travel break.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">

          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-red-700 px-8 py-3 rounded-full font-bold transition duration-300">
            Browse Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;