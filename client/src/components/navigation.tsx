import { Route, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-card/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Route className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">RulerRide</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors font-medium"
              data-testid="nav-home"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              data-testid="nav-about"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              data-testid="nav-services"
            >
              Services
            </button>
            <Button 
              onClick={() => scrollToSection('book')}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="nav-book-ride"
            >
              Book Ride
            </Button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
              data-testid="nav-contact"
            >
              Contact
            </button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="mobile-nav-home"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="mobile-nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="mobile-nav-services"
              >
                Services
              </button>
              <Button 
                onClick={() => scrollToSection('book')}
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                data-testid="mobile-nav-book-ride"
              >
                Book Ride
              </Button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-left"
                data-testid="mobile-nav-contact"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
