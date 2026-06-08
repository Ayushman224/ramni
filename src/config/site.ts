import { Service, GalleryItem, PricingItem, Testimonial, FAQ, PageMetadata, ServiceAreas } from '../types'

export type HelpTopic = {
  title: string;
  description: string;
  icon: string;
};

export const SITE_CONFIG = {
  businessName: "Stitchly",
  brandTagline: "Custom Tailoring Across India",
  offerBanner: "Free Pickup on Your First Order | Serving Delhi, Noida & Gorakhpur",
  city: "Delhi",
  state: "Delhi",
  serviceArea: "Delhi, Noida & Gorakhpur",
  address: "Delhi, Noida & Gorakhpur",
  openingHours: "10:00 AM – 7:00 PM",
  email: "support@stitchly.in",
  phoneDisplay: "+91 98765 43210",
  phoneNumber: "9876543210",
  internationalPhone: "+919876543210",
  whatsappNumber: "919876543210",
  whatsappMessage: "Hello, I want help with boutique stitching services.",
  whatsappSupportMessage: "Hello, I need support for my boutique stitching order.",
  whatsappPriceMessage: "Hello, I need exact pricing for my tailoring order.",
  whatsappContactMessage: "Hello, I want to contact the boutique for stitching services.",
  footerDescription: "Stitchly is a custom tailoring platform that allows customers to submit stitching orders online. Customers can schedule cloth pickup, provide measurements, upload design references, and receive professionally stitched garments at their doorstep.",
  quotes: {
    "Every stitch tells your story": "Every stitch tells your story.",
    "Designed for comfort, stitched for elegance": "Designed for comfort, stitched for elegance.",
    "Your fabric, our craftsmanship": "Your fabric, our craftsmanship.",
    "Made to fit you beautifully": "Made to fit you beautifully.",
    "Premium stitching for every occasion": "Premium stitching for every occasion.",
    "From daily wear to wedding wear, we stitch with care": "From daily wear to wedding wear, we stitch with care.",
    "Book online, relax at home, and let us handle pickup": "Book online, relax at home, and let us handle pickup."
  },
  socialLinks: [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "X / Twitter", url: "#" }
  ],
  helpTopics: [
    { title: "How to Book Stitching Order", description: "Learn how to book your stitching order online in just a few simple steps.", icon: "📖" },
    { title: "Cloth Pickup Process", description: "Find out how our pickup process works and how to schedule a pickup time.", icon: "🚚" },
    { title: "Measurement Support", description: "Everything you need to know about providing or taking measurements.", icon: "📏" },
    { title: "Delivery Timeline", description: "Understand our standard delivery timeline and express delivery options.", icon: "⏱️" },
    { title: "Pricing Details", description: "Get clarity on our pricing structure and factors that affect final cost.", icon: "💰" },
    { title: "Order Changes", description: "How to request changes to your order after it has been placed.", icon: "✏️" },
    { title: "Cancellation", description: "Our cancellation policy and how to cancel an order if needed.", icon: "❌" },
    { title: "Fitting Issue or Complaint", description: "What to do if you have a fitting issue or complaint with your outfit.", icon: "🛟" }
  ],
  routeLinks: [
    { id: "home", label: "Home", path: "/" },
    { id: "services", label: "Services", path: "/services" },
    { id: "designs", label: "Designs", path: "/gallery" },
    { id: "pricing", label: "Pricing", path: "/pricing" },
    { id: "book", label: "Book Order", path: "/book-order" },
    { id: "reviews", label: "Reviews", path: "/reviews" },
    { id: "support", label: "Support", path: "/support" },
    { id: "help", label: "Help Desk", path: "/help-desk" },
    { id: "contact", label: "Contact", path: "/contact" },
    { id: "admin", label: "Admin", path: "/admin" }
  ],
  supportCategories: [
    "Booking issue",
    "Pickup issue",
    "Delivery issue",
    "Fitting issue",
    "Measurement issue",
    "Pricing issue",
    "Payment issue",
    "Review issue",
    "Other"
  ],
  serviceAreas: {
    Delhi: [
      "110001", "110002", "110003", "110004", "110005",
      "110006", "110007", "110008", "110009", "110010"
    ],
    Noida: [
      "201301", "201303", "201304", "201305", "201306",
      "201307", "201308", "201309", "201310"
    ],
    Gorakhpur: [
      "273001", "273002", "273003", "273004", "273005",
      "273006", "273007", "273008", "273009", "273010"
    ]
  } as ServiceAreas,
  serviceCities: ["Delhi", "Noida", "Gorakhpur"],
  getWhatsAppUrl: function(message?: string) {
    const text = message || this.whatsappMessage;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`;
  },
  getPhoneHref: function() {
    return `tel:${this.internationalPhone}`;
  },
  getEmailHref: function() {
    return `mailto:${this.email}`;
  },
  isServiceAvailable: function(city: string, pincode: string) {
    const normalizedCity = city.trim().toLowerCase();
    const normalizedPincode = pincode.trim();
    const validCities = this.serviceCities.map(c => c.toLowerCase());
    
    if (!validCities.includes(normalizedCity)) {
      return false;
    }
    
    const cityKey = Object.keys(this.serviceAreas).find(
      key => key.toLowerCase() === normalizedCity
    );
    
    if (!cityKey) return false;
    
    return this.serviceAreas[cityKey].includes(normalizedPincode);
  },
  services: [
    {
      id: "blouse",
      name: "Designer Blouse & Petticoat",
      category: "Indian Traditional",
      description: "Stitching of gorgeous designer blouses (padded, backless, collar neck, halter neck, back-dori, heavy embroidery fitting) with matching satin petticoats. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 350,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "salwar-suit",
      name: "Salwar Suits & Anarkalis",
      category: "Suits & Kurtis",
      description: "Custom stitched Patiala suits, Anarkali gowns, straight suits, palazzo suits, and Punjabi suits tailored exactly to your measurements with canvas collars. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 650,
      image: "https://images.unsplash.com/photo-1608748010899-18f300247112?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "lehenga",
      name: "Wedding Lehenga & Ghagras",
      category: "Bridal & Party Wear",
      description: "Custom heavy bridal lehenga stitching with boutique lining, can-can mesh installation, customized waist hangings (latkans), and dupatta draping border attachment. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 2499,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "kurti",
      name: "Casual & Office Wear Kurtis",
      category: "Suits & Kurtis",
      description: "Daily wear, formal office wear, short and long kurtis stitched with trendy necklines, sleeve designs, and pockets. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 299,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "party-wear",
      name: "Custom Gowns & Party Outfits",
      category: "Bridal & Party Wear",
      description: "Premium floor-length western gowns, Indo-western crop tops with skirts, designer drape sarees, and elegant wedding guest party wear. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 1199,
      image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "alterations",
      name: "Boutique Alterations & Styling",
      category: "Services",
      description: "Breathe new life into your old clothes. We offer resizing, fit corrections, shoulder adjustments, border sewing, zipper repairs, and custom conversions. Available in Delhi, Noida and Gorakhpur.",
      startingPrice: 99,
      image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&auto=format&fit=crop&q=80"
    }
  ] as Service[],
  designs: [
    { id: 1, title: "Bridal Lehenga Design", category: "Bridal", description: "A premium bridal lehenga style for wedding day elegance.", rating: 5, review: "The fitting and finishing looked perfect for my wedding.", style: "Heavy wedding embroidery" },
    { id: 2, title: "Party Wear Blouse", category: "Blouse", description: "Stylish blouse design for parties and festive occasions.", rating: 4, review: "The blouse design looked modern and comfortable.", style: "Off-shoulder party neck" },
    { id: 3, title: "Simple Daily Wear Suit", category: "Suit", description: "Comfortable suit stitching for daily and office wear.", rating: 4, review: "Very neat stitching and perfect daily wear fitting.", style: "Minimal straight fit" },
    { id: 4, title: "Embroidery Blouse", category: "Blouse", description: "Elegant embroidered blouse style for sarees and functions.", rating: 5, review: "The embroidery work looked premium and graceful.", style: "Delicate threadwork" },
    { id: 5, title: "Designer Kurti", category: "Custom", description: "Modern kurti design for casual, office, and festive wear.", rating: 4, review: "The kurti fitting was comfortable and stylish.", style: "Contemporary panel cut" },
    { id: 6, title: "Wedding Guest Outfit", category: "Party Wear", description: "Elegant outfit design for wedding guests and family functions.", rating: 5, review: "I received many compliments at the wedding.", style: "Soft shimmer drape" },
    { id: 7, title: "Heavy Work Lehenga", category: "Lehenga", description: "Heavy lehenga style for grand celebrations and festive looks.", rating: 5, review: "The finishing and flare were very beautiful.", style: "Rich embellished flare" },
    { id: 8, title: "Silk Saree Blouse", category: "Blouse", description: "Classic silk saree blouse with clean fitting and finishing.", rating: 5, review: "Perfect fitting for my silk saree.", style: "Smooth silk finish" },
    { id: 9, title: "Festive Suit", category: "Suit", description: "Beautiful festive suit design for puja, festivals, and family events.", rating: 4, review: "The suit looked elegant and festive.", style: "Festive embroidery border" },
    { id: 10, title: "Custom Gown", category: "Custom", description: "Custom gown design for parties, receptions, and special occasions.", rating: 5, review: "The gown was exactly like the reference design.", style: "Tailored evening cut" },
    { id: 11, title: "Haldi Outfit", category: "Party Wear", description: "Bright and comfortable outfit style for haldi functions.", rating: 4, review: "The outfit was comfortable and looked beautiful in photos.", style: "Sunny yellow cotton blend" },
    { id: 12, title: "Mehendi Outfit", category: "Party Wear", description: "Stylish mehendi outfit with boutique-style finishing.", rating: 5, review: "Loved the color, fit, and design.", style: "Cool pastel print" },
    { id: 13, title: "Reception Wear", category: "Bridal", description: "Elegant reception outfit style for a premium evening look.", rating: 5, review: "The final outfit looked classy and premium.", style: "Silk layered gown" },
    { id: 14, title: "Traditional Salwar Suit", category: "Suit", description: "Traditional salwar suit style with comfortable stitching.", rating: 4, review: "Simple, elegant, and very comfortable.", style: "Classic salwar fit" },
    { id: 15, title: "Premium Bridal Blouse", category: "Blouse", description: "Premium bridal blouse style with detailed fitting and finishing.", rating: 5, review: "The bridal blouse fitting was excellent.", style: "Heavy heritage embroidery" }
  ] as GalleryItem[],
  pricing: [
    { name: "Blouse Stitching", price: "___", description: "Simple and regular blouse stitching with clean fitting.", icon: "fas fa-cut", featured: false },
    { name: "Designer Blouse", price: "___", description: "Designer blouse stitching with custom neck, sleeve, back, lining, and pattern options.", icon: "fas fa-gem", featured: false },
    { name: "Petticoat Stitching", price: "___", description: "Comfortable petticoat stitching with proper waist and length fitting.", icon: "fas fa-swatchbook", featured: false },
    { name: "Lehenga Stitching", price: "___", description: "Custom lehenga stitching for festive, bridal, and wedding occasions.", icon: "fas fa-crown", featured: false },
    { name: "Simple Suit", price: "___", description: "Regular suit stitching for daily wear, office wear, and simple occasions.", icon: "fas fa-tshirt", featured: false },
    { name: "Designer Suit", price: "___", description: "Premium suit stitching with custom design, lining, finishing, and style details.", icon: "fas fa-star", featured: true },
    { name: "Salwar Suit", price: "___", description: "Traditional and modern salwar suit stitching with comfortable fitting.", icon: "fas fa-female", featured: false },
    { name: "Kurti Stitching", price: "___", description: "Simple and designer kurti stitching for casual, office, and festive wear.", icon: "fas fa-feather-alt", featured: false },
    { name: "Gown Stitching", price: "___", description: "Custom gown stitching for parties, receptions, and special occasions.", icon: "fas fa-trophy", featured: false },
    { name: "Bridal Wear", price: "___", description: "Premium bridal stitching with detailed fitting, finishing, and customization.", icon: "fas fa-heart", featured: false },
    { name: "Wedding Wear", price: "___", description: "Wedding outfit stitching for mehendi, haldi, engagement, reception, and family functions.", icon: "fas fa-ring", featured: false },
    { name: "Party Wear", price: "___", description: "Stylish outfit stitching for parties, celebrations, and festive events.", icon: "fas fa-glass-cheers", featured: false },
    { name: "Alteration", price: "___", description: "Fitting correction, resizing, length adjustment, and garment repair.", icon: "fas fa-exchange-alt", featured: false },
    { name: "Fall/Pico", price: "___", description: "Saree fall and pico service with neat finishing.", icon: "fas fa-scarf", featured: false },
    { name: "Measurement Visit", price: "___", description: "Fresh measurement support for accurate fitting.", icon: "fas fa-map-marker-alt", featured: false },
    { name: "Pickup & Delivery", price: "___", description: "Cloth pickup and delivery service in Delhi, Noida and Gorakhpur.", icon: "fas fa-shipping-fast", featured: false }
  ] as PricingItem[],
  pageMetadata: {
    home: {
      title: "Stitchly | Custom Tailoring Across India",
      description: "Book custom tailoring services online with Stitchly. Schedule cloth pickup, provide measurements, and get professionally stitched outfits delivered to your doorstep in Delhi, Noida and Gorakhpur.",
      ogTitle: "Stitchly | Custom Tailoring Across India",
      ogDescription: "Book custom tailoring services online with Stitchly. Schedule cloth pickup, provide measurements, and get professionally stitched outfits delivered to your doorstep."
    },
    services: {
      title: "Tailoring Services in Delhi, Noida & Gorakhpur | Blouse, Suit, Lehenga, Bridal",
      description: "Explore our women's boutique tailoring services in Delhi, Noida and Gorakhpur: blouse stitching, suits, lehengas, bridal outfits, and alterations.",
      ogTitle: "Tailoring Services for Women in Delhi, Noida & Gorakhpur",
      ogDescription: "Custom stitching and alteration services for women in Delhi, Noida and Gorakhpur."
    },
    designs: {
      title: "Design Gallery | Boutique Tailoring Inspiration",
      description: "View our curated design gallery for bridal, party wear, traditional, and modern women’s tailoring.",
      ogTitle: "Boutique Tailoring Design Gallery",
      ogDescription: "Inspiration for custom blouse, lehenga, suit, and bridal designs."
    },
    pricing: {
      title: "Pricing | Transparent Tailoring Rates",
      description: "Discover transparent starting prices for blouse stitching, lehengas, suits, bridal wear, and alterations.",
      ogTitle: "Tailoring Prices",
      ogDescription: "Affordable and transparent boutique tailoring pricing for women."
    },
    book: {
      title: "Book Order | Tailoring Pickup & Delivery",
      description: "Book your custom tailoring order now for doorstep pickup, precise fitting, and timely delivery.",
      ogTitle: "Book Your Tailoring Order",
      ogDescription: "Schedule a pickup for your custom stitching order today."
    },
    reviews: {
      title: "Customer Reviews | Women’s Tailoring Feedback",
      description: "Read real customer reviews for our women’s boutique tailoring services.",
      ogTitle: "Customer Testimonials for Boutique Tailoring",
      ogDescription: "Hear from women who loved their custom stitching experience."
    },
    support: {
      title: "Support | Tailoring Help Desk",
      description: "Get help with your stitching order, delivery, fitting, or quality concerns from our support desk.",
      ogTitle: "Tailoring Support",
      ogDescription: "Customer support for order, fitting, and delivery assistance."
    },
    help: {
      title: "FAQ | Stitchly Tailoring Questions",
      description: "Find answers to common questions about measurements, pickup, delivery, and alteration services.",
      ogTitle: "Tailoring FAQs & Help",
      ogDescription: "Helpful answers for custom tailoring and delivery."
    },
    contact: {
      title: "Contact | Stitchly Tailoring",
      description: "Contact Stitchly for custom stitching orders, price quotes, measurement pickup, and delivery support.",
      ogTitle: "Contact Your Tailoring Boutique",
      ogDescription: "Reach us for stitching orders, custom tailoring inquiries, and support."
    },
    default: {
      title: "Stitchly | Custom Tailoring Across India",
      description: "Custom tailoring services for women, including bespoke blouses, suits, lehengas, bridal wear, and alterations.",
      ogTitle: "Stitchly Tailoring",
      ogDescription: "Women’s boutique tailoring with personalised service."
    }
  } as { [key: string]: PageMetadata },
  defaultTestimonials: [
    { name: "Priya Sharma", locality: "Rohini, Delhi", service: "Blouse Stitching", rating: 5, comment: "The blouse fitting was very comfortable and the finishing looked premium." },
    { name: "Neha Verma", locality: "Sector 62, Noida", service: "Suit Stitching", rating: 5, comment: "My suit was stitched beautifully and delivered with proper fitting." },
    { name: "Anjali Gupta", locality: "Golghar, Gorakhpur", service: "Lehenga Stitching", rating: 5, comment: "The lehenga flare and fitting were perfect for my family function." },
    { name: "Ritu Singh", locality: "Dwarka, Delhi", service: "Designer Blouse", rating: 5, comment: "The design looked stylish and matched my saree perfectly." },
    { name: "Pooja Mishra", locality: "Sector 18, Noida", service: "Bridal Wear", rating: 5, comment: "The bridal outfit fitting was handled carefully and looked elegant." },
    { name: "Shreya Tiwari", locality: "Taramandal, Gorakhpur", service: "Kurti Stitching", rating: 4.5, comment: "The kurti was simple, neat, and very comfortable for daily wear." },
    { name: "Kavita Yadav", locality: "Laxmi Nagar, Delhi", service: "Alteration", rating: 5, comment: "My old suit was altered perfectly and now fits like new." },
    { name: "Sakshi Srivastava", locality: "Sector 15, Noida", service: "Party Wear", rating: 5, comment: "The party outfit looked beautiful and the stitching was very clean." },
    { name: "Nisha Pandey", locality: "Civil Lines, Gorakhpur", service: "Salwar Suit", rating: 4.5, comment: "Very comfortable fitting and neat finishing. I liked the service." },
    { name: "Meera Rai", locality: "Janakpuri, Delhi", service: "Petticoat Stitching", rating: 5, comment: "The petticoat fitting and length were perfect." },
    { name: "Swati Agarwal", locality: "Sector 50, Noida", service: "Wedding Wear", rating: 5, comment: "My wedding function outfit looked graceful and fit very well." },
    { name: "Komal Singh", locality: "Rustampur, Gorakhpur", service: "Custom Designer Outfit", rating: 5, comment: "They stitched the outfit close to my reference design. Very happy with the result." },
    { name: "Divya Tripathi", locality: "Karol Bagh, Delhi", service: "Blouse Stitching", rating: 4.5, comment: "Good fitting, clean finishing, and very professional service." },
    { name: "Rachna Dubey", locality: "Betiahata, Gorakhpur", service: "Lehenga Stitching", rating: 5, comment: "The lehenga looked beautiful and the stitching quality was excellent." },
    { name: "Aarti Jaiswal", locality: "Sector 22, Noida", service: "Suit Stitching", rating: 5, comment: "The suit fitting was perfect and the design looked elegant." }
  ] as Testimonial[],
  faqs: [
    { question: "How does Stitchly tailoring work?", answer: "It is simple! 1. You book a measurement pickup online or call us. 2. Our tailors/riders visit your house to collect your fabric and a reference fitting dress. 3. We stitch your garment according to your design instructions at our boutique. 4. We deliver the stitched dress back to your doorstep within 5-7 days. Payment is made on delivery." },
    { question: "Do you provide fabric / cloth materials?", answer: "No, we do not sell cloth. We are a pure custom stitching tailoring service. You need to purchase and provide the fabric/material. If your garment requires matching lining (aster) or piping, we can provide standard quality ones at nominal extra charges, or you can supply them." },
    { question: "What is pickup availability in Delhi, Noida and Gorakhpur?", answer: "Yes! We offer Free Pickup & Delivery on your first order. For subsequent orders, delivery is free for orders above ₹700, otherwise a nominal delivery charge of ₹40 applies." },
    { question: "What is the standard turnaround time for delivery?", answer: "Our standard delivery time is 5 to 7 days from the day we pickup your fabric. We also offer Express Delivery (within 48 hours) at an additional 50% express fee, subject to slot availability." },
    { question: "What if the stitched dress does not fit perfectly?", answer: "We strive for a first-time perfect fit by taking meticulous measurements. However, if there are any fitting issues, we provide Free Alteration services. Simply request an alteration pickup through our Help Desk within 3 days of delivery and we will fix it." },
    { question: "Which cities do you currently serve?", answer: "Currently Stitchly serves Delhi, Noida and Gorakhpur only. More cities coming soon!" }
  ] as FAQ[]
}
