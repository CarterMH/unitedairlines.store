// Global variables
let cart = [];
let totalPrice = 0;

// Aircraft data
const aircraftData = {
    'boeing-737-max-8': {
        name: 'Boeing 737 MAX 8',
        type: 'Narrow Body',
        price: 89100000,
        capacity: '162-178 passengers',
        range: '3,550 nm',
        description: 'The Boeing 737 MAX 8 is the most fuel-efficient single-aisle aircraft in its class, offering airlines exceptional operational flexibility and efficiency.',
        specifications: {
            'Length': '39.52 m',
            'Wingspan': '35.9 m',
            'Height': '12.3 m',
            'Max Speed': 'Mach 0.79',
            'Service Ceiling': '41,000 ft',
            'Fuel Capacity': '26,020 L'
        }
    },
    'boeing-787-9': {
        name: 'Boeing 787-9 Dreamliner',
        type: 'Wide Body',
        price: 292500000,
        capacity: '290 passengers',
        range: '7,635 nm',
        description: 'The Boeing 787-9 Dreamliner is a revolutionary aircraft that offers exceptional fuel efficiency and passenger comfort with advanced composite materials.',
        specifications: {
            'Length': '62.8 m',
            'Wingspan': '60.1 m',
            'Height': '17.0 m',
            'Max Speed': 'Mach 0.85',
            'Service Ceiling': '43,000 ft',
            'Fuel Capacity': '126,917 L'
        }
    },
    'airbus-a320neo': {
        name: 'Airbus A320neo',
        type: 'Narrow Body',
        price: 110600000,
        capacity: '150-180 passengers',
        range: '3,500 nm',
        description: 'The Airbus A320neo family incorporates new generation engines and Sharklets, delivering 15% fuel savings and reduced noise footprint.',
        specifications: {
            'Length': '37.57 m',
            'Wingspan': '35.8 m',
            'Height': '11.76 m',
            'Max Speed': 'Mach 0.78',
            'Service Ceiling': '39,800 ft',
            'Fuel Capacity': '24,210 L'
        }
    },
    'boeing-777-300er': {
        name: 'Boeing 777-300ER',
        type: 'Wide Body',
        price: 375500000,
        capacity: '396 passengers',
        range: '7,370 nm',
        description: 'The Boeing 777-300ER is the most reliable twin-aisle aircraft in the world, offering exceptional range and payload capability.',
        specifications: {
            'Length': '73.9 m',
            'Wingspan': '64.8 m',
            'Height': '18.5 m',
            'Max Speed': 'Mach 0.84',
            'Service Ceiling': '43,100 ft',
            'Fuel Capacity': '181,283 L'
        }
    },
    'embraer-e175': {
        name: 'Embraer E175',
        type: 'Regional',
        price: 46700000,
        capacity: '76-88 passengers',
        range: '2,200 nm',
        description: 'The Embraer E175 is the most efficient aircraft in the 70-90 seat category, offering superior passenger comfort and operational flexibility.',
        specifications: {
            'Length': '31.68 m',
            'Wingspan': '28.72 m',
            'Height': '9.73 m',
            'Max Speed': 'Mach 0.82',
            'Service Ceiling': '41,000 ft',
            'Fuel Capacity': '9,335 L'
        }
    },
    'airbus-a350-900': {
        name: 'Airbus A350-900',
        type: 'Wide Body',
        price: 317400000,
        capacity: '315-366 passengers',
        range: '8,100 nm',
        description: 'The Airbus A350-900 features the latest aerodynamic design, carbon fiber fuselage and wings, plus new fuel-efficient Rolls-Royce Trent XWB engines.',
        specifications: {
            'Length': '66.8 m',
            'Wingspan': '64.75 m',
            'Height': '17.05 m',
            'Max Speed': 'Mach 0.85',
            'Service Ceiling': '43,100 ft',
            'Fuel Capacity': '138,000 L'
        }
    }
};

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeFilters();
    initializeAnimations();
    initializeParallax();
    updateCartDisplay();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Filter functionality
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const aircraftCards = document.querySelectorAll('.aircraft-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter aircraft cards
            aircraftCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe aircraft cards
    document.querySelectorAll('.aircraft-card').forEach(card => {
        observer.observe(card);
    });
}

// Scroll to aircraft section
function scrollToAircraft() {
    document.getElementById('aircraft').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Shopping cart functionality
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

function addToCart(aircraftId, price) {
    const aircraft = aircraftData[aircraftId];
    
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === aircraftId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: aircraftId,
            name: aircraft.name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    
    // Show success animation
    showNotification(`${aircraft.name} added to cart!`);
}

function removeFromCart(aircraftId) {
    cart = cart.filter(item => item.id !== aircraftId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cartTotal');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart total
    totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = formatPrice(totalPrice);
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${formatPrice(item.price)} × ${item.quantity}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const total = formatPrice(totalPrice);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    showNotification(`Thank you for your purchase! ${itemCount} aircraft for $${total}`, 'success');
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    toggleCart();
}

// Aircraft modal functionality
function openAircraftModal(aircraftId) {
    const modal = document.getElementById('aircraftModal');
    const modalBody = document.getElementById('modalBody');
    const aircraft = aircraftData[aircraftId];
    
    if (!aircraft) return;
    
    modalBody.innerHTML = `
        <div class="modal-aircraft-content">
            <div class="modal-aircraft-image">
                <img src="images/${aircraftId}.png" alt="${aircraft.name}">
            </div>
            <div class="modal-aircraft-details">
                <h2>${aircraft.name}</h2>
                <p class="modal-aircraft-type">${aircraft.type}</p>
                <p class="modal-aircraft-description">${aircraft.description}</p>
                
                <div class="modal-specs">
                    <h3>Specifications</h3>
                    <div class="specs-grid">
                        ${Object.entries(aircraft.specifications).map(([key, value]) => `
                            <div class="spec-item">
                                <span class="spec-label">${key}:</span>
                                <span class="spec-value">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-footer">
                    <div class="modal-price">$${formatPrice(aircraft.price)}</div>
                    <button class="add-to-cart-btn" onclick="addToCart('${aircraftId}', ${aircraft.price}); closeAircraftModal();">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeAircraftModal() {
    const modal = document.getElementById('aircraftModal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('aircraftModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAircraftModal();
    }
});

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US').format(price);
}

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'error' ? '#ff4444' : '#00AA00',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '1300',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '300px',
        fontWeight: '600'
    });
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 14, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('aircraftModal');
        if (modal.classList.contains('open')) {
            closeAircraftModal();
        }
        
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        }
    }
});

// Add modal styles dynamically
const modalStyles = `
    .modal-aircraft-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        align-items: start;
    }
    
    .modal-aircraft-image img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 12px;
    }
    
    .modal-aircraft-details h2 {
        font-family: 'Orbitron', monospace;
        color: var(--text-primary);
        margin-bottom: 10px;
    }
    
    .modal-aircraft-type {
        color: var(--accent-color);
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 20px;
    }
    
    .modal-aircraft-description {
        color: var(--text-secondary);
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .modal-specs h3 {
        color: var(--text-primary);
        margin-bottom: 15px;
        font-family: 'Orbitron', monospace;
    }
    
    .specs-grid {
        display: grid;
        gap: 10px;
        margin-bottom: 30px;
    }
    
    .spec-item {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
    }
    
    .spec-label {
        color: var(--text-secondary);
        font-weight: 600;
    }
    
    .spec-value {
        color: var(--text-primary);
    }
    
    .modal-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 20px;
        border-top: 1px solid var(--border-color);
    }
    
    .modal-price {
        font-family: 'Orbitron', monospace;
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--accent-color);
    }
    
    @media (max-width: 768px) {
        .modal-aircraft-content {
            grid-template-columns: 1fr;
            gap: 20px;
        }
        
        .modal-footer {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
        }
        
        .add-to-cart-btn {
            width: 100%;
        }
    }
`;

// Mobile menu functionality
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Close mobile menu when link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Parallax scrolling effect
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        const stars = document.querySelector('.stars');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        if (stars) {
            stars.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Enhanced loading states
function showLoading(element) {
    element.classList.add('loading');
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.style.pointerEvents = 'auto';
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Could add user-friendly error messaging here
});

// Performance optimization - debounced scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add modal styles to document
const styleElement = document.createElement('style');
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);