import React from 'react';

const Menu = () => {
  const menuCategories = [
    {
      id: 1,
      name: 'South Indian Specials',
      items: ['Veg Meals', 'Masala Dosa', 'Idli Sambar', 'Vada', 'Pongal']
    },
    {
      id: 2,
      name: 'Rice Varieties',
      items: ['Curd Rice', 'Lemon Rice', 'Tomato Rice', 'Tamarind Rice', 'Coconut Rice']
    },
    {
      id: 3,
      name: 'Breads',
      items: ['Parotta', 'Chapati', 'Naan', 'Poori', 'Batura']
    },
    {
      id: 4,
      name: 'Curries',
      items: ['Paneer Butter Masala', 'Kadai Paneer', 'Vegetable Kurma', 'Dal Fry', 'Mixed Veg Curry']
    }
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>

      {menuCategories.map(category => (
        <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="bg-red-600 text-white p-3">
            <h2 className="text-xl font-bold">{category.name}</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {category.items.map((item, index) => (
                <li key={index} className="border-b pb-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Special Dietary Requirements</h2>
        <p>Please inform our staff about any allergies or dietary restrictions when placing your order.</p>
      </div>
    </div>
  );
};

export default Menu;