import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onStartBooking: () => void;
}

export function Header({ onStartBooking }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Tours', href: '/tours' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Register', href: '/register' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link to="/">
            <Logo className="text-primary-foreground [&_*]:text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/70" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/90 hover:text-primary-foreground font-medium transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
            <Button variant="hero" onClick={() => navigate('/')}>
              Plan Your Trip
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/20 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-primary-foreground/90 hover:text-primary-foreground font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-primary-foreground/90 hover:text-primary-foreground font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <Button variant="hero" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>
                Plan Your Trip
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
