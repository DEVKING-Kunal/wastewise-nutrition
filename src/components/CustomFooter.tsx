
import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const CustomFooter: React.FC = () => {
  return (
    <footer className="bg-secondary/50 dark:bg-secondary/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Made with <span className="footer-love">♥</span> by <span className="font-medium">Kunal</span>
            </span>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="https://github.com/kunaltyagi9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://twitter.com/kunaltyagi9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter size={18} />
              <span className="sr-only">Twitter</span>
            </a>
            <a 
              href="https://linkedin.com/in/kunaltyagi9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
