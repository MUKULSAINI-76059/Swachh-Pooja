import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground py-10">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Leaf className="h-5 w-5" /> SwachhPooja
        </div>
        <div className="flex flex-wrap gap-4 text-sm opacity-80">
          <a href="#home" className="hover:opacity-100 transition-opacity">Home</a>
          <a href="#how-it-works" className="hover:opacity-100 transition-opacity">How It Works</a>
          <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#benefits" className="hover:opacity-100 transition-opacity">Benefits</a>
          <a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-60">
        © {new Date().getFullYear()} SwachhPooja. Made with 🌿 for a greener future.
      </div>
    </div>
  </footer>
);

export default Footer;
