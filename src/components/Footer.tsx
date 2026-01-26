import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Logo className="[&_*]:text-background [&_.text-primary]:text-background [&_.text-muted-foreground]:text-background/60" />
            <p className="text-background/70 text-sm">
              Your trusted partner for authentic Sri Lankan experiences. 
              Luxury travel, personalized itineraries, and unforgettable memories.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Tour Packages</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Our Vehicles</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Meet the Team</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Travel Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Booking Policy</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Cancellation</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Privacy Policy</a></li>
              <li>
                <Link to="/admin/login" className="hover:text-background transition-colors inline-flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span>123 Galle Road, Colombo 03, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+94771234567" className="hover:text-background transition-colors">
                  +94 77 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:hello@aotravels.lk" className="hover:text-background transition-colors">
                  hello@aotravels.lk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} AO Travels. All rights reserved. | Sri Lanka Tourism Development Authority Licensed</p>
        </div>
      </div>
    </footer>
  );
}
