import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2" aria-label="TRASHFORMERS home">
          <Leaf className="text-primary" />
          <span className="font-semibold tracking-wide">TRASHFORMERS</span>
        </a>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
          <a href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="/#vision" className="text-muted-foreground hover:text-foreground transition-colors">Our Vision</a>
          <a href="/#join" className="text-muted-foreground hover:text-foreground transition-colors">Join Us</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/#join">
            <Button variant="hero" size="sm" aria-label="Join our next events">Join Now</Button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
