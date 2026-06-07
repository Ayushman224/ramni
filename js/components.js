/**
 * ==========================================================================
 * BOUTIQUE WEBPAGE REUSABLE COMPONENTS
 * ==========================================================================
 */

window.Components = {
    // 1. Header Component
    Header: function(activeRoute = 'home') {
        const routes = [
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'designs', label: 'Designs' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'book', label: 'Book Order' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'help', label: 'Help Desk' },
            { id: 'contact', label: 'Contact' }
        ];

        let navLinksHTML = routes.map(r => `
            <li>
                <a href="#${r.id}" class="nav-link ${activeRoute === r.id ? 'active' : ''}" data-route="${r.id}">
                    ${r.label}
                </a>
            </li>
        `).join('');

        // Add Login / Sign Up state check
        const currentUser = JSON.parse(localStorage.getItem('boutique_user') || 'null');
        const authBtnHTML = currentUser 
            ? `<li><a href="#profile" class="nav-cta" data-route="profile"><i class="fas fa-user-circle"></i> Hi, ${currentUser.name.split(' ')[0]}</a></li>`
            : `<li><a href="#login" class="nav-cta" data-route="login">Login / Sign Up</a></li>`;

        return `
            <div class="container header-container">
                <a href="#home" class="logo-link" data-route="home">
                    <span class="logo-text">Your Boutique Name</span>
                    <span class="logo-sub">Gorakhpur Tailoring</span>
                </a>
                <nav>
                    <ul class="nav-menu" id="nav-menu-list">
                        ${navLinksHTML}
                        ${authBtnHTML}
                    </ul>
                </nav>
                <button class="hamburger" id="hamburger-btn" aria-label="Toggle Navigation">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        `;
    },

    // 2. Footer Component
    Footer: function() {
        return `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-about">
                        <h3>Your Boutique Name</h3>
                        <p>“Custom Tailoring for Every Beautiful Occasion.” We offer premium custom-stitching services for women in Gorakhpur. Provide your own cloth, and let us stitch magic for you.</p>
                        <div class="footer-socials">
                            <a href="#" class="social-link" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-link" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                            <a href="#" class="social-link" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                        </div>
                    </div>
                    <div class="footer-links-col">
                        <h4>Explore</h4>
                        <ul class="footer-links-list">
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Our Services</a></li>
                            <li><a href="#designs">Design Gallery</a></li>
                            <li><a href="#pricing">Stitching Pricing</a></li>
                            <li><a href="#book">Book Stitching Order</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Customer Care</h4>
                        <ul class="footer-links-list">
                            <li><a href="#reviews">Reviews & Ratings</a></li>
                            <li><a href="#help">Help Desk / FAQs</a></li>
                            <li><a href="#contact">Contact Us</a></li>
                            <li><a href="#login">My Account</a></li>
                            <li><a href="#help">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="footer-links-col">
                        <h4>Get In Touch</h4>
                        <div class="footer-contact-info">
                            <div class="footer-contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>123, Park Road, Civil Lines, Gorakhpur, Uttar Pradesh, 273001</span>
                            </div>
                            <div class="footer-contact-item">
                                <i class="fas fa-phone-alt"></i>
                                <span>+91 98765 43210</span>
                            </div>
                            <div class="footer-contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>info@yourboutiquename.com</span>
                            </div>
                            <div class="footer-contact-item">
                                <i class="fas fa-clock"></i>
                                <span>Mon - Sat: 10:00 AM - 8:00 PM<br>Sunday: Closed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Your Boutique Name. All Rights Reserved. Custom Tailored in Gorakhpur.</p>
                    <p>Designed with <i class="fas fa-heart" style="color: #f4a4b4;"></i> for Gorakhpur's beautiful women.</p>
                </div>
            </div>
        `;
    },

    // 3. WhatsApp Floating Button
    WhatsAppButton: function(phoneNumber = '919876543210', message = 'Hello! I am interested in custom tailoring services for my dress. Could you please help me with the design and bookings?') {
        const urlEncodedMsg = encodeURIComponent(message);
        const waUrl = `https://wa.me/${phoneNumber}?text=${urlEncodedMsg}`;
        return `
            <a href="${waUrl}" class="whatsapp-float-btn" target="_blank" rel="noopener noreferrer" aria-label="Contact Us on WhatsApp" title="Chat on WhatsApp">
                <i class="fab fa-whatsapp"></i>
            </a>
        `;
    },

    // 4. Service Card Component
    ServiceCard: function(service) {
        return `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-img-container">
                    <img class="service-img" src="${service.image}" alt="${service.name}" loading="lazy">
                    <span class="service-badge">${service.category}</span>
                </div>
                <div class="service-info">
                    <h3 class="service-title">${service.name}</h3>
                    <p class="service-desc">${service.description}</p>
                    <div class="service-footer">
                        <div class="service-price">Stitching from: <span>₹${service.startingPrice}</span></div>
                        <a href="#book" class="service-link" data-service-name="${service.name}">Book Now <i class="fas fa-chevron-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    },

    // 5. Design Card Component
    DesignCard: function(design) {
        return `
            <div class="design-card" data-category="${design.category}">
                <div class="design-img-box">
                    <img class="design-img" src="${design.image}" alt="${design.title}" loading="lazy">
                    <div class="design-overlay">
                        <span class="design-tag">${design.category}</span>
                        <h3 class="design-title">${design.title}</h3>
                        <div class="design-meta">
                            <span>Stitch Style: ${design.style}</span>
                            <span><i class="far fa-heart"></i> ${design.likes || 12}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // 6. Testimonial / Review Card Component
    TestimonialCard: function(testimonial) {
        const stars = Array(5).fill(0).map((_, i) => 
            `<i class="${i < testimonial.rating ? 'fas' : 'far'} fa-star"></i>`
        ).join('');

        const initials = testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        return `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-user-info">
                        <div class="testimonial-avatar">${initials}</div>
                        <div class="testimonial-user-details">
                            <h4>${testimonial.name}</h4>
                            <span class="testimonial-service-tag"><i class="fas fa-scissors"></i> Stitched: ${testimonial.service}</span>
                        </div>
                    </div>
                    <div class="testimonial-stars">${stars}</div>
                </div>
                <p class="testimonial-text">"${testimonial.comment}"</p>
                <div class="testimonial-date">${testimonial.date || 'Recently'}</div>
            </div>
        `;
    },

    // 7. Pricing Card Component
    PricingCard: function(pricing) {
        let featuresHTML = pricing.features.map(f => `
            <li><i class="fas fa-check"></i> ${f}</li>
        `).join('');

        return `
            <div class="pricing-card ${pricing.featured ? 'featured' : ''}">
                ${pricing.featured ? '<div class="pricing-featured-tag">Most Popular</div>' : ''}
                <div class="pricing-icon"><i class="${pricing.icon}"></i></div>
                <h3 class="pricing-name">${pricing.name}</h3>
                <div class="pricing-cost">₹${pricing.price}<span>/stitching</span></div>
                <ul class="pricing-features-list">
                    ${featuresHTML}
                </ul>
                <a href="#book" class="btn ${pricing.featured ? 'btn-primary' : 'btn-secondary'} pricing-btn" data-service-name="${pricing.name}">
                    Book Stitching
                </a>
            </div>
        `;
    },

    // 8. FAQ Accordion Component
    FAQAccordion: function(faq, index) {
        return `
            <div class="faq-item" id="faq-item-${index}">
                <div class="faq-header" onclick="window.toggleFAQ(${index})">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down faq-icon-indicator"></i>
                </div>
                <div class="faq-body" id="faq-body-${index}">
                    <div class="faq-content">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `;
    },

    // 9. Booking Form Component
    BookingForm: function(servicesList = []) {
        let serviceOptions = servicesList.map(s => `
            <option value="${s.name}">${s.name} (Stitching from ₹${s.startingPrice})</option>
        `).join('');

        return `
            <div class="booking-form-card">
                <form id="stitching-booking-form" onsubmit="window.handleBookingSubmit(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="book-name">Full Name *</label>
                            <input class="form-input" type="text" id="book-name" required placeholder="e.g., Priya Sharma">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="book-phone">Phone Number *</label>
                            <input class="form-input" type="tel" id="book-phone" required placeholder="e.g., 9876543210" pattern="[0-9]{10}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="book-email">Email Address</label>
                        <input class="form-input" type="email" id="book-email" placeholder="e.g., priya@example.com">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="book-service">Garment Type to Stitch *</label>
                        <select class="form-select" id="book-service" required>
                            <option value="" disabled selected>-- Select Custom Garment --</option>
                            ${serviceOptions}
                            <option value="Custom Outfit / Other">Custom Bridal / Other Designer Outfits</option>
                            <option value="Alteration Services">Stitching Alteration / Repairs</option>
                        </select>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label" for="book-pickup-date">Requested Pickup Date *</label>
                            <input class="form-input" type="date" id="book-pickup-date" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="book-pickup-time">Requested Pickup Slot *</label>
                            <select class="form-select" id="book-pickup-time" required>
                                <option value="" disabled selected>-- Select Time Slot --</option>
                                <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                                <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                                <option value="03:00 PM - 06:00 PM">Late Afternoon (03:00 PM - 06:00 PM)</option>
                                <option value="06:00 PM - 08:00 PM">Evening (06:00 PM - 08:00 PM)</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="book-address">Pickup Address in Gorakhpur City *</label>
                        <textarea class="form-textarea" id="book-address" required placeholder="Provide complete delivery details (e.g. Flat/House No, Area name in Gorakhpur like Civil Lines, Golghar, Shahpur, etc.)"></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="book-notes">Special Stitching Instructions / Measurement Notes</label>
                        <textarea class="form-textarea" id="book-notes" placeholder="e.g. Lining needed, specific neck design (e.g. sweetheart neck), back dori style, margin to keep inside, etc."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-checkbox-label">
                            <input type="checkbox" id="book-pickup-material" checked>
                            I will provide my own clothing material/fabric for custom tailoring.
                        </label>
                    </div>

                    <button class="btn btn-primary booking-submit-btn" type="submit">
                        <i class="fas fa-calendar-check"></i> Book Measurement Pickup
                    </button>
                </form>
            </div>
        `;
    },

    // 10. Review Form Component
    ReviewForm: function(servicesList = []) {
        let serviceOptions = servicesList.map(s => `
            <option value="${s.name}">${s.name}</option>
        `).join('');

        return `
            <div class="review-form-card">
                <h3>Share Your Experience</h3>
                <form id="customer-review-form" onsubmit="window.handleReviewSubmit(event)">
                    <div class="form-group">
                        <label class="form-label" for="rev-name">Your Name *</label>
                        <input class="form-input" type="text" id="rev-name" required placeholder="Your Name">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="rev-service">What did you stitch? *</label>
                        <select class="form-select" id="rev-service" required>
                            <option value="" disabled selected>-- Select Outfit --</option>
                            ${serviceOptions}
                            <option value="Custom Lehenga">Bridal Lehenga</option>
                            <option value="Party Wear Dress">Party Wear Outfit</option>
                            <option value="Alterations">Alterations</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Your Rating *</label>
                        <div class="star-rating-select" id="review-stars-container">
                            <i class="fas fa-star active" data-rating="1" onclick="window.setReviewRating(1)"></i>
                            <i class="fas fa-star active" data-rating="2" onclick="window.setReviewRating(2)"></i>
                            <i class="fas fa-star active" data-rating="3" onclick="window.setReviewRating(3)"></i>
                            <i class="fas fa-star active" data-rating="4" onclick="window.setReviewRating(4)"></i>
                            <i class="fas fa-star active" data-rating="5" onclick="window.setReviewRating(5)"></i>
                        </div>
                        <input type="hidden" id="rev-rating" value="5">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-comment">Review Details *</label>
                        <textarea class="form-textarea" id="rev-comment" required placeholder="Tell other Gorakhpur customers about the fit, stitching finishing, timing, and service quality..."></textarea>
                    </div>

                    <button class="btn btn-gold booking-submit-btn" type="submit">
                        <i class="fas fa-paper-plane"></i> Submit Review
                    </button>
                </form>
            </div>
        `;
    }
};
