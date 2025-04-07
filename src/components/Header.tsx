
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/data';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Queue Status', path: '/status' },
    { name: 'Services', path: '/services' },
    ...(currentUser.isAdmin ? [{ name: 'Admin', path: '/admin' }] : [])
  ];
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-queue-primary text-lg font-bold">Queue-It-Smart</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-queue-primary",
                  location.pathname === item.path 
                    ? "text-queue-primary" 
                    : "text-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* User info */}
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className="text-sm">
              {currentUser.name}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-base font-medium transition-colors hover:text-queue-primary px-3 py-2 rounded-md",
                  location.pathname === item.path 
                    ? "text-queue-primary bg-blue-50" 
                    : "text-gray-700"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <Button variant="ghost" size="sm" className="w-full justify-start text-left">
                {currentUser.name}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
