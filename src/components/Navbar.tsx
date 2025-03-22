
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Calculator, LineChart, User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const NavItem = ({ icon: Icon, label, to, active }: { 
  icon: React.ElementType; 
  label: string; 
  to: string;
  active: boolean;
}) => {
  return (
    <Link to={to} aria-label={label} className="relative">
      <div className={cn(
        "flex flex-col items-center justify-center p-3 transition-colors relative",
        active ? "text-primary" : "text-muted-foreground hover:text-primary/80"
      )}>
        <Icon className="w-6 h-6" />
        <span className="text-xs font-medium mt-1">{label}</span>
        {active && (
          <motion.div 
            layoutId="activeTab"
            className="absolute bottom-0 w-12 h-0.5 bg-primary rounded-full" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </Link>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', to: '/' },
    { icon: Calculator, label: 'Nutrition', to: '/calculator' },
    { icon: LineChart, label: 'Waste', to: '/waste-tracker' },
    { icon: User, label: 'Profile', to: '/profile' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-gradient-to-r from-nutrinet-400 to-nutrinet-600 p-1.5">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-nutrinet-600 to-nutrinet-800 bg-clip-text text-transparent">
              NutriNet
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          {/* Auth Button (Desktop) */}
          <div className="hidden md:block">
            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 py-1.5 px-3 rounded-full hover:bg-muted transition-colors">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.photoURL || undefined} />
                      <AvatarFallback>{currentUser.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">
                      {currentUser.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => navigate('/login')} 
                className="bg-gradient-to-r from-nutrinet-500 to-nutrinet-600 hover:from-nutrinet-600 hover:to-nutrinet-700 text-white shadow-md"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-muted-foreground hover:text-primary md:hidden"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-t border-b border-border"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.to} 
                to={item.to}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg transition-colors",
                  location.pathname === item.to 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
            
            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-muted"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Log Out
              </button>
            ) : (
              <Link 
                to="/login"
                className="flex items-center px-4 py-3 rounded-lg transition-colors text-foreground hover:bg-muted"
              >
                <LogIn className="w-5 h-5 mr-3" />
                Sign In
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-[0_-1px_3px_rgba(0,0,0,0.1)] border-t z-40">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
