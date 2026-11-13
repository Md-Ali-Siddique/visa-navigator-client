import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="bg-secondary text-secondary-content mt-16 border-t-4 border-accent">
    <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-3">
      <div>
        <h2 className="text-2xl font-extrabold">Visa Navigator</h2>
        <p className="mt-3 opacity-80 max-w-xs">
          Check visa requirements, apply online and follow every application
          from one dashboard.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Explore</h3>
        <ul className="space-y-2 opacity-80">
          <li><Link to="/all-visas" className="hover:underline">Browse all visas</Link></li>
          <li><Link to="/add-visa" className="hover:underline">Add a visa</Link></li>
          <li><Link to="/my-visa-applications" className="hover:underline">Track my applications</Link></li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Contact</h3>
        <address className="not-italic space-y-1 opacity-80">
          <p>support@visanavigator.com</p>
          <p>+880 1700 000000</p>
          <p>GEC Circle, Chattogram, Bangladesh</p>
        </address>
        <div className="flex gap-3 mt-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-white/15 py-4 text-center text-sm opacity-70">
      © {new Date().getFullYear()} Visa Navigator. All rights reserved.
    </div>
  </footer>
);

export default Footer;
