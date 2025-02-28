import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderCode, setOrderCode] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Enhanced menu items with more categories and items
  const menuItems = [
    // Main Meals - Veg
    { id: 1, name: 'South Indian Thali', price: 150, image: 'https://cdn.pixabay.com/photo/2019/09/16/14/43/food-4481146_1280.jpg', category: 'veg', type: 'meals', prepTime: '5 min', description: 'Complete meal with rice, sambar, rasam, kootu, poriyal, curd, and papad' },
    { id: 2, name: 'North Indian Thali', price: 170, image: 'https://cdn.pixabay.com/photo/2017/08/25/15/10/thali-2680201_1280.jpg', category: 'veg', type: 'meals', prepTime: '6 min', description: 'Roti, paneer curry, dal, rice, raita, and papad' },
    { id: 3, name: 'Veg Pulao', price: 120, image: 'https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158702_1280.jpg', category: 'veg', type: 'meals', prepTime: '5 min', description: 'Fragrant rice cooked with fresh vegetables and aromatic spices' },

    // Main Meals - Non-Veg
    { id: 4, name: 'Chicken Biryani', price: 180, image: 'https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049_1280.jpg', category: 'non-veg', type: 'meals', prepTime: '8 min', description: 'Aromatic basmati rice with tender chicken pieces and spices' },
    { id: 5, name: 'Mutton Biryani', price: 220, image: 'https://cdn.pixabay.com/photo/2017/07/28/14/28/mutton-biryani-2548804_1280.jpg', category: 'non-veg', type: 'meals', prepTime: '8 min', description: 'Rich and flavorful biryani with tender mutton pieces' },
    { id: 6, name: 'Fish Curry Meals', price: 200, image: 'https://cdn.pixabay.com/photo/2018/08/29/19/01/salmon-curry-3640967_1280.jpg', category: 'non-veg', type: 'meals', prepTime: '7 min', description: 'Rice with spicy fish curry, served with sides' },

    // South Indian
    { id: 7, name: 'Masala Dosa', price: 90, image: 'https://cdn.pixabay.com/photo/2017/01/26/16/15/masala-dosa-2010962_1280.jpg', category: 'veg', type: 'south-indian', prepTime: '4 min', description: 'Crispy rice crepe filled with spiced potato filling' },
    { id: 8, name: 'Plain Dosa', price: 70, image: 'https://cdn.pixabay.com/photo/2022/04/01/16/03/dosa-7105578_1280.jpg', category: 'veg', type: 'south-indian', prepTime: '3 min', description: 'Thin, crispy rice crepe served with sambar and chutney' },
    { id: 9, name: 'Idli Sambar', price: 60, image: 'https://cdn.pixabay.com/photo/2017/08/25/20/01/idli-2681088_1280.jpg', category: 'veg', type: 'south-indian', prepTime: '3 min', description: 'Soft, steamed rice cakes served with sambar and chutney' },
    { id: 10, name: 'Pongal', price: 80, image: 'https://cdn.pixabay.com/photo/2022/03/07/18/32/food-7054754_1280.jpg', category: 'veg', type: 'south-indian', prepTime: '5 min', description: 'Savory rice and lentil porridge with pepper and cumin' },

    // North Indian
    { id: 11, name: 'Chole Bhature', price: 110, image: 'https://cdn.pixabay.com/photo/2019/11/14/11/10/chole-bhature-4625662_1280.jpg', category: 'veg', type: 'north-indian', prepTime: '5 min', description: 'Spicy chickpea curry served with fried bread' },
    { id: 12, name: 'Paneer Butter Masala', price: 160, image: 'https://cdn.pixabay.com/photo/2020/02/24/04/25/indian-4875339_1280.jpg', category: 'veg', type: 'north-indian', prepTime: '6 min', description: 'Cottage cheese cubes in rich tomato and butter gravy' },
    { id: 13, name: 'Kadai Chicken', price: 180, image: 'https://cdn.pixabay.com/photo/2019/11/15/15/54/chicken-curry-4628163_1280.jpg', category: 'non-veg', type: 'north-indian', prepTime: '7 min', description: 'Spicy chicken curry cooked with bell peppers and kadai masala' },
    { id: 14, name: 'Butter Naan', price: 40, image: 'https://cdn.pixabay.com/photo/2019/11/02/20/30/naan-4597758_1280.jpg', category: 'veg', type: 'north-indian', prepTime: '4 min', description: 'Soft, buttered leavened bread from the tandoor' },

    // Snacks
    { id: 15, name: 'Samosa', price: 25, image: 'https://cdn.pixabay.com/photo/2017/08/25/16/24/samosa-2680482_1280.jpg', category: 'veg', type: 'snacks', prepTime: '2 min', description: 'Crispy pastry filled with spiced potatoes and peas' },
    { id: 16, name: 'Vada Pav', price: 40, image: 'https://cdn.pixabay.com/photo/2018/07/14/21/30/vegetarian-food-3538155_1280.jpg', category: 'veg', type: 'snacks', prepTime: '3 min', description: 'Spicy potato fritter in a bun with chutneys' },
    { id: 17, name: 'Pakora Plate', price: 60, image: 'https://cdn.pixabay.com/photo/2022/01/29/18/37/veg-6977354_1280.jpg', category: 'veg', type: 'snacks', prepTime: '3 min', description: 'Assorted vegetable fritters served with mint chutney' },
    { id: 18, name: 'Chicken 65', price: 120, image: 'https://cdn.pixabay.com/photo/2022/03/10/02/48/chicken-65-7058907_1280.jpg', category: 'non-veg', type: 'snacks', prepTime: '4 min', description: 'Spicy, deep-fried chicken flavored with red chillies' },

    // Breads
    { id: 19, name: 'Parotta', price: 40, image: 'https://cdn.pixabay.com/photo/2022/04/19/08/02/parotta-7142263_1280.jpg', category: 'veg', type: 'breads', prepTime: '4 min', description: 'Layered, flaky South Indian flatbread' },
    { id: 20, name: 'Chapati (2 pcs)', price: 30, image: 'https://cdn.pixabay.com/photo/2020/06/05/23/58/chapati-5265170_1280.jpg', category: 'veg', type: 'breads', prepTime: '3 min', description: 'Whole wheat flatbread, perfect with curries' },
    { id: 21, name: 'Garlic Naan', price: 50, image: 'https://cdn.pixabay.com/photo/2018/11/11/11/29/naan-3808673_1280.jpg', category: 'veg', type: 'breads', prepTime: '4 min', description: 'Tandoor-baked flatbread topped with garlic and butter' },

    // Drinks
    { id: 22, name: 'Buttermilk', price: 30, image: 'https://cdn.pixabay.com/photo/2019/08/08/14/35/buttermilk-4392940_1280.jpg', category: 'veg', type: 'drinks', prepTime: '1 min', description: 'Refreshing yogurt-based drink with spices and herbs' },
    { id: 23, name: 'Fresh Lime Soda', price: 40, image: 'https://cdn.pixabay.com/photo/2016/10/10/13/59/lime-1728140_1280.jpg', category: 'veg', type: 'drinks', prepTime: '2 min', description: 'Sweet or salty, refreshing lime juice with soda' },
    { id: 24, name: 'Mango Lassi', price: 60, image: 'https://cdn.pixabay.com/photo/2020/05/13/13/23/mango-lassi-5167809_1280.jpg', category: 'veg', type: 'drinks', prepTime: '2 min', description: 'Thick, creamy yogurt drink with sweet mango pulp' },
    { id: 25, name: 'Masala Chai', price: 25, image: 'https://cdn.pixabay.com/photo/2016/03/27/19/23/chai-1283881_1280.jpg', category: 'veg', type: 'drinks', prepTime: '3 min', description: 'Spiced Indian tea with milk' },

    // Desserts
    { id: 26, name: 'Gulab Jamun (2 pcs)', price: 50, image: 'https://cdn.pixabay.com/photo/2020/08/31/15/41/gulab-jamun-5532480_1280.jpg', category: 'veg', type: 'desserts', prepTime: '1 min', description: 'Soft, sweet dumplings soaked in rose-flavored syrup' },
    { id: 27, name: 'Rasgulla (2 pcs)', price: 50, image: 'https://cdn.pixabay.com/photo/2017/08/24/13/42/sweet-2676982_1280.jpg', category: 'veg', type: 'desserts', prepTime: '1 min', description: 'Soft cheese balls in sweet syrup' },
    { id: 28, name: 'Payasam Cup', price: 60, image: 'https://cdn.pixabay.com/photo/2022/02/16/13/25/kheer-7016674_1280.jpg', category: 'veg', type: 'desserts', prepTime: '2 min', description: 'Sweet rice or vermicelli pudding with nuts' },
    { id: 29, name: 'Jalebi', price: 40, image: 'https://cdn.pixabay.com/photo/2021/05/31/10/18/jalebi-6297924_1280.jpg', category: 'veg', type: 'desserts', prepTime: '2 min', description: 'Crispy, spiral-shaped sweets soaked in sugar syrup' },

    // Quick Combo Meals
    { id: 30, name: 'Express Veg Combo', price: 150, image: 'https://cdn.pixabay.com/photo/2018/03/31/19/29/schnitzel-3279045_1280.jpg', category: 'veg', type: 'combo', prepTime: '3 min', description: 'Mini thali with rice, 2 rotis, dal, sabzi, and raita' },
    { id: 31, name: 'Express Non-Veg Combo', price: 180, image: 'https://cdn.pixabay.com/photo/2017/08/08/09/44/food-photography-2610863_1280.jpg', category: 'non-veg', type: 'combo', prepTime: '4 min', description: 'Rice, roti, chicken curry, and raita' },
    { id: 32, name: 'Snack Combo', price: 120, image: 'https://cdn.pixabay.com/photo/2019/06/25/13/59/city-4298285_1280.jpg', category: 'veg', type: 'combo', prepTime: '2 min', description: 'Samosa, vada, and chai - perfect quick snack' }
  ];

  // Food categories
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'meals', name: 'Meals' },
    { id: 'south-indian', name: 'South Indian' },
    { id: 'north-indian', name: 'North Indian' },
    { id: 'snacks', name: 'Quick Snacks' },
    { id: 'breads', name: 'Breads' },
    { id: 'drinks', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'combo', name: 'Express Combos' }
  ];

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item =>
        item.id === id ? {...item, quantity: item.quantity - 1} : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setOrderCode(randomCode);
    setOrderPlaced(true);
  };

  const filteredMenuItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.type === activeCategory);

  const renderHome = () => (
    <div className="p-4">
      <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
        <img src="https://cdn.pixabay.com/photo/2019/03/31/07/43/highway-4092285_1280.jpg" alt="Highway Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
          <h1 className="text-4xl font-bold mb-2">RoadEats</h1>
          <p className="text-xl mb-4">Pre-order your food for quick pickup during bus breaks</p>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold"
            onClick={() => setActiveTab('menu')}
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Save Time</h3>
          <p>Pre-order your food before your bus arrives so it's ready when you get here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Skip Lines</h3>
          <p>No waiting in queue. Simply collect your pre-paid order from our pickup counter.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2 text-red-600">Guaranteed Service</h3>
          <p>Your food is prepared in advance to ensure you get back to your bus on time.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">1</div>
            <p>Browse menu & place order</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">2</div>
            <p>Pay securely online</p>
          </div>
          <div className="text-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">3</div>
            <p>Receive order code</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">4</div>
            <p>Collect your order when you arrive</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.slice(0, 6).map(item => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{item.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${item.category === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.category === 'veg' ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="font-bold">₹{item.price}</p>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                    onClick={() => addToCart(item)}
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
            onClick={() => setActiveTab('menu')}
          >
            View Full Menu
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Bus Passenger Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-1">No Missing Your Bus</h3>
              <p className="text-gray-600">Your food is ready exactly when you arrive, so you won't risk delaying your journey.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-1">Exclusive Bus Passenger Discounts</h3>
              <p className="text-gray-600">Special prices for bus travelers - just show your ticket at pickup.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-1">Express Pickup Counter</h3>
              <p className="text-gray-600">Dedicated counter for pre-ordered meals ensures quick service.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                ✓
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-1">Travel-Friendly Packaging</h3>
              <p className="text-gray-600">All orders come in spill-proof containers perfect for eating on the go.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMenu = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-4 min-w-max">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredMenuItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${item.category === 'veg' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.category === 'veg' ? 'Veg' : 'Non-Veg'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-3">{item.description}</p>
              <p className="text-gray-500 text-sm mb-2">Prep time: {item.prepTime}</p>
              <div className="flex justify-between items-center">
                <p className="font-bold">₹{item.price}</p>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                  onClick={() => addToCart(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">About Us</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <img src="https://cdn.pixabay.com/photo/2019/03/10/22/20/tollgate-4048358_1280.jpg" alt="Highway Restaurant" className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Welcome to RoadEats Highway Restaurant</h2>
          <p className="mb-4">
            We understand the challenges faced by bus travelers during short food breaks. With just 10-15 minutes to spare,
            getting food quickly becomes a stressful race against time.
          </p>
          <p className="mb-4">
            That's why we created RoadEats - a revolutionary pre-ordering system that allows you to browse our menu,
            place your order, and pay online before your bus even arrives at our location.
          </p>
          <p className="mb-4">
            When your bus stops at our restaurant, simply show your order code, collect your freshly prepared food,
            and enjoy your meal without the rush or worry of missing your bus.
          </p>
          <p>
            Our certified kitchen ensures all food is prepared with the highest standards of hygiene and quality,
            making us the preferred choice for bus operators and travelers on the Salem-Coimbatore route.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Our Location</h3>
          <p className="mb-2">NH-44 Highway, Salem-Coimbatore Road</p>
          <p className="mb-2">Landmark: 45km from Salem</p>
          <p className="mb-4">Open 24/7 for highway travelers</p>
          <div className="bg-gray-200 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-700">Map showing location would be displayed here</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-3">Contact Us</h3>
          <p className="mb-2">Phone: +91 98765 43210</p>
          <p className="mb-2">Email: info@roadeats.com</p>
          <p className="mb-2">For bulk orders or special requests, please contact us in advance</p>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-bold mb-2">Operating Hours</h4>
            <p className="text-sm">Restaurant: Open 24/7</p>
            <p className="text-sm">Online Ordering: 24/7</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Our Story</h3>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-0 md:pr-4 mb-4 md:mb-0">
            <p className="mb-3">
              Founded in 2020, RoadEats was born from a simple observation: highway travelers on buses rarely have enough time to eat properly during short breaks.
            </p>
            <p className="mb-3">
              Our founder, a frequent bus traveler himself, noticed how passengers would rush into restaurants, stand in long queues, and often have to either eat hurriedly or carry half-finished meals back to the bus.
            </p>
            <p>
              With a background in technology and a passion for food, he developed the RoadEats concept - a pre-ordering system specifically designed for bus travelers with time constraints.
            </p>
          </div>
          <div className="md:w-1/2 pl-0 md:pl-4">
            <img src="https://cdn.pixabay.com/photo/2016/11/18/22/21/restaurant-1837150_1280.jpg" alt="Restaurant Story" className="w-full h-64 object-cover rounded-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-bold mb-4">Our Promise</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-red-600 text-2xl">✓</span>
                        </div>
                        <h4 className="font-bold mb-2">Quality Food</h4>
                        <p className="text-sm">Fresh ingredients and authentic recipes prepared by experienced chefs</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-red-600 text-2xl">✓</span>
                        </div>
                        <h4 className="font-bold mb-2">Quick Service</h4>
                        <p className="text-sm">Guaranteed order readiness when your bus arrives at our stop</p>
                      </div>
                      <div className="text-center p-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-red-600 text-2xl">✓</span>
                        </div>
                        <h4 className="font-bold mb-2">Travel-Friendly</h4>
                        <p className="text-sm">Special packaging designed for easy consumption during your journey</p>
                      </div>
                    </div>
                  </div>
                </div>
              );

              const renderCart = () => (
                <div className="p-4">
                  <h1 className="text-2xl font-bold mb-4">Your Order</h1>

                  {orderPlaced ? (
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-600 text-4xl">✓</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
                      <p className="mb-6">Your order has been confirmed and will be ready for pickup.</p>

                      <div className="bg-gray-100 p-4 rounded-lg mb-6 inline-block">
                        <h3 className="text-lg font-bold mb-2">Your Order Code</h3>
                        <p className="text-3xl font-bold text-red-600 letter-spacing-wide">{orderCode}</p>
                      </div>

                      <div className="mb-6">
                        <p className="mb-2">Show this code at our pickup counter when you arrive.</p>
                        <p className="text-sm text-gray-600">Your order will be kept ready for 2 hours from the time of ordering.</p>
                      </div>

                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
                        onClick={() => {
                          setOrderPlaced(false);
                          setCart([]);
                          setShowCart(false);
                          setActiveTab('home');
                        }}
                      >
                        Back to Home
                      </button>
                    </div>
                  ) : (
                    <>
                      {cart.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-6 text-center">
                          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-gray-400 text-4xl">🛒</span>
                          </div>
                          <h2 className="text-xl font-bold mb-2">Your Order is Empty</h2>
                          <p className="mb-6">Add some delicious items from our menu to get started.</p>
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full"
                            onClick={() => setActiveTab('menu')}
                          >
                            Browse Menu
                          </button>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                          <div className="p-4 bg-gray-50 border-b">
                            <h2 className="font-bold">Order Summary</h2>
                          </div>
                          <div className="divide-y">
                            {cart.map(item => (
                              <div key={item.id} className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                                  <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  <p className="font-bold mr-4">₹{item.price * item.quantity}</p>
                                  <div className="flex items-center border rounded">
                                    <button
                                      className="px-3 py-1 text-red-600"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      -
                                    </button>
                                    <span className="px-3 py-1 border-l border-r">{item.quantity}</span>
                                    <button
                                      className="px-3 py-1 text-red-600"
                                      onClick={() => addToCart(item)}
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="p-4 bg-gray-50 border-t">
                            <div className="flex justify-between mb-2">
                              <span>Subtotal</span>
                              <span>₹{getTotalPrice()}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span>Packaging Charge</span>
                              <span>₹20</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t">
                              <span>Total</span>
                              <span>₹{getTotalPrice() + 20}</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <button
                              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
                              onClick={placeOrder}
                            >
                              Place Order
                            </button>
                            <p className="text-center mt-3 text-sm text-gray-600">
                              Your order will be prepared when you arrive at our restaurant
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              );

              return (
                <div className="min-h-screen bg-gray-100">
                  {/* Header */}
                  <header className="bg-white shadow-md p-4">
                    <div className="container mx-auto flex justify-between items-center">
                      <div className="flex items-center">
                        <h1 className="text-xl font-bold text-red-600">RoadEats</h1>
                        <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Highway Restaurant</span>
                      </div>
                      <nav className="hidden md:flex space-x-6">
                        <button
                          className={`${activeTab === 'home' ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-red-600'}`}
                          onClick={() => setActiveTab('home')}
                        >
                          Home
                        </button>
                        <button
                          className={`${activeTab === 'menu' ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-red-600'}`}
                          onClick={() => setActiveTab('menu')}
                        >
                          Menu
                        </button>
                        <button
                          className={`${activeTab === 'about' ? 'text-red-600 font-bold' : 'text-gray-600 hover:text-red-600'}`}
                          onClick={() => setActiveTab('about')}
                        >
                          About
                        </button>
                      </nav>
                      <button
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-full flex items-center"
                        onClick={() => setShowCart(true)}
                      >
                        Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                      </button>
                    </div>
                  </header>

                  {/* Mobile Navigation */}
                  <div className="md:hidden bg-white border-t shadow-sm fixed bottom-0 left-0 right-0 z-10">
                    <div className="flex justify-around">
                      <button
                        className={`flex flex-col items-center py-2 w-1/3 ${activeTab === 'home' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('home')}
                      >
                        <span>🏠</span>
                        <span className="text-xs">Home</span>
                      </button>
                      <button
                        className={`flex flex-col items-center py-2 w-1/3 ${activeTab === 'menu' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('menu')}
                      >
                        <span>🍽️</span>
                        <span className="text-xs">Menu</span>
                      </button>
                      <button
                        className={`flex flex-col items-center py-2 w-1/3 ${activeTab === 'about' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('about')}
                      >
                        <span>ℹ️</span>
                        <span className="text-xs">About</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Content */}
                  <main className="container mx-auto pb-20 md:pb-8">
                    {activeTab === 'home' && renderHome()}
                    {activeTab === 'menu' && renderMenu()}
                    {activeTab === 'about' && renderAbout()}
                    {showCart && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto p-4">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative">
                          <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowCart(false)}
                          >
                            ✕
                          </button>
                          {renderCart()}
                        </div>
                      </div>
                    )}
                  </main>

                  {/* Footer */}
                  <footer className="bg-gray-800 text-white p-6 md:p-8">
                    <div className="container mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                          <h3 className="text-lg font-bold mb-4">RoadEats</h3>
                          <p className="mb-4">Making highway dining convenient for bus travelers.</p>
                          <p className="text-sm">© 2025 RoadEats. All rights reserved.</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                          <ul className="space-y-2">
                            <li><button className="text-gray-300 hover:text-white" onClick={() => setActiveTab('home')}>Home</button></li>
                            <li><button className="text-gray-300 hover:text-white" onClick={() => setActiveTab('menu')}>Menu</button></li>
                            <li><button className="text-gray-300 hover:text-white" onClick={() => setActiveTab('about')}>About Us</button></li>
                            <li><button className="text-gray-300 hover:text-white">Contact</button></li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                          <p className="mb-2">NH-44 Highway, Salem-Coimbatore Road</p>
                          <p className="mb-2">Phone: +91 98765 43210</p>
                          <p>Email: info@roadeats.com</p>
                        </div>
                      </div>
                    </div>
                  </footer>
                </div>
              );
            };

            export default App;