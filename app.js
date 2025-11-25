// Travel Guardian - Roadside Assistance App for India
// Main JavaScript Application

// Global State
let currentLocation = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi
let selectedService = null;
let selectedProvider = null;
let currentPaymentStep = 1;
let providers = [];

// Service Types Configuration
const serviceTypes = {
    tire: {
        name: 'Tire Puncture Repair',
        icon: 'fa-circle-notch',
        basePrice: 300,
        description: 'Flat tire? We\'ll fix it or replace it on the spot.'
    },
    tow: {
        name: 'Towing Service',
        icon: 'fa-truck-pickup',
        basePrice: 1500,
        description: 'Vehicle breakdown? We\'ll tow you to the nearest garage.'
    },
    battery: {
        name: 'Battery Jump Start',
        icon: 'fa-car-battery',
        basePrice: 400,
        description: 'Dead battery? We\'ll jump start or replace it.'
    },
    fuel: {
        name: 'Fuel Delivery',
        icon: 'fa-gas-pump',
        basePrice: 200,
        description: 'Out of fuel? We\'ll deliver fuel to your location.'
    },
    keys: {
        name: 'Lockout Assistance',
        icon: 'fa-key',
        basePrice: 500,
        description: 'Locked out? We\'ll help you get back in safely.'
    },
    mechanic: {
        name: 'On-Site Mechanic',
        icon: 'fa-wrench',
        basePrice: 600,
        description: 'Need repairs? Our mechanic will come to you.'
    },
    accident: {
        name: 'Accident Assistance',
        icon: 'fa-car-crash',
        basePrice: 0,
        description: 'Accident? We\'ll coordinate emergency services.'
    },
    other: {
        name: 'Other Assistance',
        icon: 'fa-ellipsis-h',
        basePrice: 400,
        description: 'Need something else? We\'re here to help.'
    }
};

// Mock Provider Data (simulating 20 nearby providers)
const mockProviders = [
    { id: 1, name: 'Quick Fix Auto Services', rating: 4.8, reviews: 245, distance: 0.5, eta: '5-10 mins', phone: '+91 98765 43210', address: 'Shop 12, MG Road', verified: true },
    { id: 2, name: 'Sharma Tyre & Auto', rating: 4.6, reviews: 189, distance: 0.8, eta: '8-12 mins', phone: '+91 98765 43211', address: '45, Nehru Place', verified: true },
    { id: 3, name: 'Royal Roadside Help', rating: 4.9, reviews: 312, distance: 1.2, eta: '10-15 mins', phone: '+91 98765 43212', address: 'Block A, Connaught Place', verified: true },
    { id: 4, name: 'Speedy Recovery Services', rating: 4.5, reviews: 156, distance: 1.5, eta: '12-18 mins', phone: '+91 98765 43213', address: '78, Rajouri Garden', verified: false },
    { id: 5, name: 'Metro Towing Solutions', rating: 4.7, reviews: 278, distance: 1.8, eta: '15-20 mins', phone: '+91 98765 43214', address: 'Sector 14, Dwarka', verified: true },
    { id: 6, name: 'Singh Auto Care', rating: 4.4, reviews: 134, distance: 2.0, eta: '15-22 mins', phone: '+91 98765 43215', address: '23, Lajpat Nagar', verified: true },
    { id: 7, name: 'Bharat Roadside Assistance', rating: 4.3, reviews: 98, distance: 2.2, eta: '18-25 mins', phone: '+91 98765 43216', address: 'DLF Phase 3, Gurgaon', verified: false },
    { id: 8, name: 'Highway Heroes', rating: 4.8, reviews: 289, distance: 2.5, eta: '20-25 mins', phone: '+91 98765 43217', address: 'NH-8, Manesar', verified: true },
    { id: 9, name: 'Gupta Garage & Towing', rating: 4.2, reviews: 87, distance: 2.8, eta: '22-28 mins', phone: '+91 98765 43218', address: 'Karol Bagh', verified: true },
    { id: 10, name: 'Express Auto Rescue', rating: 4.6, reviews: 201, distance: 3.0, eta: '25-30 mins', phone: '+91 98765 43219', address: 'Saket', verified: true },
    { id: 11, name: 'Delhi NCR Towing', rating: 4.5, reviews: 167, distance: 3.2, eta: '25-32 mins', phone: '+91 98765 43220', address: 'Greater Kailash', verified: true },
    { id: 12, name: 'Roadway Assistance Pro', rating: 4.7, reviews: 234, distance: 3.5, eta: '28-35 mins', phone: '+91 98765 43221', address: 'Noida Sector 18', verified: true },
    { id: 13, name: 'Patel Auto Services', rating: 4.1, reviews: 76, distance: 3.8, eta: '30-38 mins', phone: '+91 98765 43222', address: 'Mayur Vihar', verified: false },
    { id: 14, name: 'SafeDrive Recovery', rating: 4.4, reviews: 145, distance: 4.0, eta: '32-40 mins', phone: '+91 98765 43223', address: 'Vasant Kunj', verified: true },
    { id: 15, name: 'Kumar Tyre House', rating: 4.3, reviews: 112, distance: 4.2, eta: '35-42 mins', phone: '+91 98765 43224', address: 'Pitampura', verified: true },
    { id: 16, name: '24x7 Auto Help', rating: 4.8, reviews: 298, distance: 4.5, eta: '38-45 mins', phone: '+91 98765 43225', address: 'Rohini Sector 7', verified: true },
    { id: 17, name: 'Reliable Roadside', rating: 4.0, reviews: 65, distance: 4.8, eta: '40-48 mins', phone: '+91 98765 43226', address: 'Janakpuri', verified: false },
    { id: 18, name: 'City Tow Services', rating: 4.5, reviews: 178, distance: 5.0, eta: '42-50 mins', phone: '+91 98765 43227', address: 'Faridabad', verified: true },
    { id: 19, name: 'Instant Auto Fix', rating: 4.6, reviews: 198, distance: 5.2, eta: '45-52 mins', phone: '+91 98765 43228', address: 'Ghaziabad', verified: true },
    { id: 20, name: 'National Highway Help', rating: 4.4, reviews: 143, distance: 5.5, eta: '48-55 mins', phone: '+91 98765 43229', address: 'Greater Noida', verified: true }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeLocation();
    setupPaymentMethodListeners();
});

// Location Functions
function initializeLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            successLocation,
            errorLocation,
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
        );
    } else {
        errorLocation({ message: 'Geolocation not supported' });
    }
}

function successLocation(position) {
    currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    updateLocationDisplay();
    updateMap();
}

function errorLocation(error) {
    console.log('Location error:', error);
    // Use default location (New Delhi)
    updateLocationDisplay();
    updateMap();
    showToast('Using default location: New Delhi');
}

function updateLocationDisplay() {
    const locationElement = document.getElementById('currentLocation');
    // Reverse geocoding would be done here with Google Geocoding API
    // For demo, we'll show coordinates
    locationElement.textContent = `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}`;
}

function updateMap() {
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    const googleMap = document.getElementById('googleMap');
    
    // Google Maps Embed URL
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${currentLocation.lat},${currentLocation.lng}&zoom=15`;
    
    // For demo without API key, use a basic embed
    const demoMapUrl = `https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=15&output=embed`;
    
    googleMap.src = demoMapUrl;
    googleMap.style.display = 'block';
    mapPlaceholder.style.display = 'none';
}

function refreshLocation() {
    const refreshBtn = document.querySelector('.refresh-location i');
    refreshBtn.classList.add('fa-spin');
    
    initializeLocation();
    
    setTimeout(() => {
        refreshBtn.classList.remove('fa-spin');
        showToast('Location updated!');
    }, 1500);
}

// Service Selection
function selectService(serviceType) {
    // Remove active class from all buttons
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected button
    const selectedBtn = document.querySelector(`.service-btn[data-service="${serviceType}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    selectedService = serviceType;
    
    // Update banner
    const serviceInfo = serviceTypes[serviceType];
    document.getElementById('selectedServiceText').textContent = 
        `Looking for: ${serviceInfo.name} - ${serviceInfo.description}`;
    document.getElementById('clearServiceBtn').style.display = 'flex';
    
    // Load providers
    loadProviders(serviceType);
}

function clearService() {
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    selectedService = null;
    document.getElementById('selectedServiceText').textContent = 'Select a service above to find nearby help';
    document.getElementById('clearServiceBtn').style.display = 'none';
    
    // Reset providers list
    document.getElementById('providersList').innerHTML = `
        <div class="loading-providers">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Select a service to find nearby providers...</p>
        </div>
    `;
    document.getElementById('providerCount').textContent = '0';
}

// Provider Functions
function loadProviders(serviceType) {
    const providersList = document.getElementById('providersList');
    
    // Show loading
    providersList.innerHTML = `
        <div class="loading-providers">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Finding nearby ${serviceTypes[serviceType].name} services...</p>
        </div>
    `;
    
    // Simulate API call delay
    setTimeout(() => {
        // Calculate prices based on service type
        providers = mockProviders.map(provider => ({
            ...provider,
            price: calculatePrice(serviceType, provider.distance)
        }));
        
        renderProviders(providers);
        document.getElementById('providerCount').textContent = providers.length;
    }, 1000);
}

function calculatePrice(serviceType, distance) {
    const basePrice = serviceTypes[serviceType].basePrice;
    const distanceCharge = Math.round(distance * 20); // ₹20 per km
    return basePrice + distanceCharge;
}

function renderProviders(providerList) {
    const providersList = document.getElementById('providersList');
    
    if (providerList.length === 0) {
        providersList.innerHTML = `
            <div class="loading-providers">
                <i class="fas fa-exclamation-circle"></i>
                <p>No providers found nearby. Try a different service.</p>
            </div>
        `;
        return;
    }
    
    providersList.innerHTML = providerList.map(provider => `
        <div class="provider-card" onclick="showProviderDetails(${provider.id})">
            <div class="provider-card-header">
                <span class="provider-name">
                    ${provider.name}
                    ${provider.verified ? '<i class="fas fa-check-circle" style="color: #27ae60; margin-left: 5px;" title="Verified"></i>' : ''}
                </span>
                <span class="provider-rating">
                    <i class="fas fa-star"></i> ${provider.rating}
                </span>
            </div>
            <div class="provider-card-body">
                <span><i class="fas fa-map-marker-alt"></i> ${provider.distance} km away</span>
                <span><i class="fas fa-clock"></i> ETA: ${provider.eta}</span>
                <span><i class="fas fa-phone"></i> ${provider.phone}</span>
            </div>
            <div class="provider-card-footer">
                <span class="provider-price">₹${provider.price} <span>estimated</span></span>
                <button class="btn-select" onclick="event.stopPropagation(); showProviderDetails(${provider.id})">
                    Select
                </button>
            </div>
        </div>
    `).join('');
}

function sortProviders() {
    const sortBy = document.getElementById('sortBy').value;
    
    let sortedProviders = [...providers];
    
    switch(sortBy) {
        case 'distance':
            sortedProviders.sort((a, b) => a.distance - b.distance);
            break;
        case 'rating':
            sortedProviders.sort((a, b) => b.rating - a.rating);
            break;
        case 'price':
            sortedProviders.sort((a, b) => a.price - b.price);
            break;
    }
    
    renderProviders(sortedProviders);
}

// Provider Modal
function showProviderDetails(providerId) {
    selectedProvider = providers.find(p => p.id === providerId);
    if (!selectedProvider) return;
    
    const serviceInfo = serviceTypes[selectedService];
    
    // Update modal content
    document.getElementById('modalProviderName').textContent = selectedProvider.name;
    document.getElementById('modalRating').textContent = selectedProvider.rating;
    document.getElementById('modalReviews').textContent = `(${selectedProvider.reviews} reviews)`;
    document.getElementById('modalDistance').textContent = `${selectedProvider.distance} km away`;
    document.getElementById('modalEta').textContent = `ETA: ${selectedProvider.eta}`;
    document.getElementById('modalPhone').textContent = selectedProvider.phone;
    
    // Update price breakdown
    const basePrice = serviceInfo.basePrice;
    const distanceCharge = Math.round(selectedProvider.distance * 20);
    const convenienceFee = 49;
    const gst = Math.round((basePrice + distanceCharge + convenienceFee) * 0.18);
    const total = basePrice + distanceCharge + convenienceFee + gst;
    
    document.getElementById('priceBreakdown').innerHTML = `
        <div class="price-item">
            <span>Base Service Charge</span>
            <span>₹${basePrice}</span>
        </div>
        <div class="price-item">
            <span>Distance Charge (${selectedProvider.distance} km)</span>
            <span>₹${distanceCharge}</span>
        </div>
        <div class="price-item">
            <span>Convenience Fee</span>
            <span>₹${convenienceFee}</span>
        </div>
        <div class="price-item">
            <span>GST (18%)</span>
            <span>₹${gst}</span>
        </div>
    `;
    
    document.getElementById('modalTotalPrice').textContent = `₹${total}`;
    selectedProvider.totalPrice = total;
    
    // Show modal
    document.getElementById('providerModal').classList.add('active');
}

function closeModal() {
    document.getElementById('providerModal').classList.remove('active');
}

function callProvider() {
    if (selectedProvider) {
        window.location.href = `tel:${selectedProvider.phone.replace(/\s/g, '')}`;
    }
}

// Payment Flow
function showPaymentFlow() {
    closeModal();
    currentPaymentStep = 1;
    updatePaymentSteps();
    
    // Populate payment modal with selected info
    document.getElementById('summaryService').textContent = serviceTypes[selectedService].name;
    document.getElementById('summaryProvider').textContent = selectedProvider.name;
    document.getElementById('summaryTotal').textContent = `₹${selectedProvider.totalPrice}`;
    document.getElementById('payAmount').textContent = selectedProvider.totalPrice;
    
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
    currentPaymentStep = 1;
    updatePaymentSteps();
}

function goBackToProvider() {
    if (currentPaymentStep > 1) {
        goToStep(currentPaymentStep - 1);
    } else {
        closePaymentModal();
        showProviderDetails(selectedProvider.id);
    }
}

function goToStep(step) {
    // Validate form on step 1
    if (currentPaymentStep === 1 && step === 2) {
        const form = document.getElementById('vehicleForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
    }
    
    currentPaymentStep = step;
    updatePaymentSteps();
    
    // If confirming payment (step 3), generate booking ID
    if (step === 3) {
        generateBookingConfirmation();
    }
}

function updatePaymentSteps() {
    // Update step indicators
    document.querySelectorAll('.payment-steps .step').forEach((stepEl, index) => {
        const stepNum = index + 1;
        stepEl.classList.remove('active', 'completed');
        
        if (stepNum < currentPaymentStep) {
            stepEl.classList.add('completed');
        } else if (stepNum === currentPaymentStep) {
            stepEl.classList.add('active');
        }
    });
    
    // Show/hide content
    document.getElementById('step1Content').classList.toggle('hidden', currentPaymentStep !== 1);
    document.getElementById('step2Content').classList.toggle('hidden', currentPaymentStep !== 2);
    document.getElementById('step3Content').classList.toggle('hidden', currentPaymentStep !== 3);
}

function generateBookingConfirmation() {
    // Generate booking ID
    const bookingId = 'TG' + Date.now().toString().slice(-10);
    document.getElementById('bookingId').textContent = bookingId;
    
    // Update confirmation details
    document.getElementById('confirmProvider').textContent = selectedProvider.name;
    document.getElementById('confirmEta').textContent = selectedProvider.eta;
    document.getElementById('confirmPhone').textContent = selectedProvider.phone;
    
    showToast('Booking confirmed successfully!');
}

// Payment Method Listeners
function setupPaymentMethodListeners() {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const upiInput = document.getElementById('upiInput');
            const cardInput = document.getElementById('cardInput');
            
            upiInput.classList.add('hidden');
            cardInput.classList.add('hidden');
            
            if (this.value === 'upi') {
                upiInput.classList.remove('hidden');
            } else if (this.value === 'card') {
                cardInput.classList.remove('hidden');
            }
        });
    });
}

function selectUpiApp(app) {
    // Simulate UPI app deep link
    let appName = '';
    switch(app) {
        case 'gpay': appName = 'Google Pay'; break;
        case 'phonepe': appName = 'PhonePe'; break;
        case 'paytm': appName = 'Paytm'; break;
    }
    showToast(`Opening ${appName}...`);
    
    // In production, this would open the actual UPI app
    // For demo, we'll just proceed to confirmation after a delay
    setTimeout(() => {
        goToStep(3);
    }, 2000);
}

// Tracking (Demo)
function trackProvider() {
    showToast('Opening live tracking...');
    
    // In production, this would show real-time provider location
    // For demo, we'll update the main map
    const mapUrl = `https://maps.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}&z=16&output=embed`;
    document.getElementById('googleMap').src = mapUrl;
}

// Emergency Call
function callEmergency() {
    if (confirm('This will call the National Emergency Number (112). Proceed?')) {
        window.location.href = 'tel:112';
    }
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modals on outside click
window.addEventListener('click', function(event) {
    const providerModal = document.getElementById('providerModal');
    const paymentModal = document.getElementById('paymentModal');
    
    if (event.target === providerModal) {
        closeModal();
    }
    if (event.target === paymentModal) {
        closePaymentModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
        closePaymentModal();
    }
});

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
            e.target.value = formattedValue;
        });
    }
    
    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }
    
    // Vehicle number formatting (Indian format)
    const vehicleNumberInput = document.getElementById('vehicleNumber');
    if (vehicleNumberInput) {
        vehicleNumberInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }
});
