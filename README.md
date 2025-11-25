# Travel Guardian 🛡️

**Roadside Assistance Web Application for the Indian Market**

![Travel Guardian](https://img.shields.io/badge/Travel-Guardian-orange?style=for-the-badge)
![Made in India](https://img.shields.io/badge/Made%20in-India-green?style=for-the-badge)

## 🚗 Overview

Travel Guardian is a comprehensive roadside assistance web application designed specifically for the Indian market. It helps stranded motorists quickly find and connect with nearby service providers for various vehicle emergencies.

## ✨ Features

### Service Categories
- **🔧 Tire Puncture Repair** - Flat tire? Get it fixed on the spot
- **🚛 Towing Service** - Vehicle breakdown? Get towed to the nearest garage
- **🔋 Battery Jump Start** - Dead battery? Get a jump start or replacement
- **⛽ Fuel Delivery** - Out of fuel? Get emergency fuel delivered
- **🔑 Lockout Assistance** - Locked out? Get back into your vehicle safely
- **🔩 On-Site Mechanic** - Minor repairs? Mechanic comes to you
- **🚨 Accident Assistance** - Accident? Coordinate emergency services
- **❓ Other Help** - Any other roadside emergency

### Key Functionality
- 📍 **GPS Location Detection** - Automatically detects user's current location
- 🗺️ **Google Maps Integration** - Embedded map showing user location
- 📋 **20 Nearby Providers** - Lists closest service providers
- ⭐ **Ratings & Reviews** - See provider ratings and customer reviews
- 💰 **Transparent Pricing** - Clear price breakdown with GST
- 📱 **Multiple Payment Options** - UPI, Cards, Net Banking, Wallets, Cash

### Payment Methods (Demo UI)
- UPI (Google Pay, PhonePe, Paytm)
- Credit/Debit Cards (Visa, Mastercard, RuPay)
- Net Banking
- Wallets (Paytm, Amazon Pay, MobiKwik)
- Cash on Service

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Poppins font family
- **Google Maps Embed API** - Map integration

## 📁 Project Structure

```
opustravelguard/
├── index.html      # Main HTML file
├── styles.css      # Stylesheet
├── app.js          # JavaScript application logic
└── README.md       # Project documentation
```

## 🚀 Getting Started

1. Clone or download the repository
2. Open `index.html` in a web browser
3. Allow location access when prompted (optional)
4. Select a service to see nearby providers

### For Production Use

To enable full Google Maps functionality, replace `YOUR_API_KEY` in `app.js` with a valid Google Maps API key:

```javascript
const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${currentLocation.lat},${currentLocation.lng}&zoom=15`;
```

## 📱 Responsive Design

The application is fully responsive and works on:
- 🖥️ Desktop computers
- 💻 Laptops
- 📱 Tablets
- 📲 Mobile phones

## 🎨 UI/UX Features

- Modern, clean design with orange accent color
- Smooth animations and transitions
- Intuitive step-by-step payment flow
- Toast notifications for user feedback
- Modal dialogs for detailed information
- Emergency button for quick 112 access

## 🔒 Security Note

This is a demonstration application. The payment flow is for UI/UX demonstration purposes only and does not process real payments.

## 📞 Emergency Numbers (India)

- **112** - National Emergency Number
- **108** - Ambulance
- **100** - Police
- **101** - Fire

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Made with ❤️ for Indian motorists