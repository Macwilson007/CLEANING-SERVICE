export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">CLEANING SERVICE</h3>
          <p className="text-sm">
            Professional cleaning services with over 30 years of industry expertise. Your trusted partner in cleanliness, hygiene, and pest control.
          </p>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/book" className="hover:text-white transition-colors">Book a Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>Lagos, Nigeria</li>
            <li>Abuja, Nigeria</li>
            <li>Email: info@cleaningservice.com</li>
            <li>Phone: +234 123 456 7890</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm text-center">
        &copy; {new Date().getFullYear()} Cleaning Service. All rights reserved.
      </div>
    </footer>
  );
}
