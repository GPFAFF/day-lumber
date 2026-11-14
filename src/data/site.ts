// Business details and shared lists used by the layout and components.
// Edit here once; every page that shows them picks up the change.

export const business = {
  name: 'Day Lumber',
  legalName: 'KG Pallet, LLC',
  phone: '413-536-3511',
  phoneHref: 'tel:+14135363511',
  email: 'sales@daylumber.com',
  street: '70 Orange Street',
  city: 'Chicopee',
  region: 'MA',
  postalCode: '01013',
  hours: 'Monday to Friday, 6:00 AM to 4:30 PM',
  tagline: 'Day Lumber’s pallets and skids create custom wood packaging solutions with decades of industry experience.',
  logo: '/assets/img/2025/07/image-removebg-preview.png',
  logoLight: '/assets/img/2025/07/logo-1-1.png',
  favicon: '/assets/img/2026/03/dddd.png',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.2185012861323!2d-72.6017458!3d42.1883954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e71e5d70a8353d%3A0x8a5f68b17e50f274!2sDay%20Lumber%20Company!5e0!3m2!1sen!2sin!4v1773087810218!5m2!1sen!2sin',
  gaId: 'G-PSNKV30X9Z',
};

/** Main navigation (header and mobile menu). The smoke test expects exactly these labels in this order. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Team', href: '/team/' },
  { label: 'Services', href: '/services/' },
  { label: 'Quote', href: '/quote/' },
  { label: 'Contact', href: '/contact-us/' },
];

export const footerLinks = [
  { label: 'About Us', href: '/about-us/' },
  { label: 'Our Services', href: '/services/' },
  { label: 'Team', href: '/team/' },
  { label: 'Quote', href: '/quote/' },
  { label: 'FAQs', href: '/faqs/' },
  { label: 'Contact Us', href: '/contact-us/' },
];

export const footerServices = ['Pallet Heat Treatment Kiln', 'Nelma Certified', 'Automated Pallet Maker'];

/** Photos for the footer gallery and the "Moments With Daylumber" gallery. */
export const photos = {
  truck: { src: '/assets/img/2026/03/day-truck.jpg', alt: 'Day Lumber flatbed truck loaded with pallets' },
  history: { src: '/assets/img/2026/03/day-lumber-history.jpg', alt: 'Wood pallets in front of the Day Lumber Corporation sign' },
  family: { src: '/assets/img/2026/03/family.jpg', alt: 'Day Lumber team in front of stacked pallets' },
  pallets: { src: '/assets/img/2026/03/day-lumber-pallets.jpg', alt: 'Tall stacks of new wood pallets' },
  crates: { src: '/assets/img/2026/03/day-lumber-crates.jpg', alt: 'Wooden crate frames being built in the shop' },
  viking: { src: '/assets/img/2026/03/viking.jpg', alt: 'Viking Express automated pallet machine' },
  technology: { src: '/assets/img/2026/03/technology.jpg', alt: 'Day Lumber employee in front of an American flag' },
};

export const footerGallery = [photos.truck, photos.history, photos.family, photos.pallets, photos.crates, photos.viking];

/** Gallery grid: one wide photo, four small, one wide (the theme's gallery-layout1). */
export const gallery = [photos.truck, photos.pallets, photos.technology, photos.crates, photos.history, photos.viking];

export const stats = [
  { value: 95, suffix: '+', label: 'Experience' },
  { value: 1929, suffix: '', label: 'Established' },
  { value: 500, suffix: '+', label: 'Packaging Solutions' },
];

export const serviceCards = [
  { title: 'Automated Pallet Maker', text: 'Day Lumber’s automated pallet machine can produce up to 2,500 pallets per day with consistent quality.' },
  { title: 'Hand-Side Specialty Pallets', text: 'We offer hand-side production for specialty pallets designed to meet unique shipping requirements.' },
  { title: 'Inventory Management', text: 'We provide inventory management and stocking programs to support your business operations.' },
  { title: 'International Export Services', text: 'We provide export documentation and ensure packaging meets global shipping requirements.' },
  { title: 'Heat Treatment Certification', text: 'We heat treat pallets, skids, and wooden boxes to meet international export standards.' },
  { title: 'Custom Packaging Design', text: 'We design and manufacture custom pallets, crates, and wood packaging solutions.' },
];

/** FAQs shown next to the quote form (answers are HTML). */
export const generalFaqs = [
  {
    question: 'What sizes of pallets and skids do you make?',
    answer:
      'Any size. We build fully customized pallets and skids as well as industry standard sizes, including block pallets, stringer pallets, and tops and covers. Options include hardwood, band notch and four-way notch, stenciling, color coding, chamfer, and screw or ring nails.',
  },
  {
    question: 'Do you make heat treated pallets for export (ISPM 15)?',
    answer:
      'Yes. We have had a heat treatment kiln on site since May 2008 and can heat treat any size pallet, skid or wooden box for overseas shipment. Our pallets are certified for IPPC for international exports, and we provide the documentation so your goods ship export certified.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We are located at 70 Orange Street in Chicopee, MA, in the center of New England, and serve customers throughout Massachusetts, Connecticut, Rhode Island and everywhere in between. We run our own trucking fleet for on-time delivery.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'Use the quote form on this page, call <a href="tel:+14135363511">413-536-3511</a>, or email <a href="mailto:sales@daylumber.com">sales@daylumber.com</a>. Our office is open Monday to Friday, 6:00 AM to 4:30 PM.',
  },
];

/** LocalBusiness JSON-LD (homepage and contact page). */
export const localBusinessSchema = {
  '@type': 'LocalBusiness',
  '@id': 'https://daylumber.com/#business',
  name: business.name,
  legalName: business.legalName,
  url: 'https://daylumber.com/',
  description: 'Custom wood pallets, skids, crates and heat treated ISPM 15 export packaging manufactured in Chicopee, Massachusetts.',
  logo: `https://daylumber.com${business.logoLight}`,
  image: 'https://daylumber.com/assets/img/2026/03/family.jpg',
  telephone: '+1-413-536-3511',
  email: business.email,
  foundingDate: '1929',
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.city,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 42.1883954, longitude: -72.6017458 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '06:00', closes: '16:30' },
  ],
  areaServed: ['Massachusetts', 'Connecticut', 'Rhode Island'].map((name) => ({ '@type': 'State', name })),
  hasMap: 'https://www.google.com/maps?cid=9970803211559301748',
};

export const team = [
  {
    name: 'Matt Grodd',
    role: 'President',
    photo: '/assets/img/2026/04/IMG_1117-scaled.jpeg',
    email: 'matt@daylumber.com',
    phone: '413-244-6093',
  },
  {
    name: 'Todd Young',
    role: 'General Manager',
    photo: '/assets/img/2026/04/IMG_1119-scaled.jpeg',
    email: 'todd@daylumber.com',
    phone: '413-563-9107',
  },
];
