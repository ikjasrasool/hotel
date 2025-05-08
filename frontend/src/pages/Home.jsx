import React from 'react';
import { Star, Clock, Award, MapPin, Utensils, ThumbsUp } from 'lucide-react';

const Home = ({ setActiveTab }) => {
  // Sample special offers data
  const specialOffers = [
    { name: "Masala Dosa", description: "Crispy crepe filled with spiced potato", price: "₹120", discount: "10% off" },
    { name: "Mini Meals", description: "Complete meal with rice, sambar, and more", price: "₹180", discount: "15% off" },
    { name: "Combo Pack", description: "Idli, Vada, Dosa with chutney & sambar", price: "₹220", discount: "20% off" }
  ];

  // Sample testimonials data
  const testimonials = [
    { name: "Raj Kumar", comment: "The best South Indian food I've had during my travels. Quick service is perfect for bus breaks!", rating: 5 },
    { name: "Priya Singh", comment: "Pre-ordering saved us so much time. The food was hot and ready when we arrived.", rating: 5 },
    { name: "Michael Chen", comment: "Authentic flavors and excellent service. Will definitely order again!", rating: 4 }
  ];

  return (
    <div className="p-4 bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-yellow-800 to-red-800">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-5xl font-bold mb-2 text-center">Saravana Bhavan</h1>
          <p className="text-2xl mb-2 text-center">Authentic South Indian Cuisine</p>
          <p className="text-xl mb-6 text-center">Pre-order your food for quick pickup during bus breaks</p>
          <div className="flex space-x-4">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition duration-300 transform hover:scale-105"
              onClick={() => navigate('/menu')}
            >
              Order Now
            </button>
            <button
              className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white px-8 py-3 rounded-full font-bold transition duration-300"
              onClick={() => setActiveTab('about')}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Restaurant Stats */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Utensils className="text-red-600 mb-2" size={32} />
            <p className="text-2xl font-bold">50+</p>
            <p className="text-gray-600">Authentic Dishes</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="text-red-600 mb-2" size={32} />
            <p className="text-2xl font-bold">15 min</p>
            <p className="text-gray-600">Average Prep Time</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="text-red-600 mb-2" size={32} />
            <p className="text-2xl font-bold">4.8/5</p>
            <p className="text-gray-600">Customer Rating</p>
          </div>
          <div className="flex flex-col items-center">
            <ThumbsUp className="text-red-600 mb-2" size={32} />
            <p className="text-2xl font-bold">10000+</p>
            <p className="text-gray-600">Happy Customers</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
          <h3 className="text-xl font-bold mb-2 text-red-600">Save Time</h3>
          <p className="text-gray-700">Pre-order your food before your bus arrives so it's ready when you get here. Perfect for travelers on a tight schedule.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
          <h3 className="text-xl font-bold mb-2 text-red-600">Skip Lines</h3>
          <p className="text-gray-700">No waiting in queue. Simply collect your pre-paid order from our dedicated pickup counter and make the most of your break time.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border-t-4 border-red-600">
          <h3 className="text-xl font-bold mb-2 text-red-600">Guaranteed Service</h3>
          <p className="text-gray-700">Your food is prepared in advance to ensure you get back to your bus on time. We understand the importance of punctuality.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-center mb-4 md:mb-0 relative">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-bold mb-2">Browse & Order</h4>
            <p className="text-gray-700 px-2">Browse our menu & place your order at least 30 minutes before arrival</p>
          </div>
          <div className="hidden md:block w-16 border-t-2 border-dashed border-red-600 self-center"></div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-bold mb-2">Secure Payment</h4>
            <p className="text-gray-700 px-2">Pay securely online using credit card, UPI, or other payment methods</p>
          </div>
          <div className="hidden md:block w-16 border-t-2 border-dashed border-red-600 self-center"></div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-bold mb-2">Confirmation</h4>
            <p className="text-gray-700 px-2">Receive an order code and confirmation on your mobile device</p>
          </div>
          <div className="hidden md:block w-16 border-t-2 border-dashed border-red-600 self-center"></div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">4</div>
            <h4 className="font-bold mb-2">Quick Pickup</h4>
            <p className="text-gray-700 px-2">Show your code at our dedicated counter and collect your meal</p>
          </div>
        </div>
      </div>


      {/* Testimonials Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-4 border rounded-lg bg-gray-50 hover:shadow-md transition duration-300">
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-500 fill-current" size={16} />
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">"{testimonial.comment}"</p>
              <p className="font-bold text-sm text-right">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location & Hours Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <MapPin className="mr-2 text-red-600" size={24} />
            Our Location
          </h2>
          <p className="mb-2"><span className="font-bold">Address:</span> Bus Terminal Complex, National Highway 44</p>
          <p className="mb-4"><span className="font-bold">Landmarks:</span> Next to Central Bus Station, opposite Highway Police Station</p>
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

        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Clock className="mr-2 text-red-600" size={24} />
            Opening Hours
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-bold">Monday - Friday:</p>
              <p>6:00 AM - 11:00 PM</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Saturday & Sunday:</p>
              <p>6:00 AM - 12:00 AM</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Special Hours:</p>
              <p>24/7 for Bus Travelers</p>
            </div>
          </div>
          <div className="mt-6 p-3 bg-green-100 border-l-4 border-green-600 rounded">
            <p className="text-green-800"><span className="font-bold">Note:</span> Our kitchen maintains continuous service to accommodate all bus schedules, ensuring you can enjoy hot, fresh food no matter when you arrive.</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 p-8 rounded-lg shadow-lg text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience Authentic South Indian Flavors?</h2>
        <p className="text-xl mb-6">Order now and have your food ready when you arrive!</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-white text-red-600 hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition duration-300 transform hover:scale-105"
            onClick={() => setActiveTab('menu')}
          >
            Order Food
          </button>
          <button
            className="bg-transparent border-2 border-white hover:bg-white hover:text-red-600 text-white px-8 py-3 rounded-full font-bold transition duration-300"
            onClick={() => setActiveTab('contact')}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;