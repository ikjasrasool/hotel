import React from 'react';

const About = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Welcome to Saravana Bhavan Highway Restaurant</h2>
          <p className="mb-4">
            We understand the challenges faced by bus travelers during short food breaks. With just 10-15 minutes to spare,
            getting food quickly becomes a stressful race against time.
          </p>
          <p className="mb-4">
            That's why we created Saravana Bhavan - a revolutionary pre-ordering system that allows you to browse our menu,
            place your order, and pay online before your bus even arrives at our location.
          </p>
          <p>
            When your bus stops at our restaurant, simply show your order code, collect your freshly prepared food,
            and enjoy your meal without the rush or worry of missing your bus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Our Location</h3>
          <p className="mb-2">NH-44 Highway, Salem-Coimbatore Road</p>
          <p className="mb-2">Landmark: 45km from Salem</p>
          <p>Open 24/7 for highway travelers</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p className="mb-2">Phone: +91 98765 43210</p>
          <p className="mb-2">Email: info@saravanabhavan.com</p>
          <p>For bulk orders or special requests, please contact us in advance</p>
        </div>
      </div>
    </div>
  );
};

export default About;