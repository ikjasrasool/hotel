
# 🚌 Saravana Bhavan Express – Highway Food Pre-Ordering System

Welcome to **Saravana Bhavan Express**, a web application built to ease the food ordering experience for **bus passengers on highways**. This system allows users to **pre-order meals** from nearby restaurants, ensuring **quick and fresh food pickup** during short bus halts.

## ✨ Key Features

- 🚍 **Bus Route Integration** – Lists available buses and their stops for better accuracy.
- 📍 **Live Location Tracking** – Uses the Geolocation API to show the distance from the restaurant for timely ordering.
- 🧑‍🍳 **No-Login Ordering** – Allows guests to place orders without mandatory registration.
- 💳 **Razorpay Integration** – Provides secure online payment options.
- 📧 **Email Confirmation** – Sends order details to users via EmailJS.
- 📊 **Admin Dashboard** – View, update, and manage live orders with analytics.
- 🛠️ **Instant Updates** – Admin can mark orders as delivered and update the menu dynamically.

---

## 🛠️ Tech Stack

| Layer       | Technology                                 |
|-------------|---------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Bootstrap 5         |
| Backend     | Node.js, Express.js                         |
| Database    | MongoDB Atlas                               |
| Payments    | Razorpay API                                |
| Email       | EmailJS                                     |
| Location    | Browser Geolocation API                     |
| Hosting     | Vercel (Frontend), Render (Backend)         |
| Versioning  | Git + GitHub                                |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ikjasrasool/hotel.git
cd hotel
````

### 2. Install Dependencies

```bash
npm install                # For root (if using workspaces)
cd frontend && npm install
cd ../backend && npm install
```

### 3. Configure Environment Variables

Create a `.env` file in `/backend`:

```env
MONGODB_URI=your_mongodb_atlas_uri
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAILJS_CONFIG=your_emailjs_credentials
```

### 4. Run the App

```bash
# Frontend
cd frontend
npm start

# Backend
cd ../backend
npm start
```

---

## 🔗 Live Deployment

* **Frontend**: [hotel-chi-vert.vercel.app](https://hotel-chi-vert.vercel.app)
* **Backend**: Hosted on Render (API details in code)

---

## 🤝 Contributors

* 👨‍💻 [Ikjas Rasool](https://github.com/ikjasrasool)
* 👨‍💻 [Kamaleshwaran A](https://github.com/kamaleshwaran-A)
* 👨‍💻 [Krishna Palanisamy](https://github.com/KRISHNAPALANISAMY)

---

## 📜 License

This project is licensed under the MIT License - feel free to use and modify!

---

## 💡 Contribution

We welcome contributions to improve the platform!
To contribute:

1. Fork this repo
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request 🚀

---

> "Fresh food, faster stops – Saravana Bhavan Express transforms highway dining for travelers."

```

---

You can copy-paste the above content into your `README.md` file. If you want help customizing it further (screenshots, badges, API routes, etc.), feel free to ask!
```
