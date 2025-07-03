
# 🚌 Saravana Bhavan Express – Highway Food Pre-Ordering System

**Saravana Bhavan Express** is a mobile-first web application built for **bus passengers traveling on highways** to pre-order food from roadside restaurants before the bus reaches the stop.  
It features **two separate interfaces**:
- **User Frontend** – for travelers to browse menu and place orders
- **Admin Client** – for restaurant staff to manage orders

This ensures **quick service**, reduces wait time, and improves restaurant efficiency.

---

## ✨ Key Features

### 🚀 For Users (Frontend)
- 🧾 Browse food menu in real-time
- 🚍 Track bus and stop locations
- 📍 Live location tracking using Geolocation API
- ⚡ Instant ordering – No login required
- 💳 Online payment via Razorpay
- 📧 Email confirmation after successful order

### 🛠️ For Admin (Client)
- 📦 Manage incoming orders live
- ✅ Mark orders as delivered
- ✍️ Update menu dynamically
- 📊 View analytics on orders & revenue

---

## 🧑‍💻 Live Deployments

| Interface | Purpose           | Hosted Link                                      |
|-----------|-------------------|--------------------------------------------------|
| 🚀 User    | Mobile food ordering | [hotel-1-f248.onrender.com](https://hotel-1-f248.onrender.com) |
| 🛠️ Admin   | Order management     | [hotel-2-zkuz.onrender.com](https://hotel-2-zkuz.onrender.com) |

---

## 📱 Mobile-First Design

Both user and admin interfaces are fully **responsive** and optimized for **mobile devices**, ensuring a smooth experience even on low-bandwidth rural highways.

---

## 🛠️ Tech Stack

| Layer       | Technology                             |
|-------------|-----------------------------------------|
| Frontend    | React.js, Tailwind CSS, Bootstrap 5     |
| Admin Client| React.js (client folder)                |
| Backend     | Node.js, Express.js                     |
| Database    | MongoDB Atlas                           |
| Payments    | Razorpay API                            |
| Email       | EmailJS                                 |
| Location    | Geolocation API (browser-based)         |
| Hosting     | Render                                  |
| Versioning  | Git + GitHub                            |

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ikjasrasool/hotel.git
cd hotel
````

### 2️⃣ Install Dependencies

```bash
# Install root packages (if needed)
npm install

# User frontend
cd frontend
npm install

# Admin client
cd ../client
npm install

# Backend
cd ../Backend
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file inside `/Backend` with the following:

```env
MONGODB_URI=your_mongodb_atlas_uri
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAILJS_CONFIG=your_emailjs_config
```

### 4️⃣ Run Locally

```bash
# Frontend (User Interface)
cd frontend
npm start

# Admin Client
cd ../client
npm start

# Backend
cd ../Backend
npm start
```

---

## 🧑‍🤝‍🧑 Contributors

* 👨‍💻 [Ikjas Rasool](https://github.com/ikjasrasool)
* 👨‍💻 [Kamaleshwaran A](https://github.com/kamaleshwaran-A)
* 👨‍💻 [Krishna Palanisamy](https://github.com/KRISHNAPALANISAMY)

---

## 📜 License

This project is licensed under the **MIT License**.
Feel free to fork, use, or improve it as needed!

---

## 💡 Contribution Guidelines

Want to contribute?

1. Fork the repository
2. Create a new branch

   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes

   ```bash
   git commit -m "Added a new feature"
   ```
4. Push to GitHub

   ```bash
   git push origin feature-name
   ```
5. Submit a Pull Request 🚀

---

## ✅ Purpose

This project solves the issue of **long wait times** at highway restaurants by enabling **bus passengers** to pre-order food that’s ready on arrival.
It’s built to enhance convenience for travelers and improve efficiency for restaurant owners.

> 🚀 *"Fresh food, faster stops – Saravana Bhavan Express transforms highway dining for travelers."*

```

---

Let me know if you want:

- Screenshots section
- API routes & sample response docs
- Deployment workflow badges (Vercel, Render, GitHub Actions)

I'm happy to add those for you!
```
