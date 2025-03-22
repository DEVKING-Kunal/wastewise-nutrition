
import React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-nutrinet-50/80 to-nutrinet-100/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} NutriNet. All rights reserved.
          </div>
          
          <div className="flex items-center text-sm font-medium">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" fill="currentColor" /> by{" "}
            <span className="text-nutrinet-600 font-semibold ml-1">Kunal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-nutrinet-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-nutrinet-600 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
