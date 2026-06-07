/**
 * ==========================================================================
 * BOUTIQUE WEBPAGE ROUTER & STATE CONTROLLER
 * ==========================================================================
 */

const APP_CONFIG = window.SiteConfig || {};
const SERVICES = APP_CONFIG.services || [];
const DESIGNS = APP_CONFIG.designs || [];
const PRICING = APP_CONFIG.pricing || [];
const PAGE_METADATA = APP_CONFIG.pageMetadata || {};
const DEFAULT_TESTIMONIALS = APP_CONFIG.defaultTestimonials || [];
const FAQS = APP_CONFIG.faqs || [];
const BUSINESS_NAME = APP_CONFIG.businessName || 'Your Boutique Name';
const CITY = APP_CONFIG.city || 'Gorakhpur';
const STATE = APP_CONFIG.state || 'Uttar Pradesh';
const SERVICE_AREA = APP_CONFIG.serviceArea || 'Gorakhpur City';
const ADDRESS = APP_CONFIG.address || '123, Park Road, Civil Lines, Gorakhpur';
const PHONE_DISPLAY = APP_CONFIG.phoneDisplay || '+91 98765 43210';
const PHONE_HREF = APP_CONFIG.getPhoneHref ? APP_CONFIG.getPhoneHref() : 'tel:+919876543210';
const EMAIL = APP_CONFIG.email || 'support@example.com';
const WHATSAPP_MESSAGE = APP_CONFIG.whatsappMessage || 'Hello, I want help with boutique stitching services.';
const WHATSAPP_SUPPORT_MESSAGE = APP_CONFIG.whatsappSupportMessage || 'Hello, I need support for my boutique stitching order.';
const WHATSAPP_PRICE_MESSAGE = APP_CONFIG.whatsappPriceMessage || 'Hello, I need exact pricing for my tailoring order.';
const WHATSAPP_CONTACT_MESSAGE = APP_CONFIG.whatsappContactMessage || 'Hello, I want to contact the boutique for stitching services.';
const WHATSAPP_URL = APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl() : `https://wa.me/919876543210?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
const FOOTER_DESC = APP_CONFIG.footerDescription || 'Premium women’s boutique tailoring service in Gorakhpur for blouse, lehenga, suits, bridal wear, alterations, and custom designs.';


// App State Manager
const AppState = {
    currentRoute: 'home',
    testimonials: [],
    supportRequests: [],
    contactRequests: [],
    pendingReviews: [],
    bookings: [],
    reviewRating: 5,
    currentUser: null,

    init: function() {
        // Load Approved Reviews
        if (!localStorage.getItem('boutique_reviews')) {
            localStorage.setItem('boutique_reviews', JSON.stringify(DEFAULT_TESTIMONIALS));
        }
        this.testimonials = JSON.parse(localStorage.getItem('boutique_reviews'));

        // Load Pending Review Submissions
        if (!localStorage.getItem('boutique_pending_reviews')) {
            localStorage.setItem('boutique_pending_reviews', JSON.stringify([]));
        }
        this.pendingReviews = JSON.parse(localStorage.getItem('boutique_pending_reviews'));

        // Load Support Requests
        if (!localStorage.getItem('boutique_support_requests')) {
            localStorage.setItem('boutique_support_requests', JSON.stringify([]));
        }
        this.supportRequests = JSON.parse(localStorage.getItem('boutique_support_requests'));

        // Load Contact Requests
        if (!localStorage.getItem('boutique_contact_requests')) {
            localStorage.setItem('boutique_contact_requests', JSON.stringify([]));
        }
        this.contactRequests = JSON.parse(localStorage.getItem('boutique_contact_requests'));

        // Load Bookings
        this.bookings = JSON.parse(localStorage.getItem('boutique_bookings') || '[]');

        // Load Active User
        this.currentUser = JSON.parse(localStorage.getItem('boutique_user') || 'null');

        // Setup Hash Change Listener
        window.addEventListener('hashchange', () => this.handleRouting());
        
        // Initial Route
        this.handleRouting();
    },

    handleRouting: function() {
        let rawHash = window.location.hash || '#home';
        let route = rawHash.replace('#', '');
        
        // If route is 'login' and user is logged in, redirect to profile
        if (route === 'login' && this.currentUser) {
            window.location.hash = '#profile';
            return;
        }

        // If route is 'profile' and user is not logged in, redirect to login
        if (route === 'profile' && !this.currentUser) {
            window.location.hash = '#login';
            return;
        }

        this.currentRoute = route;
        this.renderLayout();
        window.scrollTo(0, 0);

        // Close Mobile Menu on Route Change
        const navMenu = document.getElementById('site-menu');
        const navToggle = document.querySelector('.nav-toggle');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
        }
        if (navToggle && navToggle.classList.contains('open')) {
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        if (hamburger && hamburger.classList.contains('open')) {
            hamburger.classList.remove('open');
        }
    },

    renderLayout: function() {
        // 0. Ensure toast container exists
        if (!document.getElementById('toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // 1. Render Header
        const headerHook = document.getElementById('header-hook');
        if (headerHook) {
            headerHook.innerHTML = window.Components.Header(this.currentRoute);
            this.setupHeaderListeners();
        }

        // 2. Render Page Content
        const appRoot = document.getElementById('app-root');
        if (appRoot) {
            appRoot.innerHTML = this.getPageContent(this.currentRoute);
            this.executePageScripts(this.currentRoute);
        }

        // 3. Update page metadata for SEO and sharing
        this.updatePageMeta(this.currentRoute);

        // 4. Render Footer
        const footerHook = document.getElementById('footer-hook');
        if (footerHook) {
            footerHook.innerHTML = window.Components.Footer();
        }

        // 5. Render WhatsApp button
        const whatsappHook = document.getElementById('whatsapp-hook');
        if (whatsappHook) {
            whatsappHook.innerHTML = window.Components.WhatsAppButton();
        }
    },

    updatePageMeta: function(route) {
        const meta = PAGE_METADATA[route] || PAGE_METADATA.default;
        if (typeof document !== 'undefined') {
            document.title = meta.title;
            let description = document.querySelector('meta[name="description"]');
            if (!description) {
                description = document.createElement('meta');
                description.name = 'description';
                document.head.appendChild(description);
            }
            description.content = meta.description;

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.content = meta.ogTitle || meta.title;
            const ogDesc = document.querySelector('meta[property="og:description"]');
            if (ogDesc) ogDesc.content = meta.ogDescription || meta.description;
            const ogUrl = document.querySelector('meta[property="og:url"]');
            if (ogUrl) ogUrl.content = window.location.href;

            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) canonical.href = window.location.origin + window.location.pathname;
        }
    },

    setupHeaderListeners: function() {
        const navToggle = document.querySelector('.nav-toggle');
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.getElementById('site-menu');

        [navToggle, hamburger].forEach(button => {
            if (!button || !navMenu) return;
            button.addEventListener('click', () => {
                const nextOpen = !navMenu.classList.contains('open');
                navMenu.classList.toggle('open');
                button.classList.toggle('open', nextOpen);
                button.setAttribute('aria-expanded', String(nextOpen));
            });
        });
    },

    getPageContent: function(route) {
        switch(route) {
            case 'home':
                return this.renderHomeHtml();
            case 'services':
                return this.renderServicesHtml();
            case 'designs':
                return this.renderDesignsHtml();
            case 'pricing':
                return this.renderPricingHtml();
            case 'book':
                return this.renderBookHtml();
            case 'reviews':
                return this.renderReviewsHtml();
            case 'support':
                return this.renderSupportHtml();
            case 'share-review':
                return this.renderReviewSubmissionHtml();
            case 'help':
                return this.renderHelpHtml();
            case 'contact':
                return this.renderContactHtml();
            case 'admin':
                return this.renderAdminHtml();
            case 'login':
                return this.renderLoginHtml();
            case 'signup':
                return this.renderSignupHtml();
            case 'profile':
                return this.renderProfileHtml();
            default:
                return this.renderHomeHtml();
        }
    },

    executePageScripts: function(route) {
        if (route === 'designs') {
            this.setupDesignsFilter();
        } else if (route === 'book') {
            // Pre-fill date picker with tomorrow's date and wire up booking form
            const dateInput = document.getElementById('book-pickup-date');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.value = tomorrow.toISOString().split('T')[0];
                dateInput.min = tomorrow.toISOString().split('T')[0];
            }
            this.setupBookForm();
        } else if (route === 'share-review') {
            window.setReviewRating(5);
            const imageInput = document.getElementById('rev-image');
            if (imageInput) {
                imageInput.addEventListener('change', () => {
                    const file = imageInput.files[0];
                    if (file && file.size > 4 * 1024 * 1024) {
                        window.showToast('Image file must be under 4MB.', 'error');
                        imageInput.value = '';
                    }
                });
            }
        } else if (route === 'login' || route === 'signup') {
            // Setup auth form handlers
            this.setupAuthForms();
        }
    },

    setupBookForm: function() {
        const form = document.getElementById('booking-form');
        if (!form) return;

        const cityInput = document.getElementById('pickup-city');
        const cityWarning = document.getElementById('city-warning');
        const useLocBtn = document.getElementById('use-location-btn');
        const addressInput = document.getElementById('pickup-address');
        const latInput = document.getElementById('loc-lat');
        const lonInput = document.getElementById('loc-lon');
        const dateInput = document.getElementById('book-pickup-date');

        // City rule: show message when not Gorakhpur
        function checkCity() {
            if (!cityInput) return;
            const val = (cityInput.value || '').trim().toLowerCase();
            if (val && val !== 'gorakhpur') {
                cityWarning.style.display = 'block';
            } else {
                cityWarning.style.display = 'none';
            }
        }

        if (cityInput) {
            cityInput.addEventListener('input', checkCity);
            checkCity();
        }

        // Use current location button
        if (useLocBtn) {
            useLocBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser.');
                    return;
                }
                useLocBtn.disabled = true;
                useLocBtn.textContent = 'Detecting...';
                navigator.geolocation.getCurrentPosition((pos) => {
                    const lat = pos.coords.latitude;
                    const lon = pos.coords.longitude;
                    if (latInput) latInput.value = lat;
                    if (lonInput) lonInput.value = lon;

                    // Fill approximate address and try to set city if within Gorakhpur bbox
                    const approx = `Approximate location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
                    if (addressInput && !addressInput.value) addressInput.value = approx;

                    // Rough Gorakhpur bounding box check
                    if (lat >= 26.6 && lat <= 26.9 && lon >= 83.1 && lon <= 83.6) {
                        if (cityInput && !cityInput.value) cityInput.value = 'Gorakhpur';
                    }

                    useLocBtn.textContent = 'Use My Current Location';
                    useLocBtn.disabled = false;
                    checkCity();
                }, (err) => {
                    console.warn('Geolocation error', err);
                    alert('Unable to detect location. Please enter address manually.');
                    useLocBtn.textContent = 'Use My Current Location';
                    useLocBtn.disabled = false;
                }, { enableHighAccuracy: false, timeout: 10000 });
            });
        }

        // File input size check
        const fileInput = document.getElementById('design-reference');
        if (fileInput) {
            fileInput.addEventListener('change', () => {
                if (fileInput.files && fileInput.files[0]) {
                    const f = fileInput.files[0];
                    const maxMB = 4;
                    if (f.size > maxMB * 1024 * 1024) {
                        alert('Design image is too large. Please use images under ' + maxMB + ' MB.');
                        fileInput.value = '';
                    }
                }
            });
        }

        form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            window.clearFormErrors(form);

            const requiredFields = [
                { id: 'full-name', label: 'Full name' },
                { id: 'phone-primary', label: 'Primary phone number' },
                { id: 'pickup-address', label: 'Pickup address' },
                { id: 'pickup-city', label: 'Pickup city' },
                { id: 'garment-category', label: 'Garment category' },
                { id: 'service-type', label: 'Service type' },
                { id: 'book-pickup-date', label: 'Pickup date' },
                { id: 'book-pickup-time', label: 'Pickup time' }
            ];
            let valid = true;
            requiredFields.forEach(field => {
                const input = document.getElementById(field.id);
                if (!input || !input.value.trim()) {
                    valid = false;
                    if (input) window.setFieldError(input, `${field.label} is required.`);
                }
            });

            const phoneValue = document.getElementById('phone-primary')?.value || '';
            if (phoneValue && !window.validatePhoneNumber(phoneValue)) {
                valid = false;
                const phoneInput = document.getElementById('phone-primary');
                if (phoneInput) window.setFieldError(phoneInput, 'Enter a valid 10-digit phone number.');
            }

            const emailValue = document.getElementById('email')?.value || '';
            if (emailValue && !window.validateEmailAddress(emailValue)) {
                valid = false;
                const emailInput = document.getElementById('email');
                if (emailInput) window.setFieldError(emailInput, 'Enter a valid email address.');
            }

            if (!valid) {
                const status = document.getElementById('booking-form-status');
                if (status) {
                    status.style.display = 'block';
                    status.textContent = 'Please fix the highlighted fields before submitting.';
                }
                return;
            }

            const data = new FormData(form);
            const payload = {};
            for (const [k,v] of data.entries()) payload[k] = v;

            // Keep a local copy (simulation)
            try { localStorage.setItem('lastBooking', JSON.stringify({payload, created: Date.now()})); } catch(e) {}

            // Show success message
            const wrapper = document.getElementById('booking-form-wrapper');
            if (wrapper) {
                wrapper.innerHTML = `<div class="booking-success"><h3>Thank you! Your booking request has been received.</h3><p>Our boutique help desk will contact you shortly for confirmation.</p></div>`;
                document.querySelector('.booking-success').scrollIntoView({ behavior: 'smooth' });
            }
        });

        // small UX: set min date to tomorrow if date input present
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.min = tomorrow.toISOString().split('T')[0];
        }
    },

    setupAuthForms: function() {
        // Signup form
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            const cityWarning = document.getElementById('signup-city-warning');
            const cityInput = document.getElementById('signup-city');
            function checkCity() {
                if (!cityInput) return;
                const val = (cityInput.value || '').trim().toLowerCase();
                cityWarning.style.display = (val && val !== 'gorakhpur') ? 'block' : 'none';
            }
            if (cityInput) cityInput.addEventListener('input', checkCity);

            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(signupForm);
                const user = {
                    name: data.get('fullName') || '',
                    phone: data.get('mobile') || '',
                    phoneAlt: data.get('mobileAlt') || '',
                    email: data.get('email') || '',
                    address: data.get('address') || '',
                    city: data.get('city') || '',
                    password: data.get('password') || ''
                };

                const pass = data.get('password');
                const pass2 = data.get('confirmPassword');
                const errBox = document.getElementById('signup-error');
                const successBox = document.getElementById('signup-success');
                if (pass !== pass2) {
                    if (errBox) { errBox.textContent = 'Passwords do not match.'; errBox.style.display = 'block'; }
                    return;
                }
                if (!user.name || !user.phone) {
                    if (errBox) { errBox.textContent = 'Please provide your name and mobile number.'; errBox.style.display = 'block'; }
                    return;
                }

                // Save user locally (placeholder auth)
                try { localStorage.setItem('boutique_user', JSON.stringify(user)); } catch(e) {}
                if (errBox) errBox.style.display = 'none';
                if (successBox) { successBox.style.display = 'block'; successBox.textContent = 'Account created. You are now logged in.'; }

                // mark currentUser and redirect to profile after short delay
                this.currentUser = user;
                setTimeout(() => { window.location.hash = '#profile'; }, 1200);
            });
        }

        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const data = new FormData(loginForm);
                const id = (data.get('loginId') || '').trim();
                const pw = (data.get('loginPassword') || '');
                const errBox = document.getElementById('login-error');

                const stored = localStorage.getItem('boutique_user');
                if (!stored) {
                    if (errBox) { errBox.textContent = 'No account found. Please sign up first.'; errBox.style.display = 'block'; }
                    return;
                }
                const user = JSON.parse(stored);
                // placeholder: accept login if id matches phone or email and password matches
                if ((id === user.phone || id === user.email || id === user.name) && pw === user.password) {
                    if (errBox) errBox.style.display = 'none';
                    this.currentUser = user;
                    localStorage.setItem('boutique_user', JSON.stringify(user));
                    window.location.hash = '#profile';
                } else {
                    if (errBox) { errBox.textContent = 'Invalid credentials.'; errBox.style.display = 'block'; }
                }
            });
        }
    },

    /* ==========================================================================
       PAGE HTML RENDERERS
       ========================================================================== */

    renderHomeHtml: function() {
        const servicesGridHTML = SERVICES.slice(0, 3).map(s => window.Components.ServiceCard(s)).join('');
        const designsGridHTML = DESIGNS.slice(0, 4).map(d => window.Components.DesignCard(d)).join('');
        const testimonialsGridHTML = this.testimonials.slice(0, 3).map(t => window.Components.TestimonialCard(t)).join('');

        return `
            <!-- Hero Section -->
            <section class="hero">
                <div class="container hero-grid">
                    <div class="hero-content">
                        <span class="hero-tag">Best Women Tailor in Gorakhpur</span>
                        <h1 class="hero-title">Custom Tailoring for <span>Every Beautiful Occasion</span></h1>
                        <p class="hero-desc">You bring the fabric, we stitch the fitting! Stitched to perfection blouses, salwar suits, kurtis, lehengas, and designer bridal outfits at your doorstep in Gorakhpur City.</p>
                        <div class="hero-actions">
                            <a href="#book" class="btn btn-primary"><i class="fas fa-scissors"></i> Book Doorstep Fitting</a>
                            <a href="#designs" class="btn btn-secondary"><i class="fas fa-images"></i> Browse Designs</a>
                        </div>
                        <div class="hero-stats">
                            <div class="stat-item">
                                <h4>5,000+</h4>
                                <p>Outfits Stitched</p>
                            </div>
                            <div class="stat-item">
                                <h4>99.2%</h4>
                                <p>Perfect Fit Ratio</p>
                            </div>
                            <div class="stat-item">
                                <h4>100%</h4>
                                <p>Gorakhpur Delivery</p>
                            </div>
                        </div>
                    </div>
                    <div class="hero-image-wrapper">
                        <div class="hero-img-bg"></div>
                        <div class="hero-img-card">
                                <img loading="lazy" src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&auto=format&fit=crop&q=80" alt="Boutique tailoring sample in Gorakhpur" width="460" height="500" onerror="this.style.minHeight='300px';this.style.background='linear-gradient(135deg,#ffeef1,#f5eedf)';this.src='';this.alt='🪡 Premium Tailoring'">
                        </div>
                    </div>
                </div>
            </section>

            <!-- How It Works Section -->
            <section class="booking-section" style="background-color: var(--clr-white);">
                <div class="container">
                    <h2 class="section-title">How It Works</h2>
                    <p class="section-subtitle">Stitching your perfect dress is now just 4 easy steps away</p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-md); margin-top: var(--space-md);">
                        <div style="text-align: center; padding: var(--space-sm);">
                            <div class="step-num" style="margin: 0 auto var(--space-sm);">1</div>
                            <h4 style="margin-bottom: 5px;">Book Online</h4>
                            <p style="font-size: 0.85rem; color: var(--clr-dark-muted);">Schedule a measurement and fabric pickup from your home in Gorakhpur.</p>
                        </div>
                        <div style="text-align: center; padding: var(--space-sm);">
                            <div class="step-num" style="margin: 0 auto var(--space-sm);">2</div>
                            <h4 style="margin-bottom: 5px;">Fabric Pickup</h4>
                            <p style="font-size: 0.85rem; color: var(--clr-dark-muted);">Our representative picks up your cloth material and a best-fitting reference dress.</p>
                        </div>
                        <div style="text-align: center; padding: var(--space-sm);">
                            <div class="step-num" style="margin: 0 auto var(--space-sm);">3</div>
                            <h4 style="margin-bottom: 5px;">Stitched with Care</h4>
                            <p style="font-size: 0.85rem; color: var(--clr-dark-muted);">Our specialized master tailors design and stitch your garment in our clean workshop.</p>
                        </div>
                        <div style="text-align: center; padding: var(--space-sm);">
                            <div class="step-num" style="margin: 0 auto var(--space-sm);">4</div>
                            <h4 style="margin-bottom: 5px;">Doorstep Delivery</h4>
                            <p style="font-size: 0.85rem; color: var(--clr-dark-muted);">Your custom-stitched outfit is delivered to your doorstep in 5-7 days. Pay on delivery.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Boutique Story Section -->
            <section class="about-section">
                <div class="container about-grid">
                    <div class="about-img-box">
                        <img loading="lazy" class="about-img-main" src="https://images.unsplash.com/photo-1528570305086-13d300b900e6?w=600&auto=format&fit=crop&q=80" alt="Tailoring workshop and materials" onerror="this.style.minHeight='300px';this.style.background='linear-gradient(135deg,#ffeef1,#f5eedf)';this.src='';this.alt='✂️'">
                        <div class="about-badge">15+ Years of Stitching Expertise</div>
                    </div>
                    <div class="about-content">
                        <h3>We Craft Magic out of Fabric</h3>
                        <p>At Your Boutique Name, we understand that a dress is not just clothes; it is a canvas of your self-expression. We are Gorakhpur’s premium doorstep ladies tailoring service. You supply your favorite dress material, and our master craftsmen tailor it into a stunning silhouette.</p>
                        <p>From heavy designer lehengas for brides, padded blouses for special occasions, to classic everyday salwar suits, we treat every stitch with care. Your fit, comfort, and smile are our top priorities.</p>
                        <div class="about-features">
                            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Doorstep Pickup & Drop</div>
                            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Best Fit Guarantee</div>
                            <div class="about-feature-item"><i class="fas fa-check-circle"></i> Skilled Female Tailors</div>
                            <div class="about-feature-item"><i class="fas fa-check-circle"></i> On-Time Delivery</div>
                        </div>
                        <div style="margin-top: var(--space-md);">
                            <a href="#contact" class="btn btn-gold">Learn More About Us</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Services Overview Section -->
            <section class="services-section">
                <div class="container">
                    <h2 class="section-title">Stitching Services</h2>
                    <p class="section-subtitle">What we stitch for the elegant women of Gorakhpur</p>
                    <div class="services-grid">
                        ${servicesGridHTML}
                    </div>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <a href="#services" class="btn btn-secondary">View All Services <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </section>

            <!-- Design Sneak Peek Section -->
            <section class="designs-section">
                <div class="container">
                    <h2 class="section-title">Design Showcase</h2>
                    <p class="section-subtitle">Stunning stitching work crafted by our master artisans</p>
                    <div class="gallery-grid">
                        ${designsGridHTML}
                    </div>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <a href="#designs" class="btn btn-gold">Explore Design Catalog <i class="fas fa-th"></i></a>
                    </div>
                </div>
            </section>

            <!-- Testimonials Sneak Peek Section -->
            <section class="reviews-section">
                <div class="container">
                    <h2 class="section-title">What Our Customers Say</h2>
                    <p class="section-subtitle">Highly rated fits by women across Gorakhpur</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--space-sm);">
                        ${testimonialsGridHTML}
                    </div>
                    <div style="text-align: center; margin-top: var(--space-lg);">
                        <a href="#reviews" class="btn btn-secondary">Write or Read More Reviews <i class="far fa-comments"></i></a>
                    </div>
                </div>
            </section>
        `;
    },

    renderServicesHtml: function() {
        // Full services page with detailed cards
        const services = [
            { id: 'blouse', title: 'Blouse Stitching', desc: 'Perfectly fitted blouse stitching for sarees, parties, weddings, and daily wear.', price: 350 },
            { id: 'designer-blouse', title: 'Designer Blouse', desc: 'Stylish designer blouse stitching with modern neck, sleeve, back, lining, and fitting options.', price: 750 },
            { id: 'petticoat', title: 'Petticoat Stitching', desc: 'Comfortable petticoat stitching with proper length, waist fitting, and fabric finishing.', price: 199 },
            { id: 'lehenga', title: 'Lehenga Stitching', desc: 'Custom lehenga stitching for festive wear, wedding functions, bridal looks, and special occasions.', price: 2499 },
            { id: 'suit', title: 'Suit Stitching', desc: 'Beautiful suit stitching for daily wear, office wear, festive wear, and party wear.', price: 650 },
            { id: 'salwar-suit', title: 'Salwar Suit Stitching', desc: 'Traditional and modern salwar suit stitching with comfortable fitting and clean finishing.', price: 650 },
            { id: 'kurti', title: 'Kurti Stitching', desc: 'Simple and designer kurti stitching for casual, office, and festive use.', price: 299 },
            { id: 'bridal', title: 'Bridal Wear', desc: 'Premium bridal stitching with careful fitting, finishing, and elegant design details.', price: 4999 },
            { id: 'wedding-clothes', title: 'Wedding Clothes', desc: 'Custom stitching for wedding outfits, family functions, reception, mehendi, haldi, and engagement.', price: 2999 },
            { id: 'party', title: 'Party Wear', desc: 'Stylish party wear stitching for special events, celebrations, and festive occasions.', price: 1199 },
            { id: 'alterations', title: 'Alterations', desc: 'Alteration service for blouse, suits, lehenga, kurti, fitting correction, length adjustment, and resizing.', price: 99 },
            { id: 'custom-designer', title: 'Custom Designer Outfits', desc: 'Bring your design idea or reference image, and we will stitch a custom outfit for you.', price: 1999 }
        ];

        const quotes = [
            'Your fabric, our craftsmanship.',
            'Every stitch tells your story.',
            'Designed for comfort, stitched for elegance.',
            'Premium stitching for every occasion.',
            'Made to fit you beautifully.'
        ];

        const cardsHTML = services.map((s, i) => `
            <article class="service-full-card">
                <div class="service-img-placeholder">Image</div>
                <div class="service-full-body">
                    <h3>${s.title}</h3>
                    <p class="card-text">${s.desc}</p>
                    <div class="service-meta">
                        <div class="starting-price">Starting from ₹${s.price}</div>
                        <a class="btn btn-primary" href="#book" data-route>Book Now</a>
                    </div>
                    <div class="service-quote">${quotes[i % quotes.length]}</div>
                </div>
            </article>
        `).join('');

        return `
            <section class="services-page">
                <div class="container">
                    <h2 class="section-title">Women’s Boutique Tailoring Services in Gorakhpur</h2>
                    <p class="section-subtitle">Premium stitching for blouse, petticoat, lehenga, suits, bridal wear, wedding clothes, party wear, alterations, and custom designs.</p>

                    <div class="services-full-grid">
                        ${cardsHTML}
                    </div>

                    <div class="price-note" style="margin-top: var(--space-lg); color: var(--clr-dark-muted);">Final price may vary depending on fabric, design, lining, embroidery, fitting, and urgency.</div>

                    <section class="services-cta" style="margin-top: var(--space-xl); text-align:center;">
                        <h2>Ready to stitch your perfect outfit?</h2>
                        <p>Book your order online and get free pickup on your first order in Gorakhpur.</p>
                        <a class="btn btn-gold" href="#book" data-route>Book Stitching Order</a>
                    </section>
                </div>
            </section>
        `;
    },

    renderDesignsHtml: function() {
        const designsGridHTML = DESIGNS.map(d => window.Components.DesignCard(d)).join('');
        return `
            <section class="designs-section">
                <div class="container">
                    <h1 class="section-title">Boutique Design Gallery</h1>
                    <p class="section-subtitle">Explore sample stitching designs for blouse, lehenga, suits, bridal wear, wedding functions, party wear, and custom outfits.</p>

                    <div class="gallery-filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="Blouse">Blouse</button>
                        <button class="filter-btn" data-filter="Lehenga">Lehenga</button>
                        <button class="filter-btn" data-filter="Suit">Suit</button>
                        <button class="filter-btn" data-filter="Bridal">Bridal</button>
                        <button class="filter-btn" data-filter="Party Wear">Party Wear</button>
                        <button class="filter-btn" data-filter="Custom">Custom</button>
                    </div>

                    <div class="gallery-grid" id="design-gallery-grid">
                        ${designsGridHTML}
                    </div>

                    <div class="gallery-cta">
                        <h2>Like one of these designs?</h2>
                        <p>Book a similar design and our boutique help desk will contact you for cloth pickup and measurement.</p>
                        <a class="btn btn-gold" href="#book" data-route>Book Similar Design</a>
                    </div>
                </div>
            </section>
        `;
    },

    setupDesignsFilter: function() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const cards = document.querySelectorAll('.design-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        // Add fade-in animation
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transition = 'opacity 0.4s ease';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    },

    renderPricingHtml: function() {
        const pricingGridHTML = PRICING.map(p => window.Components.PricingCard(p)).join('');
        return `
            <section class="pricing-section">
                <div class="container">
                    <h1 class="section-title">Boutique Tailoring Price List</h1>
                    <p class="section-subtitle">Transparent starting prices for women’s tailoring services in Gorakhpur.</p>

                    <div class="pricing-notice">
                        <i class="fas fa-info-circle"></i> Final price may vary depending on fabric, design, lining, embroidery, fitting, urgency, and customization.
                    </div>

                    <div class="pricing-grid">
                        ${pricingGridHTML}
                    </div>

                    <div class="pricing-offer-card">
                        <div>
                            <h3>First Order Offer</h3>
                            <p>Free pickup on your first stitching order in Gorakhpur City.</p>
                        </div>
                        <a href="#book" class="btn btn-gold" data-route>Book Now</a>
                    </div>

                    <div class="pricing-cta">
                        <div class="pricing-cta-copy">
                            <h2>Need exact pricing?</h2>
                            <p>Book your order or contact our WhatsApp help desk. Final price will be confirmed after checking fabric, design, and stitching requirements.</p>
                        </div>
                        <div class="pricing-cta-actions">
                            <a href="#book" class="btn btn-primary" data-route>Book Stitching Order</a>
                            <a href="${APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl(WHATSAPP_PRICE_MESSAGE) : `https://wa.me/919876543210?text=${encodeURIComponent(WHATSAPP_PRICE_MESSAGE)}` }" class="btn btn-secondary" target="_blank" rel="noopener">WhatsApp Help Desk</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderBookHtml: function() {
        return `
            <section class="booking-section">
                <div class="container">
                    <h1 class="section-title">Book Your Stitching Order</h1>
                    <p class="section-subtitle">Share your details and we will contact you for cloth pickup, measurements, and order confirmation.</p>

                    <div class="service-notice">Currently available only in ${SERVICE_AREA}.</div>

                    <div class="booking-grid">
                        <div class="booking-info-box">
                            <h3>How Booking Works</h3>
                            <ul class="booking-steps">
                                <li><strong>Free Pickup:</strong> We collect your fabric from home (Gorakhpur only).</li>
                                <li><strong>Measurements:</strong> We use your sample garment or take fresh measurements.</li>
                                <li><strong>Stitching & Delivery:</strong> Stitching in 5-7 days, doorstep delivery and pay on delivery.</li>
                            </ul>
                            <div style="margin-top: var(--space-md); padding: var(--space-sm); background-color: var(--clr-white); border-radius: var(--radius-md); border-left: 4px solid var(--clr-pink-deep);">
                                <h4 style="font-size: 0.95rem; margin-bottom: 4px;">Free Pickup Locations</h4>
                                <p style="font-size: 0.85rem; color: var(--clr-dark-muted);">Golghar, Civil Lines, Shahpur, Taramandal, Basharatpur, Betiahata, Medical College Road, Rapti Nagar, Rustampur, Kasia Road, and nearby Gorakhpur localities.</p>
                            </div>
                        </div>

                        <div id="booking-form-wrapper">
                            <form id="booking-form" class="booking-form">
                                <input type="hidden" id="loc-lat" name="loc-lat">
                                <input type="hidden" id="loc-lon" name="loc-lon">
                                <div id="booking-form-status" class="form-error" style="display:none; margin-bottom: var(--space-sm);"></div>

                                <fieldset class="form-section">
                                    <legend>Customer Details</legend>
                                    <div class="form-row">
                                        <label>Full name <input id="full-name" name="fullName" class="form-input" required oninput="window.clearFieldError(this)"></label>
                                        <label>Email address <input id="email" name="email" type="email" class="form-input" oninput="window.clearFieldError(this)"></label>
                                    </div>
                                    <div class="form-row">
                                        <label>Primary phone number <input id="phone-primary" name="phonePrimary" type="tel" pattern="[0-9]{10}" class="form-input" required oninput="window.clearFieldError(this)"></label>
                                        <label>Alternate phone number <input id="phone-alt" name="phoneAlt" type="tel" pattern="[0-9]{10}" class="form-input" oninput="window.clearFieldError(this)"></label>
                                    </div>
                                </fieldset>

                                <fieldset class="form-section">
                                    <legend>Pickup Address</legend>
                                    <div class="form-row">
                                        <label>Full pickup address <input id="pickup-address" name="pickupAddress" class="form-input" required oninput="window.clearFieldError(this)"></label>
                                    </div>
                                    <div class="form-row">
                                        <label>Landmark <input id="pickup-landmark" name="pickupLandmark" class="form-input" oninput="window.clearFieldError(this)"></label>
                                        <label>City <input id="pickup-city" name="pickupCity" class="form-input" required oninput="window.clearFieldError(this)"></label>
                                    </div>
                                    <div class="form-row">
                                        <label>Pincode <input id="pickup-pincode" name="pickupPincode" class="form-input" inputmode="numeric" oninput="window.clearFieldError(this)"></label>
                                        <div class="location-actions"><button id="use-location-btn" class="btn btn-secondary">Use My Current Location</button></div>
                                    </div>
                                    <div id="city-warning" class="city-warning" style="display:none;">Service is currently available only in Gorakhpur. We will expand soon.</div>
                                </fieldset>

                                <fieldset class="form-section">
                                    <legend>Garment Details</legend>
                                    <div class="form-row">
                                        <label>Garment category
                                            <select id="garment-category" name="garmentCategory" class="form-input" required onchange="window.clearFieldError(this)">
                                                <option value="" disabled selected>Select garment category</option>
                                                <option>Blouse</option>
                                                <option>Designer Blouse</option>
                                                <option>Petticoat</option>
                                                <option>Lehenga</option>
                                                <option>Suit</option>
                                                <option>Salwar Suit</option>
                                                <option>Kurti</option>
                                                <option>Gown</option>
                                                <option>Bridal Wear</option>
                                                <option>Wedding Wear</option>
                                                <option>Party Wear</option>
                                                <option>Alteration</option>
                                                <option>Other</option>
                                            </select>
                                        </label>
                                        <label>Service type
                                            <select id="service-type" name="serviceType" class="form-input" required onchange="window.clearFieldError(this)">
                                                <option value="" disabled selected>Select service type</option>
                                                <option>New stitching</option>
                                                <option>Alteration</option>
                                                <option>Custom design</option>
                                                <option>Bridal fitting</option>
                                            </select>
                                        </label>
                                    </div>
                                </fieldset>

                                <fieldset class="form-section">
                                    <legend>Pickup & Measurement</legend>
                                    <div class="form-row">
                                        <label>Fabric Pickup Option
                                            <select id="fabric-pickup" name="fabricPickup" class="form-input">
                                                <option>Pickup from my address</option>
                                                <option>I will visit boutique</option>
                                            </select>
                                        </label>
                                        <label>Preferred pickup date <input id="book-pickup-date" name="pickupDate" type="date" class="form-input" required></label>
                                    </div>
                                    <div class="form-row">
                                        <label>Preferred pickup time <input id="book-pickup-time" name="pickupTime" type="time" class="form-input" required></label>
                                        <label>Measurement option
                                            <select id="measurement-option" name="measurementOption" class="form-input">
                                                <option>Use my old sample garment</option>
                                                <option>Take fresh measurement</option>
                                                <option>I will provide measurement</option>
                                            </select>
                                        </label>
                                    </div>
                                </fieldset>

                                <fieldset class="form-section">
                                    <legend>Design Reference & Notes</legend>
                                    <div class="form-row">
                                        <label>Upload design reference image <input id="design-reference" name="designReference" type="file" accept="image/*" class="form-input"></label>
                                    </div>
                                    <div class="form-row">
                                        <label>Special instructions <textarea id="special-instructions" name="specialInstructions" class="form-input" rows="4" placeholder="e.g. preferred sleeve length, lining, padding, delivery notes"></textarea></label>
                                    </div>
                                </fieldset>

                                <div style="display:flex; gap:12px; align-items:center; margin-top: var(--space-md);">
                                    <button type="submit" class="btn btn-gold">Submit Booking Request</button>
                                    <div style="color: var(--clr-dark-muted); font-size:0.95rem;">We will contact you to confirm pickup and measurements.</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderReviewsHtml: function() {
        const reviewsListHTML = this.testimonials.map(t => window.Components.TestimonialCard(t)).join('');
        const averageRating = (this.testimonials.reduce((sum, t) => sum + t.rating, 0) / this.testimonials.length).toFixed(1);

        return `
            <section class="reviews-section">
                <div class="container">
                    <h1 class="section-title">Customer Testimonials</h1>
                    <p class="section-subtitle">Real-style sample reviews from women customers in Gorakhpur. These are placeholder testimonials for now and will be replaced later.</p>

                    <div class="reviews-summary-card">
                        <div>
                            <p class="review-summary-label">Average Rating</p>
                            <h2>${averageRating} / 5</h2>
                        </div>
                        <div class="review-summary-stars">
                            <span>${Array.from({ length: 5 }, (_, i) => i < Math.round(averageRating) ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>').join('')}</span>
                            <span class="review-summary-count">Based on ${this.testimonials.length} reviews</span>
                        </div>
                    </div>

                    <div class="reviews-grid-layout" id="reviews-list-target">
                        ${reviewsListHTML}
                    </div>

                    <div class="reviews-cta">
                        <div>
                            <h2>Have a review to share?</h2>
                            <p>Share your boutique tailoring experience and help others choose the perfect fit.</p>
                        </div>
                        <a href="#share-review" class="btn btn-gold" data-route>Share Your Review</a>
                    </div>
                </div>
            </section>
        `;
    },

    renderReviewSubmissionHtml: function() {
        const serviceOptions = [
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

        return `
            <section class="review-submit-section">
                <div class="container">
                    <div class="review-submit-header">
                        <h1 class="section-title">Share Your Review</h1>
                        <p class="section-subtitle">Tell us about your boutique tailoring experience. Your review will be shown publicly only after approval.</p>
                    </div>

                    <div class="review-submit-grid">
                        <div class="review-submit-copy">
                            <div class="review-info-box">
                                <h3>Why approval is required?</h3>
                                <p>To keep our review page genuine and helpful, every review is checked before it is published.</p>
                            </div>
                            <div class="review-submit-highlights">
                                <div class="highlight-card">
                                    <h4>Safe and trusted</h4>
                                    <p>Each review is verified for authenticity before it appears on the website.</p>
                                </div>
                                <div class="highlight-card">
                                    <h4>Easy on mobile</h4>
                                    <p>The form is designed for quick submission from your phone or tablet.</p>
                                </div>
                            </div>
                        </div>

                        <div id="review-form-wrapper">
                            ${window.Components.ReviewForm(serviceOptions)}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderSupportHtml: function() {
        return `
            <section class="support-section">
                <div class="container">
                    <div class="support-header">
                        <h1 class="section-title">Customer Support</h1>
                        <p class="section-subtitle">Submit your issue and our boutique support team will contact you shortly.</p>
                    </div>

                    <div class="support-main-grid">
                        <div class="support-form-card-wrapper">
                            ${window.Components.SupportForm()}
                        </div>

                        <div class="support-info-panel">
                            <div class="support-info-card">
                                <h3>WhatsApp Help Desk</h3>
                                <a href="${APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl(WHATSAPP_SUPPORT_MESSAGE) : `https://wa.me/919876543210?text=${encodeURIComponent(WHATSAPP_SUPPORT_MESSAGE)}` }" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-block">Chat on WhatsApp</a>
                            </div>
                            <div class="support-info-card">
                                <h3>Call Support</h3>
                                <a href="${PHONE_HREF}" class="btn btn-secondary btn-block">Call ${PHONE_DISPLAY}</a>
                            </div>
                            <div class="support-info-card">
                                <h3>Email Support</h3>
                                <a href="${APP_CONFIG.getEmailHref ? APP_CONFIG.getEmailHref() : `mailto:${EMAIL}`}" class="support-link">${EMAIL}</a>
                            </div>
                            <div class="support-info-card">
                                <h3>Service Area</h3>
                                <p>${SERVICE_AREA}</p>
                            </div>
                            <div class="support-info-card">
                                <h3>Support Hours</h3>
                                <p>10:00 AM – 7:00 PM</p>
                            </div>
                            <div class="support-urgent-note">
                                <p><strong>For urgent issues, please contact us directly on WhatsApp.</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderHelpHtml: function() {
        const faqsHTML = FAQS.map((faq, idx) => window.Components.FAQAccordion(faq, idx)).join('');
        return `
            <section class="help-section">
                <div class="container">
                    <h2 class="section-title">Help Desk & FAQs</h2>
                    <p class="section-subtitle">Have questions about measurements, tailoring, or delivery? Find your answers here.</p>
                    
                    <div class="help-grid">
                        <div class="help-intro-box">
                            <h3>Frequently Asked Questions</h3>
                            <p>We strive to make custom boutique tailoring as simple and stress-free as possible for you. If you have any questions that are not answered here, please feel free to reach out directly via WhatsApp or phone call.</p>
                            
                            <div class="help-contact-card">
                                <h4>Need Direct Assistance?</h4>
                                <p style="font-size: 0.9rem; color: var(--clr-dark-muted); margin-bottom: var(--space-sm);">Our customer care desk is open Mon-Sat from 10:00 AM to 8:00 PM.</p>
                                <a href="${PHONE_HREF}" class="btn btn-secondary" style="width: 100%; margin-bottom: 8px;"><i class="fas fa-phone-alt"></i> Call ${PHONE_DISPLAY}</a>
                                <a href="${APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl() : WHATSAPP_URL}" class="btn btn-primary" style="width: 100%; background-color: var(--clr-whatsapp);"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
                            </div>
                        </div>

                        <div>
                            <div class="faq-list">
                                ${faqsHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderContactHtml: function() {
        return `
            <section class="contact-section">
                <div class="container">
                    <div class="section-intro text-center">
                        <h1 class="section-title">Contact Our Boutique</h1>
                        <p class="section-subtitle">Reach us for stitching orders, pickup details, pricing, measurements, fitting support, and custom design help.</p>
                    </div>

                    <div class="contact-grid">
                        <div class="contact-details-box">
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-store"></i></div>
                                <div class="contact-info-text">
                                    <h4>Boutique Name</h4>
                                    <p>${BUSINESS_NAME}</p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-phone-alt"></i></div>
                                <div class="contact-info-text">
                                    <h4>Phone</h4>
                                    <p><a href="${PHONE_HREF}">${PHONE_DISPLAY}</a></p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fab fa-whatsapp"></i></div>
                                <div class="contact-info-text">
                                    <h4>WhatsApp</h4>
                                    <p><a href="${APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl(WHATSAPP_CONTACT_MESSAGE) : `https://wa.me/919876543210?text=${encodeURIComponent(WHATSAPP_CONTACT_MESSAGE)}` }" target="_blank" rel="noopener noreferrer">${PHONE_DISPLAY}</a></p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-envelope"></i></div>
                                <div class="contact-info-text">
                                    <h4>Email</h4>
                                    <p><a href="${APP_CONFIG.getEmailHref ? APP_CONFIG.getEmailHref() : `mailto:${EMAIL}`}">${EMAIL}</a></p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="contact-info-text">
                                    <h4>Address</h4>
                                    <p>${ADDRESS}</p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-broadcast-tower"></i></div>
                                <div class="contact-info-text">
                                    <h4>Service Area</h4>
                                    <p>${SERVICE_AREA}</p>
                                </div>
                            </div>
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-clock"></i></div>
                                <div class="contact-info-text">
                                    <h4>Opening Hours</h4>
                                    <p>10:00 AM – 7:00 PM</p>
                                </div>
                            </div>

                            <div class="contact-button-group">
                                <a class="btn btn-primary btn-block" href="${APP_CONFIG.getWhatsAppUrl ? APP_CONFIG.getWhatsAppUrl(WHATSAPP_CONTACT_MESSAGE) : `https://wa.me/919876543210?text=${encodeURIComponent(WHATSAPP_CONTACT_MESSAGE)}` }" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-whatsapp"></i> WhatsApp Help Desk
                                </a>
                                <a class="btn btn-secondary btn-block" href="${PHONE_HREF}">
                                    <i class="fas fa-phone-alt"></i> Call Now
                                </a>
                                <a class="btn btn-gold btn-block" href="#book">
                                    <i class="fas fa-calendar-check"></i> Book Stitching Order
                                </a>
                            </div>

                            <div class="contact-alert-card">
                                <p><strong>Currently serving only Gorakhpur City.</strong></p>
                                <p>Service outside Gorakhpur is not available yet. We will expand soon.</p>
                            </div>
                        </div>

                        <div class="booking-form-card contact-form-card">
                            <h3>Send a Message</h3>
                            <p class="contact-form-note">Our boutique team will respond to your inquiry soon.</p>
                            <form id="contact-message-form" onsubmit="window.handleContactSubmit(event)">
                                <div id="contact-form-status" class="form-error" style="display:none; margin-bottom: var(--space-sm);"></div>
                                <div class="form-group">
                                    <label class="form-label" for="con-name">Full name *</label>
                                    <input class="form-input" type="text" id="con-name" required placeholder="Your name" oninput="window.clearFieldError(this)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-phone">Phone number *</label>
                                    <input class="form-input" type="tel" id="con-phone" required placeholder="${PHONE_DISPLAY}" oninput="window.clearFieldError(this)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-email">Email address</label>
                                    <input class="form-input" type="email" id="con-email" placeholder="${EMAIL}" oninput="window.clearFieldError(this)">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-inquiry">Inquiry type *</label>
                                    <select class="form-select" id="con-inquiry" required onchange="window.clearFieldError(this)">
                                        <option value="" disabled selected>Choose inquiry type</option>
                                        <option value="New stitching order">New stitching order</option>
                                        <option value="Pricing inquiry">Pricing inquiry</option>
                                        <option value="Pickup inquiry">Pickup inquiry</option>
                                        <option value="Measurement inquiry">Measurement inquiry</option>
                                        <option value="Design inquiry">Design inquiry</option>
                                        <option value="Fitting issue">Fitting issue</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-message">Message *</label>
                                    <textarea class="form-textarea" id="con-message" rows="5" required placeholder="Tell us more about your request"></textarea>
                                </div>
                                <button class="btn btn-primary booking-submit-btn" type="submit">
                                    <i class="fas fa-paper-plane"></i> Submit Inquiry
                                </button>
                            </form>
                            <div id="contact-success-message" class="contact-success-card" style="display:none; margin-top: var(--space-lg);">
                                <div class="contact-success-icon"><i class="fas fa-check-circle"></i></div>
                                <h3>Thank you for contacting us.</h3>
                                <p>Our boutique team will get back to you shortly.</p>
                            </div>
                        </div>
                    </div>

                    <div class="contact-map-placeholder contact-map-text-placeholder">
                        <div class="map-placeholder-text">
                            <h4>Google Map location will be added here.</h4>
                            <p>Find our boutique in Gorakhpur City soon.</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderAdminHtml: function() {
        return `
            <section class="admin-section">
                <div class="container">
                    <div class="section-intro text-center">
                        <h1 class="section-title">Admin Placeholder</h1>
                        <p class="section-subtitle">This is a placeholder for boutique admin access. Use login or return to the main site.</p>
                    </div>
                    <div class="admin-actions" style="display:grid; gap:var(--space-sm); max-width:320px; margin:0 auto;">
                        <a href="#login" class="btn btn-primary">Login</a>
                        <a href="#home" class="btn btn-secondary">Back to Home</a>
                    </div>
                </div>
            </section>
        `;
    },

    renderLoginHtml: function() {
        return `
            <section class="auth-page container">
                <div class="auth-card auth-card--center">
                    <h1 class="section-title">Login to Your Account</h1>
                    <p class="section-subtitle">Access your boutique bookings and support details.</p>

                    <div class="auth-body">
                        <div id="login-error" class="form-error" style="display:none;"></div>
                        <form id="login-form" class="auth-form">
                            <label class="form-label">Mobile number or email
                                <input name="loginId" class="form-input" placeholder="Mobile or email" required oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Password
                                <input type="password" name="loginPassword" class="form-input" placeholder="Password" required oninput="window.clearFieldError(this)">
                            </label>
                            <div style="display:flex; justify-content:space-between; align-items:center; margin:8px 0;">
                                <a href="#help" style="color: var(--clr-pink-deep); font-size:0.95rem;">Forgot password?</a>
                                <a href="#signup" style="color: var(--clr-pink-deep); font-size:0.95rem;">New customer? Create an account</a>
                            </div>
                            <button class="btn btn-primary" type="submit" style="width:100%;">Login</button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    },

    renderSignupHtml: function() {
        return `
            <section class="auth-page container">
                <div class="auth-card auth-card--center">
                    <h1 class="section-title">Create Your Boutique Account</h1>
                    <p class="section-subtitle">Sign up to book stitching orders, save your contact details, and get faster support.</p>

                    <div class="auth-body">
                        <div id="signup-error" class="form-error" style="display:none;"></div>
                        <div id="signup-success" class="form-success" style="display:none;"></div>

                        <form id="signup-form" class="auth-form">
                            <label class="form-label">Full name
                                <input name="fullName" class="form-input" placeholder="Your full name" required oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Mobile number
                                <input name="mobile" class="form-input" placeholder="Primary mobile number" required oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Alternate mobile (optional)
                                <input name="mobileAlt" class="form-input" placeholder="Alternate mobile" oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Email address
                                <input name="email" type="email" class="form-input" placeholder="Email address" oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Full address
                                <input name="address" class="form-input" placeholder="House / street / locality" oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">City
                                <input id="signup-city" name="city" class="form-input" placeholder="City" required oninput="window.clearFieldError(this)">
                            </label>
                            <div id="signup-city-warning" class="city-warning" style="display:none;">Service is currently available only in Gorakhpur. We will expand soon.</div>
                            <label class="form-label">Password
                                <input id="signup-password" name="password" type="password" class="form-input" placeholder="Create password" required oninput="window.clearFieldError(this)">
                            </label>
                            <label class="form-label">Confirm password
                                <input id="signup-confirm-password" name="confirmPassword" type="password" class="form-input" placeholder="Confirm password" required oninput="window.clearFieldError(this)">
                            </label>

                            <div style="display:flex; justify-content:space-between; align-items:center; margin-top: var(--space-sm);">
                                <a href="#login" style="color: var(--clr-pink-deep);">Already have an account? Login</a>
                                <button class="btn btn-gold" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        `;
    },

    renderProfileHtml: function() {
        if (!this.currentUser) return '';

        // Filter user bookings
        const userBookings = this.bookings.filter(b => b.phone === this.currentUser.phone);
        
        let bookingsListHTML = '';
        if (userBookings.length === 0) {
            bookingsListHTML = `
                <div style="text-align: center; padding: var(--space-md); color: var(--clr-dark-muted); font-size: 0.9rem;">
                    <i class="fas fa-calendar-times" style="font-size: 2rem; margin-bottom: 8px; display: block; color: var(--clr-rose-gold);"></i>
                    No custom tailoring orders booked yet.
                    <a href="#book" style="color: var(--clr-pink-deep); display: block; margin-top: 5px; font-weight: 600;">Book Your First Order Now &rarr;</a>
                </div>
            `;
        } else {
            bookingsListHTML = userBookings.map(b => `
                <div class="profile-booking-item">
                    <div class="p-book-info">
                        <h4>${b.service}</h4>
                        <p><i class="far fa-calendar-alt"></i> Pickup Scheduled: <strong>${b.pickupDate}</strong> (${b.pickupTime})</p>
                        <p><i class="fas fa-map-marker-alt"></i> Address: ${b.address.length > 45 ? b.address.substring(0, 45) + '...' : b.address}</p>
                    </div>
                    <div>
                        <span class="p-book-status pending"><i class="fas fa-spinner fa-spin"></i> Pending Collection</span>
                    </div>
                </div>
            `).join('');
        }

        return `
            <section class="auth-page">
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar-large">
                            ${this.currentUser.name[0].toUpperCase()}
                        </div>
                        <div class="profile-meta">
                            <h3>${this.currentUser.name}</h3>
                            <p><i class="far fa-envelope"></i> ${this.currentUser.email} | <i class="fas fa-mobile-alt"></i> +91 ${this.currentUser.phone}</p>
                        </div>
                        <div style="margin-left: auto;">
                            <button class="btn btn-secondary" onclick="window.handleLogout()" style="padding: 6px 14px; font-size: 0.75rem;"><i class="fas fa-sign-out-alt"></i> Logout</button>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-md);">
                        <div>
                            <h4 class="profile-section-title">My Stitching Bookings</h4>
                            <div class="profile-bookings-list">
                                ${bookingsListHTML}
                            </div>
                        </div>

                        <div>
                            <h4 class="profile-section-title">Your Material Status</h4>
                            <div style="background-color: var(--clr-cream-light); padding: var(--space-sm); border-radius: var(--radius-md); border: 1px solid rgba(197, 145, 135, 0.1); font-size: 0.85rem;">
                                <p style="margin-bottom: 8px;"><strong>Providing Own Cloth:</strong> Yes, please keep your cloth piece washed/ironed for pickup.</p>
                                <p><strong>Fitting Sample:</strong> Please provide a sample dress that fits you perfectly for our master tailors to copy measurements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};

/* ==========================================================================
   INTERACTIVE WINDOW FUNCTIONS (Attached to global scope)
   ========================================================================== */

// 1. FAQ accordion toggle script
window.toggleFAQ = function(index) {
    const faqBody = document.getElementById(`faq-body-${index}`);
    const faqItem = document.getElementById(`faq-item-${index}`);
    const faqButton = document.querySelector(`#faq-item-${index} .faq-header`);
    
    if (faqBody && faqItem && faqButton) {
        const isOpen = faqItem.classList.contains('open');
        
        // Close all other FAQs for clean accordion effect
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
            const body = item.querySelector('.faq-body');
            const button = item.querySelector('.faq-header');
            if (body) {
                body.style.maxHeight = '0';
                body.setAttribute('aria-hidden', 'true');
            }
            if (button) button.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            faqItem.classList.add('open');
            faqBody.style.maxHeight = faqBody.scrollHeight + "px";
            faqBody.setAttribute('aria-hidden', 'false');
            faqButton.setAttribute('aria-expanded', 'true');
        } else {
            faqItem.classList.remove('open');
            faqBody.style.maxHeight = "0";
            faqBody.setAttribute('aria-hidden', 'true');
            faqButton.setAttribute('aria-expanded', 'false');
        }
    }
};

// 2. Booking form submission handler
window.handleBookingSubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('book-name').value;
    const phone = document.getElementById('book-phone').value;
    const email = document.getElementById('book-email').value;
    const service = document.getElementById('book-service').value;
    const pickupDate = document.getElementById('book-pickup-date').value;
    const pickupTime = document.getElementById('book-pickup-time').value;
    const address = document.getElementById('book-address').value;
    const notes = document.getElementById('book-notes').value;
    const provideMaterial = document.getElementById('book-pickup-material').checked;

    const bookingRef = 'BTN-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = {
        ref: bookingRef,
        name,
        phone,
        email,
        service,
        pickupDate,
        pickupTime,
        address,
        notes,
        provideMaterial,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    // Save to Local Storage
    const allBookings = JSON.parse(localStorage.getItem('boutique_bookings') || '[]');
    allBookings.push(newBooking);
    localStorage.setItem('boutique_bookings', JSON.stringify(allBookings));

    // Update state variables
    AppState.bookings = allBookings;

    // Show Confirmation Layout
    const bookingFormWrapper = document.getElementById('booking-form-wrapper');
    if (bookingFormWrapper) {
        bookingFormWrapper.innerHTML = `
            <div class="booking-form-card booking-success">
                <div class="booking-success-icon"><i class="fas fa-check-circle"></i></div>
                <h3 class="booking-success-title">Booking Request Confirmed!</h3>
                <p style="font-size: 0.95rem; color: var(--clr-dark-muted);">We have scheduled your custom tailoring measurement pickup.</p>
                <div class="booking-ref-box">Reference ID: ${bookingRef}</div>
                <p style="font-size: 0.85rem; color: var(--clr-dark-muted); margin-bottom: var(--space-sm);">Our designer support team will call you within 2 hours at <strong>${PHONE_DISPLAY}</strong> to verify the pickup address in ${CITY}.</p>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    <a href="#profile" class="btn btn-primary" style="width: 100%;">View My Bookings</a>
                    <button onclick="window.resetBookingForm()" class="btn btn-secondary" style="width: 100%;">Book Another Garment</button>
                </div>
            </div>
        `;
    }
};

window.resetBookingForm = function() {
    const bookingFormWrapper = document.getElementById('booking-form-wrapper');
    if (bookingFormWrapper) {
        bookingFormWrapper.innerHTML = window.Components.BookingForm(SERVICES);
        AppState.executePageScripts('book');
    }
};

// 3. Reviews management
window.setReviewRating = function(rating) {
    AppState.reviewRating = rating;
    const starsContainer = document.getElementById('review-stars-container');
    if (starsContainer) {
        const stars = starsContainer.querySelectorAll('i');
        stars.forEach(star => {
            const starVal = parseInt(star.getAttribute('data-rating'));
            if (starVal <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
    const hiddenRatingInput = document.getElementById('rev-rating');
    if (hiddenRatingInput) {
        hiddenRatingInput.value = rating;
    }
};

window.handleReviewSubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById('rev-name').value.trim();
    const phone = document.getElementById('rev-phone').value.trim();
    const email = document.getElementById('rev-email').value.trim();
    const service = document.getElementById('rev-service').value;
    const rating = AppState.reviewRating;
    const comment = document.getElementById('rev-comment').value.trim();
    const imageInput = document.getElementById('rev-image');
    const imageFile = imageInput && imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;
    const statusField = document.getElementById('review-form-status');

    if (!name || !phone || !service || !comment) {
        if (statusField) {
            statusField.style.display = 'block';
            statusField.textContent = 'Please complete all required review fields before submitting.';
        }
        return;
    }

    if (imageFile && imageFile.size > 4 * 1024 * 1024) {
        if (statusField) {
            statusField.style.display = 'block';
            statusField.textContent = 'Image must be smaller than 4MB. Please choose a smaller file or skip image upload.';
        }
        return;
    }

    const newReview = {
        name,
        phone,
        email: email || null,
        service,
        rating,
        comment,
        imageName: imageFile ? imageFile.name : null,
        status: 'pending',
        submittedAt: new Date().toISOString()
    };

    const pendingList = JSON.parse(localStorage.getItem('boutique_pending_reviews') || '[]');
    pendingList.unshift(newReview);
    localStorage.setItem('boutique_pending_reviews', JSON.stringify(pendingList));
    AppState.pendingReviews = pendingList;

    const formWrapper = document.getElementById('review-form-wrapper');
    if (formWrapper) {
        formWrapper.innerHTML = `
            <div class="review-success-card">
                <div class="review-success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Thank you for your review.</h3>
                <p>It has been submitted for approval and will appear on our website after verification.</p>
            </div>
        `;
    }

    window.setReviewRating(5);
    window.showToast('Thank you for your review. It will be published after approval.', 'success');
};

window.approvePendingReview = function(index) {
    const pendingList = JSON.parse(localStorage.getItem('boutique_pending_reviews') || '[]');
    if (!pendingList[index]) return null;

    const reviewToApprove = pendingList.splice(index, 1)[0];
    reviewToApprove.status = 'approved';
    reviewToApprove.approvedAt = new Date().toISOString();

    const approvedList = JSON.parse(localStorage.getItem('boutique_reviews') || '[]');
    approvedList.unshift(reviewToApprove);
    localStorage.setItem('boutique_reviews', JSON.stringify(approvedList));
    localStorage.setItem('boutique_pending_reviews', JSON.stringify(pendingList));
    AppState.testimonials = approvedList;
    AppState.pendingReviews = pendingList;

    return reviewToApprove;
};

window.handleSupportSubmit = function(event) {
    event.preventDefault();
    const form = document.getElementById('support-form');
    window.clearFormErrors(form);

    const name = document.getElementById('support-name').value.trim();
    const phone = document.getElementById('support-phone').value.trim();
    const email = document.getElementById('support-email').value.trim();
    const orderId = document.getElementById('support-order').value.trim();
    const category = document.getElementById('support-category').value;
    const message = document.getElementById('support-message').value.trim();
    const statusField = document.getElementById('support-form-status');

    let valid = true;
    if (!name) {
        valid = false;
        window.setFieldError(document.getElementById('support-name'), 'Name is required.');
    }
    if (!phone) {
        valid = false;
        window.setFieldError(document.getElementById('support-phone'), 'Phone number is required.');
    } else if (!window.validatePhoneNumber(phone)) {
        valid = false;
        window.setFieldError(document.getElementById('support-phone'), 'Enter a valid 10-digit phone number.');
    }
    if (email && !window.validateEmailAddress(email)) {
        valid = false;
        window.setFieldError(document.getElementById('support-email'), 'Enter a valid email address.');
    }
    if (!category) {
        valid = false;
        window.setFieldError(document.getElementById('support-category'), 'Please select a category.');
    }
    if (!message) {
        valid = false;
        window.setFieldError(document.getElementById('support-message'), 'Please describe the issue.');
    }

    if (!valid) {
        if (statusField) {
            statusField.style.display = 'block';
            statusField.textContent = 'Please correct the highlighted fields and try again.';
        }
        return;
    }

    const newRequest = {
        name,
        phone,
        email: email || null,
        orderId: orderId || null,
        category,
        message,
        status: 'received',
        requestedAt: new Date().toISOString()
    };

    const requests = JSON.parse(localStorage.getItem('boutique_support_requests') || '[]');
    requests.unshift(newRequest);
    localStorage.setItem('boutique_support_requests', JSON.stringify(requests));
    AppState.supportRequests = requests;

    const formWrapper = document.getElementById('support-form-wrapper');
    if (formWrapper) {
        formWrapper.innerHTML = `
            <div class="support-success-card">
                <div class="support-success-icon"><i class="fas fa-check-circle"></i></div>
                <h3>Your support request has been received.</h3>
                <p>Our team will contact you shortly.</p>
            </div>
        `;
    }

    window.showToast('Support request sent successfully. Our team will contact you shortly.', 'success');
};

// 4. Contact Form Submission
window.handleContactSubmit = function(event) {
    event.preventDefault();
    const form = document.getElementById('contact-message-form');
    window.clearFormErrors(form);

    const name = document.getElementById('con-name').value.trim();
    const phone = document.getElementById('con-phone').value.trim();
    const email = document.getElementById('con-email').value.trim();
    const inquiryType = document.getElementById('con-inquiry').value;
    const message = document.getElementById('con-message').value.trim();
    const statusField = document.getElementById('contact-form-status');

    let valid = true;
    if (!name) {
        valid = false;
        window.setFieldError(document.getElementById('con-name'), 'Full name is required.');
    }
    if (!phone) {
        valid = false;
        window.setFieldError(document.getElementById('con-phone'), 'Phone number is required.');
    } else if (!window.validatePhoneNumber(phone)) {
        valid = false;
        window.setFieldError(document.getElementById('con-phone'), 'Enter a valid 10-digit phone number.');
    }
    if (email && !window.validateEmailAddress(email)) {
        valid = false;
        window.setFieldError(document.getElementById('con-email'), 'Enter a valid email address.');
    }
    if (!inquiryType) {
        valid = false;
        window.setFieldError(document.getElementById('con-inquiry'), 'Please select an inquiry type.');
    }
    if (!message) {
        valid = false;
        window.setFieldError(document.getElementById('con-message'), 'Message is required.');
    }

    if (!valid) {
        if (statusField) {
            statusField.style.display = 'block';
            statusField.textContent = 'Please fix the highlighted fields before sending your inquiry.';
        }
        return;
    }

    const contactRequest = {
        id: `contact_${Date.now()}`,
        name,
        phone,
        email: email || null,
        inquiryType,
        message,
        submittedAt: new Date().toISOString(),
        status: 'new'
    };

    const requests = JSON.parse(localStorage.getItem('boutique_contact_requests') || '[]');
    requests.unshift(contactRequest);
    localStorage.setItem('boutique_contact_requests', JSON.stringify(requests));
    AppState.contactRequests = requests;

    const successCard = document.getElementById('contact-success-message');
    const contactForm = document.getElementById('contact-message-form');
    if (contactForm) {
        contactForm.style.display = 'none';
    }
    if (successCard) {
        successCard.style.display = 'block';
    }

    window.showToast('Thank you for contacting us. Our boutique team will get back to you shortly.', 'success');
};

// 5. Auth / Accounts management
window.toggleAuthTab = function(tab) {
    const loginWrapper = document.getElementById('auth-login-form-wrapper');
    const signupWrapper = document.getElementById('auth-signup-form-wrapper');
    const loginTabBtn = document.getElementById('auth-login-tab');
    const signupTabBtn = document.getElementById('auth-signup-tab');

    if (tab === 'login') {
        loginWrapper.style.display = 'block';
        signupWrapper.style.display = 'none';
        loginTabBtn.classList.add('active');
        signupTabBtn.classList.remove('active');
    } else {
        loginWrapper.style.display = 'none';
        signupWrapper.style.display = 'block';
        loginTabBtn.classList.remove('active');
        signupTabBtn.classList.add('active');
    }
};

window.handleLoginSubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const name = email.split('@')[0]; // Simple dummy name extractor

    const dummyUser = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        phone: '9876543210' // Default dummy phone number to link dummy bookings
    };

    localStorage.setItem('boutique_user', JSON.stringify(dummyUser));
    AppState.currentUser = dummyUser;
    
    // Redirect to profile hash
    window.location.hash = '#profile';
};

window.handleLogout = function() {
    localStorage.removeItem('boutique_user');
    AppState.currentUser = null;
    window.location.hash = '#home';
};

window.clearFieldError = function(input) {
    if (!input) return;
    const sibling = input.nextElementSibling;
    if (sibling && sibling.classList.contains('field-error')) {
        sibling.remove();
    }
    input.classList.remove('input-error');
};

window.clearFormErrors = function(form) {
    if (!form) return;
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.input-error').forEach(input => input.classList.remove('input-error'));
    const status = form.querySelector('.form-error');
    if (status) {
        status.style.display = 'none';
        status.textContent = '';
    }
};

window.setFieldError = function(input, message) {
    if (!input) return;
    window.clearFieldError(input);
    const error = document.createElement('div');
    error.className = 'field-error';
    error.textContent = message;
    input.classList.add('input-error');
    if (input.parentNode) {
        input.parentNode.insertBefore(error, input.nextSibling);
    }
};

window.validatePhoneNumber = function(phone) {
    const digits = (phone || '').replace(/\D/g, '');
    return digits.length === 10 || (digits.length === 12 && digits.startsWith('91'));
};

window.validateEmailAddress = function(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

window.isGorakhpurCity = function(city) {
    const targetCity = (CITY || 'Gorakhpur').trim().toLowerCase();
    return (city || '').trim().toLowerCase().includes(targetCity);
};

// Start the application on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
});

// Lightweight page controller for static sections and mobile nav
(function() {
    function setYear() {
        const y = new Date().getFullYear();
        const el = document.getElementById('year');
        if (el) el.textContent = y;
    }

    function toggleNav() {
        const buttons = Array.from(document.querySelectorAll('.nav-toggle, .hamburger'));
        const menu = document.getElementById('site-menu');
        if (!menu) return;
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextOpen = !menu.classList.contains('open');
                menu.classList.toggle('open');
                btn.classList.toggle('open', nextOpen);
                btn.setAttribute('aria-expanded', String(nextOpen));
            });
        });
    }

    function showSectionFromHash() {
        const hash = (window.location.hash || '#home').replace('#','');
        const sections = document.querySelectorAll('.page-section');
        sections.forEach(s => s.classList.remove('active'));
        const target = document.getElementById(hash);
        if (target) target.classList.add('active');
    }

    function setupRouteLinks() {
        const links = document.querySelectorAll('[data-route]');
        links.forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href') || '#home';
                window.location.hash = href;
                e.preventDefault();
                showSectionFromHash();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        setYear();
        setupRouteLinks();
        showSectionFromHash();
        window.addEventListener('hashchange', showSectionFromHash);
    });
})();

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
window.showToast = function(message, type = 'success', duration = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        container.setAttribute('role', 'status');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : '✕';
    toast.innerHTML = `<span style="font-weight:700;font-size:1.1rem">${icon}</span> ${message}`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastOut 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 350);
    }, duration);
};
