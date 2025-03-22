
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator, BarChart2, User, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const NavLink = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  isActive: boolean;
}) => (
  <Link 
    to={to} 
    className={cn(
      "flex items-center px-4 py-2 rounded-md transition-colors",
      isActive 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-foreground/70 hover:text-foreground hover:bg-accent"
    )}
  >
    <Icon className="w-5 h-5 mr-3" />
    {label}
  </Link>
);

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Determine if a link is active
  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">NutriNet</span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/" icon={Home} label="Home" isActive={isLinkActive('/')} />
            <NavLink to="/calculator" icon={Calculator} label="Calculator" isActive={isLinkActive('/calculator')} />
            <NavLink to="/waste-tracker" icon={BarChart2} label="Waste Tracker" isActive={isLinkActive('/waste-tracker')} />
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {currentUser ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => logout()}
                  className="hidden md:flex"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button size="sm" className="hidden md:flex">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-foreground md:hidden"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <NavLink to="/" icon={Home} label="Home" isActive={isLinkActive('/')} />
            <NavLink to="/calculator" icon={Calculator} label="Calculator" isActive={isLinkActive('/calculator')} />
            <NavLink to="/waste-tracker" icon={BarChart2} label="Waste Tracker" isActive={isLinkActive('/waste-tracker')} />
            <NavLink to="/profile" icon={User} label="Profile" isActive={isLinkActive('/profile')} />
            
            {currentUser ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="w-full justify-start font-normal text-foreground/70 hover:text-foreground hover:bg-accent"
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="block">
                <Button 
                  size="sm" 
                  className="w-full mt-2"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
