/**
 * ==========================================================================
 * BOUTIQUE WEBPAGE REUSABLE COMPONENTS
 * ==========================================================================
 */

const COMPONENT_CONFIG = window.SiteConfig || {};

window.Components = {
    // 1. Header Component
    Header: function(activeRoute = 'home') {
        const routes = COMPONENT_CONFIG.routeLinks || [
            { id: 'home', label: 'Home' },
            { id: 'services', label: 'Services' },
            { id: 'designs', label: 'Designs' },
            { id: 'pricing', label: 'Pricing' },
            { id: 'book', label: 'Book Order' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'support', label: 'Support' },
            { id: 'help', label: 'Help Desk' },
            { id: 'contact', label: 'Contact' },
            { id: 'admin', label: 'Admin' }
        ];

        let navLinksHTML = routes.map(r => `
            <li>
                <a href="#${r.id}" class="nav-link ${activeRoute === r.id ? 'active' : ''}" aria-current="${activeRoute === r.id ? 'page' : 'false'}" data-route="${r.id}">
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
            <div class="offer-banner">${COMPONENT_CONFIG.offerBanner || 'Free Pickup on Your First Order | Currently serving Gorakhpur City'}</div>
            <header class="site-header">
                            <div class="container header-inner">
                                <div class="brand">
                                    <a href="#home" class="logo-link" data-route="home">
                                        <div class="logo">${COMPONENT_CONFIG.businessName || 'Your Boutique Name'}</div>
                                    </a>
                                    <div class="tagline">${COMPONENT_CONFIG.brandTagline || 'Custom Tailoring for Every Beautiful Occasion'}</div>
                                </div>

                                <nav class="site-nav" aria-label="Primary navigation">
                                    <button class="nav-toggle" aria-expanded="false" aria-controls="site-menu">Menu</button>
                                    <ul id="site-menu" class="nav-list">
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
                        </header>
                `;
    },

    // 2. Footer Component
        Footer: function() {
                return `
                        <footer class="site-footer">
                            <div class="container footer-grid">
                                <div class="footer-about">
                                    <h3>${COMPONENT_CONFIG.businessName || 'Your Boutique Name'}</h3>
                                    <p>${COMPONENT_CONFIG.footerDescription || 'Premium women’s boutique tailoring service in Gorakhpur for blouse, lehenga, suits, bridal wear, alterations, and custom designs.'}</p>
                                    <div class="footer-socials">
                                        ${ (COMPONENT_CONFIG.socialLinks || []).map(link => `<a href="${link.url}" class="social-link">${link.name}</a>`).join('') }
                                    </div>
                                </div>

                                <div class="footer-col">
                                    <h4>Quick Links</h4>
                                    <ul>
                                        <li><a href="#home">Home</a></li>
                                        <li><a href="#services">Services</a></li>
                                        <li><a href="#designs">Designs</a></li>
                                        <li><a href="#pricing">Pricing</a></li>
                                        <li><a href="#book">Book Order</a></li>
                                        <li><a href="#reviews">Reviews</a></li>
                                        <li><a href="#help">Help Desk</a></li>
                                        <li><a href="#contact">Contact</a></li>
                                        <li><a href="#admin">Admin</a></li>
                                    </ul>
                                </div>

                                <div class="footer-col">
                                    <h4>Services</h4>
                                    <ul>
                                        <li><a href="#">Blouse Stitching</a></li>
                                        <li><a href="#">Lehenga Stitching</a></li>
                                        <li><a href="#">Suit Stitching</a></li>
                                        <li><a href="#">Bridal Wear</a></li>
                                        <li><a href="#">Alterations</a></li>
                                    </ul>
                                </div>

                                <div class="footer-col">
                                    <h4>Contact</h4>
                                    <p>Phone: <a href="${COMPONENT_CONFIG.getPhoneHref ? COMPONENT_CONFIG.getPhoneHref() : 'tel:+919876543210'}">${COMPONENT_CONFIG.phoneDisplay || '+91 98765 43210'}</a></p>
                                    <p>Email: <a href="${COMPONENT_CONFIG.getEmailHref ? COMPONENT_CONFIG.getEmailHref() : 'mailto:support@example.com'}">${COMPONENT_CONFIG.email || 'support@example.com'}</a></p>
                                    <p>Address: ${COMPONENT_CONFIG.address || 'Gorakhpur, Uttar Pradesh'}</p>
                                    <p><a href="${COMPONENT_CONFIG.getWhatsAppUrl ? COMPONENT_CONFIG.getWhatsAppUrl() : 'https://wa.me/919876543210?text=Hello%2C%20I%20want%20help%20with%20boutique%20stitching%20services.'}" target="_blank" rel="noopener">Chat on WhatsApp</a></p>
                                </div>
                            </div>

                            <div class="footer-bottom container">
                                <div>© <span id="year"></span> ${COMPONENT_CONFIG.businessName || 'Your Boutique Name'}. All rights reserved.</div>
                            </div>
                        </footer>
                `;
        },

    // 3. WhatsApp Floating Button
    WhatsAppButton: function(phoneNumber = COMPONENT_CONFIG.whatsappNumber, message = COMPONENT_CONFIG.whatsappMessage) {
        const urlEncodedMsg = encodeURIComponent(message || COMPONENT_CONFIG.whatsappMessage);
        const waUrl = `https://wa.me/${phoneNumber || COMPONENT_CONFIG.whatsappNumber}?text=${urlEncodedMsg}`;
        return `
            <a href="${waUrl}" class="whatsapp-float-btn" target="_blank" rel="noopener noreferrer" aria-label="Contact Us on WhatsApp" title="Chat on WhatsApp">
                <span class="whatsapp-dot"></span>
                <i class="fab fa-whatsapp" aria-hidden="true"></i>
            </a>
        `;
    },

    // 4. Service Card Component
    ServiceCard: function(service) {
        return `
            <div class="service-card" data-service-id="${service.id}">
                <div class="service-img-container">
                    <img class="service-img" src="${service.image}" alt="${service.name}" loading="lazy" onerror="this.onerror=null;this.src='';this.style.background='linear-gradient(135deg,#ffeef1 0%,#f5eedf 100%)';this.style.minHeight='240px';this.removeAttribute('src');" >
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
        const stars = Array.from({ length: 5 }, (_, i) => `
            <i class="${i < design.rating ? 'fas' : 'far'} fa-star"></i>
        `).join('');

        return `
            <div class="design-card" data-category="${design.category}">
                <div class="design-img-box">
                    <div class="placeholder-image-sm">
                        <div class="placeholder-inner">
                            <i class="fas fa-image"></i>
                            <span>Design Preview</span>
                        </div>
                    </div>
                    <div class="design-overlay">
                        <span class="design-tag">${design.category}</span>
                        <h3 class="design-title">${design.title}</h3>
                        <div class="design-meta">
                            <span>${design.style}</span>
                        </div>
                    </div>
                </div>
                <div class="design-details">
                    <p class="design-desc">${design.description}</p>
                    <div class="design-rating">${stars} <span>${design.rating}.0</span></div>
                    <p class="design-review">“${design.review}”</p>
                    <a class="btn btn-primary btn-block" href="#book" data-route>Book Similar Design</a>
                </div>
            </div>
        `;
    },

    // 6. Testimonial / Review Card Component
    TestimonialCard: function(testimonial) {
        const fullStars = Math.floor(testimonial.rating);
        const halfStar = testimonial.rating % 1 === 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        const stars = Array(fullStars).fill('<i class="fas fa-star"></i>')
            .concat(halfStar ? ['<i class="fas fa-star-half-alt"></i>'] : [])
            .concat(Array(emptyStars).fill('<i class="far fa-star"></i>'))
            .join('');

        const initials = testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

        return `
            <div class="testimonial-card">
                <div class="testimonial-header">
                    <div class="testimonial-user-info">
                        <div class="testimonial-avatar">${initials}</div>
                        <div class="testimonial-user-details">
                            <h4>${testimonial.name}</h4>
                            <p class="testimonial-meta">${testimonial.locality} • ${testimonial.service}</p>
                        </div>
                    </div>
                    <div class="testimonial-stars">${stars}</div>
                </div>
                <p class="testimonial-text">"${testimonial.comment}"</p>
            </div>
        `;
    },

    // 7. Pricing Card Component
    PricingCard: function(pricing) {
        return `
            <div class="pricing-card ${pricing.featured ? 'featured' : ''}">
                ${pricing.featured ? '<div class="pricing-featured-tag">Our Pick</div>' : ''}
                <div class="pricing-icon"><i class="${pricing.icon}"></i></div>
                <h3 class="pricing-name">${pricing.name}</h3>
                <div class="pricing-cost">Starting from <span>₹${pricing.price}</span></div>
                <p class="pricing-description">${pricing.description}</p>
                <a href="#book" class="btn ${pricing.featured ? 'btn-primary' : 'btn-secondary'} pricing-btn" data-service-name="${pricing.name}">
                    Book Stitching Order
                </a>
            </div>
        `;
    },

    // 8. FAQ Accordion Component
    FAQAccordion: function(faq, index) {
        return `
            <div class="faq-item" id="faq-item-${index}">
                <button class="faq-header" type="button" aria-expanded="false" aria-controls="faq-body-${index}" onclick="window.toggleFAQ(${index})">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down faq-icon-indicator" aria-hidden="true"></i>
                </button>
                <div class="faq-body" id="faq-body-${index}" aria-hidden="true">
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
        const reviewOptions = servicesList.length ? servicesList : [
            'Blouse Stitching',
            'Designer Blouse',
            'Petticoat Stitching',
            'Lehenga Stitching',
            'Suit Stitching',
            'Salwar Suit',
            'Kurti Stitching',
            'Bridal Wear',
            'Wedding Wear',
            'Party Wear',
            'Alteration',
            'Custom Designer Outfit',
            'Other'
        ];

        const serviceOptions = reviewOptions.map(option => `
            <option value="${option}">${option}</option>
        `).join('');

        return `
            <div class="review-form-card">
                <h3>Share Your Review</h3>
                <form id="customer-review-form" onsubmit="window.handleReviewSubmit(event)">
                    <div id="review-form-status" class="form-status"></div>

                    <div class="form-group">
                        <label class="form-label" for="rev-name">Customer name *</label>
                        <input class="form-input" type="text" id="rev-name" name="rev-name" required placeholder="e.g., Priya Sharma">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-phone">Phone number *</label>
                        <input class="form-input" type="tel" id="rev-phone" name="rev-phone" required placeholder="+91 98765 43210">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-email">Email address <span class="form-note">optional</span></label>
                        <input class="form-input" type="email" id="rev-email" name="rev-email" placeholder="you@example.com">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-service">Service used *</label>
                        <select class="form-select" id="rev-service" name="rev-service" required>
                            <option value="" disabled selected>Select a service</option>
                            ${serviceOptions}
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Rating *</label>
                        <div class="star-rating-select" id="review-stars-container">
                            <i class="fas fa-star active" data-rating="1" onclick="window.setReviewRating(1)"></i>
                            <i class="fas fa-star active" data-rating="2" onclick="window.setReviewRating(2)"></i>
                            <i class="fas fa-star active" data-rating="3" onclick="window.setReviewRating(3)"></i>
                            <i class="fas fa-star active" data-rating="4" onclick="window.setReviewRating(4)"></i>
                            <i class="fas fa-star active" data-rating="5" onclick="window.setReviewRating(5)"></i>
                        </div>
                        <input type="hidden" id="rev-rating" name="rev-rating" value="5">
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-comment">Review message *</label>
                        <textarea class="form-textarea" id="rev-comment" name="rev-comment" required placeholder="Share your experience with fitting, finishing, delivery, and service..."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="rev-image">Upload image <span class="form-note">optional</span></label>
                        <input class="form-input" type="file" id="rev-image" name="rev-image" accept="image/*">
                    </div>

                    <button class="btn btn-gold booking-submit-btn" type="submit">
                        <i class="fas fa-paper-plane"></i> Submit Review
                    </button>
                </form>
            </div>
        `;
    },

    // 11. Support Form Component
    SupportForm: function() {
        const categories = COMPONENT_CONFIG.supportCategories || [
            'Booking issue',
            'Pickup issue',
            'Delivery issue',
            'Fitting issue',
            'Measurement issue',
            'Pricing issue',
            'Payment issue',
            'Review issue',
            'Other'
        ];

        const categoryOptions = categories.map(option => `
            <option value="${option}">${option}</option>
        `).join('');

        return `
            <div class="support-form-card">
                <form id="support-form" onsubmit="window.handleSupportSubmit(event)">
                    <div id="support-form-status" class="form-status"></div>

                    <h3>Submit a support request</h3>

                    <div class="form-group">
                        <label class="form-label" for="support-name">Full name *</label>
                        <input class="form-input" type="text" id="support-name" name="support-name" required placeholder="Your full name" oninput="window.clearFieldError(this)">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="support-phone">Phone number *</label>
                        <input class="form-input" type="tel" id="support-phone" name="support-phone" required placeholder="+91 98765 43210" oninput="window.clearFieldError(this)">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="support-email">Email address <span class="form-note">optional</span></label>
                        <input class="form-input" type="email" id="support-email" name="support-email" placeholder="you@example.com" oninput="window.clearFieldError(this)">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="support-order">Order ID <span class="form-note">optional</span></label>
                        <input class="form-input" type="text" id="support-order" name="support-order" placeholder="E.g. BTN-123456" oninput="window.clearFieldError(this)">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="support-category">Issue category *</label>
                        <select class="form-select" id="support-category" name="support-category" required onchange="window.clearFieldError(this)">
                            <option value="" disabled selected>Select category</option>
                            ${categoryOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="support-message">Message *</label>
                        <textarea class="form-textarea" id="support-message" name="support-message" rows="5" required placeholder="Tell us what happened and how we can help..." oninput="window.clearFieldError(this)"></textarea>
                    </div>
                    <button class="btn btn-primary booking-submit-btn" type="submit">Submit support request</button>
                </form>
            </div>
        `;
    }
};
