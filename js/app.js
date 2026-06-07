/**
 * ==========================================================================
 * BOUTIQUE WEBPAGE ROUTER & STATE CONTROLLER
 * ==========================================================================
 */

// Mock Databases
const SERVICES = [
    {
        id: 'blouse',
        name: 'Designer Blouse & Petticoat',
        category: 'Indian Traditional',
        description: 'Stitching of gorgeous designer blouses (padded, backless, collar neck, halter neck, back-dori, heavy embroidery fitting) with matching satin petticoats.',
        startingPrice: 350,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'salwar-suit',
        name: 'Salwar Suits & Anarkalis',
        category: 'Suits & Kurtis',
        description: 'Custom stitched Patiala suits, Anarkali gowns, straight suits, palazzo suits, and Punjabi suits tailored exactly to your measurements with canvas collars.',
        startingPrice: 650,
        image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'lehenga',
        name: 'Wedding Lehenga & Ghagras',
        category: 'Bridal & Party Wear',
        description: 'Custom heavy bridal lehenga stitching with boutique lining, can-can mesh installation, customized waist hangings (latkans), and dupatta draping border attachment.',
        startingPrice: 2499,
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'kurti',
        name: 'Casual & Office Wear Kurtis',
        category: 'Suits & Kurtis',
        description: 'Daily wear, formal office wear, short and long kurtis stitched with trendy necklines, sleeve designs, and pockets.',
        startingPrice: 299,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'party-wear',
        name: 'Custom Gowns & Party Outfits',
        category: 'Bridal & Party Wear',
        description: 'Premium floor-length western gowns, Indo-western crop tops with skirts, designer drape sarees, and elegant wedding guest party wear.',
        startingPrice: 1199,
        image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80'
    },
    {
        id: 'alterations',
        name: 'Boutique Alterations & Styling',
        category: 'Services',
        description: 'Breathe new life into your old clothes. We offer resizing, fit corrections, shoulder adjustments, border sewing, zipper repairs, and custom conversions.',
        startingPrice: 99,
        image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&auto=format&fit=crop&q=80'
    }
];

const DESIGNS = [
    { id: 1, title: 'Intricate Bridal Lehenga', category: 'Lehenga', style: 'Bridal Heavy Can-can', likes: 142, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80' },
    { id: 2, title: 'Princess Cut Padded Blouse', category: 'Blouse', style: 'Sweetheart Neck, Dori', likes: 88, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80' },
    { id: 3, title: 'Floral Silk Salwar Suit', category: 'Suit', style: 'Straight Cut, Pant Plazo', likes: 64, image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Gold Border Designer Saree Blouse', category: 'Blouse', style: 'Deep back U-Neck', likes: 110, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80' },
    { id: 5, title: 'Chikankari Suit with Lace', category: 'Suit', style: 'V-neck border styling', likes: 92, image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80' },
    { id: 6, title: 'Heavy Zardozi Bridal Blouse', category: 'Blouse', style: 'Sheer Back, Elbow Sleeve', likes: 215, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80' },
    { id: 7, title: 'Pastel Lehenga with Heavy Latkans', category: 'Lehenga', style: 'Double Dupatta Styling', likes: 168, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80' },
    { id: 8, title: 'Indo-Western Crop Top Gown', category: 'Bridal', style: 'One-shoulder asymmetric', likes: 79, image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80' }
];

const PRICING = [
    {
        name: 'Blouse Stitching',
        price: '350',
        icon: 'fas fa-cut',
        featured: false,
        features: ['Perfect fit guarantee', 'Inner premium lining stitching', 'Simple round/square back design', 'Double stitching inside', 'Overlock stitch finish']
    },
    {
        name: 'Salwar Suit Tailoring',
        price: '650',
        icon: 'fas fa-scissors',
        featured: true,
        features: ['Stitching of Top & Bottom', 'Choice of Salwar/Pant/Palazzo', 'Front/Back Neck Canvas styling', 'Perfect armhole tailoring', 'Overlock & side-slit lining']
    },
    {
        name: 'Designer Blouse Premium',
        price: '750',
        icon: 'fas fa-gem',
        featured: false,
        features: ['Padded princess cut setup', 'Trendy neck designs (Halter, Collar)', 'Backless / Deep neck with dori', 'Border border attachment', 'Custom measurements adjustment']
    },
    {
        name: 'Lehenga Ghagra Tailoring',
        price: '2,499',
        icon: 'fas fa-crown',
        featured: false,
        features: ['Heavy panel stitching (Kalis)', 'Can-can mesh layer addition', 'Handmade custom Latkans (Hangings)', 'Dupatta border & tassels work', 'Heavy designer waistband fit']
    }
];

const DEFAULT_TESTIMONIALS = [
    { name: 'Kiran Dwivedi', rating: 5, service: 'Bridal Lehenga Stitching', comment: 'Absolutely stunned by the bridal lehenga stitching! They added double-layer can-can and custom matching latkans that matched my dress. The fit in Golghar for pickup was super convenient.', date: '2026-05-18' },
    { name: 'Shweta Mishra', rating: 5, service: 'Designer Padded Blouse', comment: 'Excellent fitting! Stitched a princess-cut velvet blouse with beautiful piping and dori details. I provided my own cloth and they tailored it exactly like the Pinterest picture I showed. Highly recommended!', date: '2026-06-01' },
    { name: 'Ankita Singh', rating: 4, service: 'Anarkali Salwar Suit', comment: 'Good tailoring work. The styling of the border lace on the sleeves was done with attention to detail. Free pickup and delivery in Shahpur made it completely hassle-free.', date: '2026-06-05' }
];

const FAQS = [
    { question: 'How does Your Boutique Name tailoring work?', answer: 'It is simple! 1. You book a measurement pickup online or call us. 2. Our tailors/riders visit your house in Gorakhpur to collect your fabric and a reference fitting dress. 3. We stitch your garment according to your design instructions at our boutique. 4. We deliver the stitched dress back to your doorstep within 5-7 days. Payment is made on delivery.' },
    { question: 'Do you provide fabric / cloth materials?', answer: 'No, we do not sell cloth. We are a pure custom stitching tailoring service. You need to purchase and provide the fabric/material. If your garment requires matching lining (aster) or piping, we can provide standard quality ones at nominal extra charges, or you can supply them.' },
    { question: 'Is the pickup and delivery free in Gorakhpur?', answer: 'Yes! We offer <strong>Free Pickup & Delivery</strong> on your first order. For subsequent orders, delivery is free for orders above ₹700, otherwise a nominal delivery charge of ₹40 applies inside Gorakhpur City limits.' },
    { question: 'What is the standard turnaround time for delivery?', answer: 'Our standard delivery time is <strong>5 to 7 days</strong> from the day we pickup your fabric. We also offer Express Delivery (within 48 hours) at an additional 50% express fee, subject to slot availability.' },
    { question: 'What if the stitched dress does not fit perfectly?', answer: 'We strive for a first-time perfect fit by taking meticulous measurements. However, if there are any fitting issues, we provide <strong>Free Alteration services</strong>. Simply request an alteration pickup through our Help Desk within 3 days of delivery and we will fix it.' },
    { question: 'Where is your shop located in Gorakhpur?', answer: 'Our central boutique workshop is located at 123, Park Road, Civil Lines, Gorakhpur. However, you do not need to travel, as our home pickup and delivery service covers all major locations including Golghar, Shahpur, Taramandal, Basharatpur, Medical Road, and Betiahata.' }
];

// App State Manager
const AppState = {
    currentRoute: 'home',
    testimonials: [],
    bookings: [],
    reviewRating: 5,
    currentUser: null,

    init: function() {
        // Load Reviews
        if (!localStorage.getItem('boutique_reviews')) {
            localStorage.setItem('boutique_reviews', JSON.stringify(DEFAULT_TESTIMONIALS));
        }
        this.testimonials = JSON.parse(localStorage.getItem('boutique_reviews'));

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
        const navMenu = document.getElementById('nav-menu-list');
        const hamburger = document.getElementById('hamburger-btn');
        if (navMenu && navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    },

    renderLayout: function() {
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

        // 3. Render Footer
        const footerHook = document.getElementById('footer-hook');
        if (footerHook) {
            footerHook.innerHTML = window.Components.Footer();
        }

        // 4. Render WhatsApp button
        const whatsappHook = document.getElementById('whatsapp-hook');
        if (whatsappHook) {
            whatsappHook.innerHTML = window.Components.WhatsAppButton();
        }
    },

    setupHeaderListeners: function() {
        const hamburger = document.getElementById('hamburger-btn');
        const navMenu = document.getElementById('nav-menu-list');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('open');
                navMenu.classList.toggle('open');
            });
        }
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
            case 'help':
                return this.renderHelpHtml();
            case 'contact':
                return this.renderContactHtml();
            case 'login':
                return this.renderLoginHtml();
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
            // Pre-fill date picker with tomorrow's date
            const dateInput = document.getElementById('book-pickup-date');
            if (dateInput) {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                dateInput.value = tomorrow.toISOString().split('T')[0];
                dateInput.min = tomorrow.toISOString().split('T')[0];
            }
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
                            <img src="https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=800&auto=format&fit=crop&q=80" alt="Boutique Tailoring Gorakhpur" width="460" height="500">
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
                        <img class="about-img-main" src="https://images.unsplash.com/photo-1528570305086-13d300b900e6?w=600&auto=format&fit=crop&q=80" alt="About Our Tailoring Shop">
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
        const servicesGridHTML = SERVICES.map(s => window.Components.ServiceCard(s)).join('');
        return `
            <section class="services-section">
                <div class="container">
                    <h2 class="section-title">Our Stitching Services</h2>
                    <p class="section-subtitle">We stitch ladies clothing of all types. Select an outfit and get it custom made!</p>
                    <div class="services-grid">
                        ${servicesGridHTML}
                    </div>
                </div>
            </section>
        `;
    },

    renderDesignsHtml: function() {
        const designsGridHTML = DESIGNS.map(d => window.Components.DesignCard(d)).join('');
        return `
            <section class="designs-section">
                <div class="container">
                    <h2 class="section-title">Our Design Catalog</h2>
                    <p class="section-subtitle">Browse through our tailoring catalog of beautiful neck patterns, sleeve fits, and designs</p>
                    
                    <div class="gallery-filters">
                        <button class="filter-btn active" data-filter="all">All Designs</button>
                        <button class="filter-btn" data-filter="Blouse">Blouses</button>
                        <button class="filter-btn" data-filter="Lehenga">Lehengas</button>
                        <button class="filter-btn" data-filter="Suit">Salwar Suits</button>
                        <button class="filter-btn" data-filter="Bridal">Bridal/Designer</button>
                    </div>

                    <div class="gallery-grid" id="design-gallery-grid">
                        ${designsGridHTML}
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
                    <h2 class="section-title">Stitching Price List</h2>
                    <p class="section-subtitle">Transparent pricing for premium boutique craftsmanship. No hidden fees.</p>
                    
                    <div class="pricing-notice">
                        <i class="fas fa-info-circle"></i>
                        <strong>Note:</strong> Customers provide their own fabric/cloth materials. Listed prices are for basic stitching + standard interlining. Additional designer back neck cuts, pads, laces, borders, latkans, or custom cuts will incur extra nominal styling charges.
                    </div>

                    <div class="pricing-grid">
                        ${pricingGridHTML}
                    </div>

                    <div style="margin-top: var(--space-xl); background-color: var(--clr-white); padding: var(--space-lg); border-radius: var(--radius-lg); box-shadow: var(--shadow-soft);">
                        <h3 style="font-size: 1.6rem; text-align: center; margin-bottom: var(--space-md);">Stitching Custom Add-on Pricing Estimator</h3>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-md);">
                            <div>
                                <h4 style="color: var(--clr-pink-deep); margin-bottom: 8px;"><i class="fas fa-feather-alt"></i> Blouse Styling Add-ons</h4>
                                <ul style="list-style: none; font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Padded bust inserts</span> <span>₹100</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Designer neck pattern (Sweetheart/Collar)</span> <span>₹80</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Deep backless layout (with Dori)</span> <span>₹100</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Cotton/Satin Lining material (Aster)</span> <span>₹80-120</span></li>
                                </ul>
                            </div>
                            <div>
                                <h4 style="color: var(--clr-pink-deep); margin-bottom: 8px;"><i class="fas fa-magic"></i> Kurti & Suits Add-ons</h4>
                                <ul style="list-style: none; font-size: 0.9rem; display: flex; flex-direction: column; gap: 6px;">
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Designer sleeves (Bell/Balloon/Organza)</span> <span>₹60</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Lining attachment (full lining)</span> <span>₹150</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Boutique lace & piping borders fit</span> <span>₹50-100</span></li>
                                    <li style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 4px;"><span>Designer neck patch / fabric buttons</span> <span>₹70</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderBookHtml: function() {
        const bookingFormHTML = window.Components.BookingForm(SERVICES);
        return `
            <section class="booking-section">
                <div class="container">
                    <h2 class="section-title">Book Stitching Pickup</h2>
                    <p class="section-subtitle">Let our tailors handle the styling. Fill in your details below to schedule a free doorstep pickup in Gorakhpur.</p>
                    
                    <div class="booking-grid">
                        <div class="booking-info-box">
                            <h3>Doorstep Measurement & Pickup Details</h3>
                            <p>Here is what happens once you submit your booking inquiry:</p>
                            
                            <ul class="booking-steps">
                                <li class="booking-step-item">
                                    <div class="step-num">1</div>
                                    <div class="step-text">
                                        <h4>Schedule Setup</h4>
                                        <p>We confirm your requested pickup slot in Gorakhpur via phone or WhatsApp.</p>
                                    </div>
                                </li>
                                <li class="booking-step-item">
                                    <div class="step-num">2</div>
                                    <div class="step-text">
                                        <h4>Measurements & Fabric Collection</h4>
                                        <p>Our rider collects your cloth fabric and a perfect-fit reference outfit. Alternatively, our female tailoring expert can visit for body measurements.</p>
                                    </div>
                                </li>
                                <li class="booking-step-item">
                                    <div class="step-num">3</div>
                                    <div class="step-text">
                                        <h4>Custom Stitching</h4>
                                        <p>Your garment is tailored with double stitching and neat lining under expert supervision.</p>
                                    </div>
                                </li>
                                <li class="booking-step-item">
                                    <div class="step-num">4</div>
                                    <div class="step-text">
                                        <h4>Home Delivery & Try-on</h4>
                                        <p>We deliver it back in 5-7 days. Pay after trying it on. If adjustments are needed, alterations are completely free!</p>
                                    </div>
                                </li>
                            </ul>

                            <div style="margin-top: var(--space-md); padding: var(--space-sm); background-color: var(--clr-white); border-radius: var(--radius-md); border-left: 4px solid var(--clr-pink-deep);">
                                <h4 style="font-size: 0.95rem; margin-bottom: 4px;"><i class="fas fa-truck-loading" style="color: var(--clr-pink-deep);"></i> Free Pickup Locations</h4>
                                <p style="font-size: 0.8rem; color: var(--clr-dark-muted);"> Golghar, Civil Lines, Shahpur, Taramandal, Basharatpur, Betiahata, Medical College Road, Rapti Nagar, Rustampur, Kasia Road, and all areas in Gorakhpur City limits.</p>
                            </div>
                        </div>

                        <div id="booking-form-wrapper">
                            ${bookingFormHTML}
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderReviewsHtml: function() {
        const reviewsListHTML = this.testimonials.map(t => window.Components.TestimonialCard(t)).join('');
        const reviewFormHTML = window.Components.ReviewForm(SERVICES);

        // Aggregate statistics
        const averageRating = (this.testimonials.reduce((sum, t) => sum + t.rating, 0) / this.testimonials.length).toFixed(1);

        return `
            <section class="reviews-section">
                <div class="container">
                    <h2 class="section-title">Customer Reviews</h2>
                    <p class="section-subtitle">See why women in Gorakhpur love our designer fitting work</p>
                    
                    <div style="background-color: var(--clr-white); padding: var(--space-md); border-radius: var(--radius-md); box-shadow: var(--shadow-soft); display: flex; align-items: center; justify-content: space-around; flex-wrap: wrap; gap: var(--space-sm); margin-bottom: var(--space-lg); border: 1px solid rgba(197, 145, 135, 0.08);">
                        <div style="text-align: center;">
                            <h3 style="font-size: 3rem; color: var(--clr-pink-deep); font-family: var(--font-heading); line-height: 1;">${averageRating}</h3>
                            <div class="testimonial-stars" style="justify-content: center; font-size: 1.2rem; margin: 5px 0;">
                                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                            </div>
                            <p style="font-size: 0.85rem; color: var(--clr-dark-muted); font-weight: 500;">Based on ${this.testimonials.length} reviews</p>
                        </div>
                        <div style="max-width: 400px; width: 100%; display: flex; flex-direction: column; gap: 6px;">
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem;">
                                <span style="width: 50px;">5 Star</span>
                                <div style="flex-grow: 1; height: 8px; background-color: var(--clr-cream-dark); border-radius: 4px; overflow: hidden;"><div style="width: 85%; height: 100%; background-color: #ffc107;"></div></div>
                                <span style="width: 30px; text-align: right;">85%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem;">
                                <span style="width: 50px;">4 Star</span>
                                <div style="flex-grow: 1; height: 8px; background-color: var(--clr-cream-dark); border-radius: 4px; overflow: hidden;"><div style="width: 15%; height: 100%; background-color: #ffc107;"></div></div>
                                <span style="width: 30px; text-align: right;">15%</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: rgba(0,0,0,0.3);">
                                <span style="width: 50px;">3 Star</span>
                                <div style="flex-grow: 1; height: 8px; background-color: var(--clr-cream-dark); border-radius: 4px; overflow: hidden;"><div style="width: 0%; height: 100%; background-color: #ffc107;"></div></div>
                                <span style="width: 30px; text-align: right;">0%</span>
                            </div>
                        </div>
                    </div>

                    <div class="reviews-grid-layout">
                        <div class="reviews-list-container" id="reviews-list-target">
                            ${reviewsListHTML}
                        </div>
                        
                        <div id="reviews-form-wrapper">
                            ${reviewFormHTML}
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
                                <a href="tel:+919876543210" class="btn btn-secondary" style="width: 100%; margin-bottom: 8px;"><i class="fas fa-phone-alt"></i> Call +91 98765 43210</a>
                                <a href="https://wa.me/919876543210" class="btn btn-primary" style="width: 100%; background-color: var(--clr-whatsapp);"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>
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
                    <h2 class="section-title">Contact Us</h2>
                    <p class="section-subtitle">Reach out for custom bridal stitching appointments or boutique workshop inquiries in Gorakhpur.</p>
                    
                    <div class="contact-grid">
                        <div class="contact-details-box">
                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-map-marker-alt"></i></div>
                                <div class="contact-info-text">
                                    <h4>Workshop Address</h4>
                                    <p>123, Park Road, Near Town Hall, Civil Lines, Gorakhpur, Uttar Pradesh - 273001</p>
                                </div>
                            </div>

                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-phone-alt"></i></div>
                                <div class="contact-info-text">
                                    <h4>Call / WhatsApp</h4>
                                    <p><a href="tel:+919876543210">+91 98765 43210</a> / <a href="https://wa.me/919876543210">+91 98765 43210</a></p>
                                </div>
                            </div>

                            <div class="contact-info-card">
                                <div class="contact-info-icon"><i class="fas fa-envelope"></i></div>
                                <div class="contact-info-text">
                                    <h4>Email Support</h4>
                                    <p><a href="mailto:info@yourboutiquename.com">info@yourboutiquename.com</a></p>
                                </div>
                            </div>

                            <div class="contact-map-placeholder">
                                <img src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80" alt="Gorakhpur map location">
                                <div class="map-overlay-badge">
                                    <strong>Central Gorakhpur Workshop</strong><br>
                                    Civil Lines, Near Park Road<br>
                                    <span style="font-size:0.75rem; color:var(--clr-dark-muted);">We offer home pickups across all of Gorakhpur City</span>
                                </div>
                            </div>
                        </div>

                        <div class="booking-form-card">
                            <h3 style="margin-bottom: var(--space-sm);">Send Us a Message</h3>
                            <form id="contact-message-form" onsubmit="window.handleContactSubmit(event)">
                                <div class="form-group">
                                    <label class="form-label" for="con-name">Your Full Name *</label>
                                    <input class="form-input" type="text" id="con-name" required placeholder="Name">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-phone">Phone Number *</label>
                                    <input class="form-input" type="tel" id="con-phone" required placeholder="Phone Number">
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-subject">Subject *</label>
                                    <select class="form-select" id="con-subject" required>
                                        <option value="" disabled selected>-- Select Subject --</option>
                                        <option value="Bridal Tailoring Inquiry">Bridal Tailoring Appointment</option>
                                        <option value="Bulk Stitching Order">Bulk Uniform/Group Stitching</option>
                                        <option value="Alteration Request">Alteration Pickup</option>
                                        <option value="General Question">General Customization Query</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label" for="con-msg">Message / Query Details *</label>
                                    <textarea class="form-textarea" id="con-msg" required placeholder="Type your design requirements or questions here..."></textarea>
                                </div>
                                <button class="btn btn-primary booking-submit-btn" type="submit">
                                    <i class="fas fa-paper-plane"></i> Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    renderLoginHtml: function() {
        return `
            <section class="auth-page">
                <div class="auth-card">
                    <div class="auth-tabs">
                        <button class="auth-tab-btn active" id="auth-login-tab" onclick="window.toggleAuthTab('login')">Login</button>
                        <button class="auth-tab-btn" id="auth-signup-tab" onclick="window.toggleAuthTab('signup')">Sign Up</button>
                    </div>

                    <!-- Login Form -->
                    <div id="auth-login-form-wrapper">
                        <form class="auth-form" onsubmit="window.handleLoginSubmit(event)">
                            <div class="form-group">
                                <label class="form-label" for="login-email">Email Address *</label>
                                <input class="form-input" type="email" id="login-email" required placeholder="e.g. customer@example.com" value="priya@example.com">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="login-pass">Password *</label>
                                <input class="form-input" type="password" id="login-pass" required placeholder="••••••••" value="password123">
                            </div>
                            <div style="font-size: 0.8rem; text-align: right; margin-bottom: var(--space-xs);">
                                <a href="#help" style="color: var(--clr-pink-deep);">Forgot Password?</a>
                            </div>
                            <button class="btn btn-primary" type="submit" style="width: 100%;">Login to Account</button>
                        </form>
                    </div>

                    <!-- Signup Form (hidden initially) -->
                    <div id="auth-signup-form-wrapper" style="display: none;">
                        <form class="auth-form" onsubmit="window.handleSignupSubmit(event)">
                            <div class="form-group">
                                <label class="form-label" for="sign-name">Full Name *</label>
                                <input class="form-input" type="text" id="sign-name" required placeholder="Your Name">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="sign-email">Email Address *</label>
                                <input class="form-input" type="email" id="sign-email" required placeholder="Your email">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="sign-phone">Phone Number *</label>
                                <input class="form-input" type="tel" id="sign-phone" required placeholder="Phone number (10 digit)">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="sign-pass">Create Password *</label>
                                <input class="form-input" type="password" id="sign-pass" required placeholder="Password">
                            </div>
                            <button class="btn btn-gold" type="submit" style="width: 100%; margin-top: var(--space-xs);">Create Account</button>
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
                        <p><i class="fas fa-map-marker-alt"></i> Address: ${b.address.substring(0, 45)}...</p>
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
    
    if (faqBody && faqItem) {
        const isOpen = faqItem.classList.contains('open');
        
        // Close all other FAQs for clean accordion effect
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('open');
            const body = item.querySelector('.faq-body');
            if (body) body.style.maxHeight = '0';
        });

        if (!isOpen) {
            faqItem.classList.add('open');
            faqBody.style.maxHeight = faqBody.scrollHeight + "px";
        } else {
            faqItem.classList.remove('open');
            faqBody.style.maxHeight = "0";
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
                <p style="font-size: 0.85rem; color: var(--clr-dark-muted); margin-bottom: var(--space-sm);">Our designer support team will call you within 2 hours at <strong>+91 ${phone}</strong> to verify the pickup address in Gorakhpur.</p>
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

    const name = document.getElementById('rev-name').value;
    const service = document.getElementById('rev-service').value;
    const rating = AppState.reviewRating;
    const comment = document.getElementById('rev-comment').value;

    const newReview = {
        name,
        service,
        rating,
        comment,
        date: new Date().toISOString().split('T')[0]
    };

    const allReviews = JSON.parse(localStorage.getItem('boutique_reviews'));
    allReviews.unshift(newReview);
    localStorage.setItem('boutique_reviews', JSON.stringify(allReviews));

    AppState.testimonials = allReviews;

    // Reset Review input form and append review to list
    event.target.reset();
    window.setReviewRating(5);

    // Refresh reviews UI list
    const reviewsListTarget = document.getElementById('reviews-list-target');
    if (reviewsListTarget) {
        reviewsListTarget.innerHTML = allReviews.map(t => window.Components.TestimonialCard(t)).join('');
    }

    // Success alert message popup style
    alert('Thank you for sharing your experience! Your review is posted successfully.');
};

// 4. Contact Form Submission
window.handleContactSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('con-name').value;
    const phone = document.getElementById('con-phone').value;
    
    alert(`Thank you ${name}! We have received your query. Our boutique tailor master will call you back on +91 ${phone} shortly.`);
    event.target.reset();
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

window.handleSignupSubmit = function(event) {
    event.preventDefault();
    const name = document.getElementById('sign-name').value;
    const email = document.getElementById('sign-email').value;
    const phone = document.getElementById('sign-phone').value;

    const newUser = {
        name: name,
        email: email,
        phone: phone
    };

    localStorage.setItem('boutique_user', JSON.stringify(newUser));
    AppState.currentUser = newUser;

    // Save default mock booking to profile page to populate data for new users
    const userBookings = JSON.parse(localStorage.getItem('boutique_bookings') || '[]');
    const hasBooking = userBookings.some(b => b.phone === phone);
    if (!hasBooking) {
        userBookings.push({
            ref: 'BTN-753951',
            name: name,
            phone: phone,
            email: email,
            service: 'Designer Blouse & Petticoat',
            pickupDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days later
            pickupTime: '12:00 PM - 03:00 PM',
            address: 'Basharatpur Main Road, Gorakhpur',
            notes: 'Keep front neck depth 7.5 inch and back hook closure style.',
            provideMaterial: true,
            status: 'pending',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('boutique_bookings', JSON.stringify(userBookings));
        AppState.bookings = userBookings;
    }

    window.location.hash = '#profile';
};

window.handleLogout = function() {
    localStorage.removeItem('boutique_user');
    AppState.currentUser = null;
    window.location.hash = '#home';
};

// Start the application on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    AppState.init();
});
