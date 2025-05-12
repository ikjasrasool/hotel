import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Users, MessageSquare, Bus, AlertCircle, Check, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const [formData, setState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    submitted: false,
    error: false
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.name && formData.email && formData.message) {
      emailjs.send(
        "service_xytwow7",
        "template_adhrxk9",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        "EHG8s9Llg3zAyv977"
      )
      .then((result) => {
        console.log(result.text);
        setState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          submitted: true,
          error: false
        });
      })
      .catch((error) => {
        console.log(error.text);
        setState(prev => ({ ...prev, error: true }));
      });
    } else {
      setState(prev => ({ ...prev, error: true }));
    }
  };
  
  

  // Frequently asked questions
  const faqs = [
    {
      question: "How can I pre-order food for my bus journey?",
      answer: "You can pre-order through our website or mobile app. Simply select your food items, specify your expected arrival time, complete payment, and collect your order using the confirmation code when you arrive."
    },
    {
      question: "Do you offer bulk discounts for tour groups?",
      answer: "Yes, we provide special pricing for groups of 15 or more people. Please contact our partnerships team at least 24 hours in advance to arrange group orders."
    },
    {
      question: "What if my bus schedule changes after I've placed an order?",
      answer: "You can modify your expected arrival time up to 30 minutes before the original time. For significant delays, please call our customer service number for assistance."
    }
  ];

  return (
    <div className="p-4 bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8 bg-gradient-to-r from-yellow-700 to-red-700">
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
            <p className="text-xl max-w-2xl">We're here to help with your questions and feedback</p>
          </div>
        </div>
      </div>

      {/* Contact Info and Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-red-700">
            <MessageSquare className="mr-2" size={28} />
            Get In Touch
          </h2>
          <p className="mb-6 text-gray-700">
            Have questions or suggestions? We'd love to hear from you! Our customer service team is available 24/7 to assist with any inquiries.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700">
                  <Phone size={20} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-gray-700">+91 98765 43210 (General Inquiries)</p>
                <p className="text-gray-700">+91 98765 43211 (Order Support)</p>
                <p className="text-gray-600 text-sm mt-1">Available 24/7 for assistance</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700">
                  <Mail size={20} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-700">info@saravanabhavan.com</p>
                <p className="text-gray-700">support@saravanabhavan.com</p>
                <p className="text-gray-600 text-sm mt-1">We respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700">
                  <MapPin size={20} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg mb-1">Location</h3>
                <p className="text-gray-700">NH-44 Highway, Salem-Coimbatore Road</p>
                <p className="text-gray-700">Landmark: 45km from Salem, near Sankari Junction</p>
                <p className="text-gray-600 text-sm mt-1">GPS: 11.5647° N, 78.2345° E</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-700">
                  <Clock size={20} />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg mb-1">Hours</h3>
                <p className="text-gray-700">Restaurant: Open 24/7 for highway travelers</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-300">
                FB
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-300">
                TW
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-300">
                IG
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition duration-300">
                YT
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center text-red-700">
            <Send className="mr-2" size={28} />
            Send a Message
          </h2>

          {formData.submitted ? (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700">
                    Thank you for your message! Our team will get back to you shortly.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            formData.error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      Please fill in all required fields.
                    </p>
                  </div>
                </div>
              </div>
            )
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                  id="phone"
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                  id="subject"
                  type="text"
                  placeholder="Message Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                Message <span className="text-red-600">*</span>
              </label>
              <textarea
                className="shadow-sm border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                id="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="flex items-center mb-4">
              <input id="privacy" type="checkbox" className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500" required />
              <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                I agree to the <a href="#" className="text-red-600 hover:underline">privacy policy</a> and consent to being contacted regarding my inquiry.
              </label>
            </div>

            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 flex items-center"
              type="submit"
            >
              <Send size={18} className="mr-2" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Business Partnerships Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-red-700">
          <Bus className="mr-2" size={28} />
          For Bus Operators & Tour Companies
        </h2>

        <div className="md:flex">
          <div className="md:w-2/3 md:pr-8">
            <p className="mb-4 text-gray-700 leading-relaxed">
              Are you a bus operator interested in partnering with us for your regular routes?
              We offer special arrangements for bus operators to ensure a smooth dining experience for your passengers
              during short breaks.
            </p>
            <p className="mb-6 text-gray-700 leading-relaxed">
              Our team understands the unique challenges of managing passenger meal breaks during long journeys.
              Let us help you enhance your service by providing quick, delicious meals that respect your tight schedule.
            </p>

            <h3 className="text-xl font-bold mb-4">Partnership Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Reserved Parking Area</p>
                  <p className="text-gray-600 text-sm">Dedicated bus parking zone with easy access to restaurant</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Priority Food Preparation</p>
                  <p className="text-gray-600 text-sm">Expedited service for your passengers</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Volume Discounts</p>
                  <p className="text-gray-600 text-sm">Special pricing for regular routes and large groups</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Custom Menu Options</p>
                  <p className="text-gray-600 text-sm">Tailored to your passengers' preferences</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Driver & Staff Benefits</p>
                  <p className="text-gray-600 text-sm">Complimentary meals for drivers and bus staff</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 text-red-600 mt-1">
                  <Check size={18} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold">Group Pre-ordering</p>
                  <p className="text-gray-600 text-sm">Simplified process for collecting passenger orders</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-bold mb-2">Contact Our Partnership Team</h4>
              <p className="text-gray-700 mb-4">
                Email: <span className="font-medium">partnerships@saravanabhavan.com</span><br />
                Contact Person: <span className="font-medium">Pradeep</span>
              </p>
             
             
            </div>
          </div>

          <div className="md:w-1/3 mt-6 md:mt-0">
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <h3 className="text-lg font-bold mb-4 text-red-700">Success Story</h3>
              <div className="mb-4 h-40 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                <img src="https://t4.ftcdn.net/jpg/00/33/37/83/360_F_33378356_gbnqycEE7TWnxa8Og49mkTn6ISTjxjVT.jpg" alt="" />
              </div>
              <br />
              <br />
              <blockquote className="italic text-gray-700 mb-4">
                "Partnering with Saravana Bhavan has improved our passengers' travel experience significantly. The pre-ordering system saves precious break time, and our customers love the food quality."
              </blockquote>
              <p className="font-semibold">- Gopinath R.</p>
              <p className="text-sm text-gray-600">Operations Manager, Tamil Nadu Express Tours</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-red-700">Frequently Asked Questions</h2>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-bold mb-2 flex items-start">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  Q
                </div>
                {faq.question}
              </h3>
              <div className="pl-8">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-700 mb-4">Don't see your question here? Contact us directly!</p>
    
        </div>
      </div>

      {/* Location Map */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-red-700">Find Us</h2>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">From Salem</h3>
            <p className="text-gray-700">
              Take NH-44 towards Coimbatore. Drive approximately 45km. Restaurant will be visible on the right side with ample parking.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">From Coimbatore</h3>
            <p className="text-gray-700">
              Take NH-44 towards Salem. After crossing Sankari, drive about 8km. Restaurant will be on your left with signage.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">Public Transport</h3>
            <p className="text-gray-700">
              All buses traveling on Salem-Coimbatore route make a scheduled stop at our restaurant.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;