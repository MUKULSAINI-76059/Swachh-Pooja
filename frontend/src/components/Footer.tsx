import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="relative overflow-hidden bg-foreground text-primary-foreground">
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-emerald-400/10" />
    <div className="container relative py-12 md:py-14">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:items-start">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 text-sm font-semibold">
            <Leaf className="h-4 w-4" /> SwachhPooja
          </div>
          <p className="max-w-md text-sm leading-6 text-primary-foreground/75">
            Turning puja waste into clean, community-driven action with respectful pickup and responsible composting.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">
            Quick Links
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-primary-foreground/75">
            <a href="#home" className="transition-colors hover:text-primary-foreground">Home</a>
            <a href="#how-it-works" className="transition-colors hover:text-primary-foreground">How It Works</a>
            <a href="#about" className="transition-colors hover:text-primary-foreground">About</a>
            <a href="#benefits" className="transition-colors hover:text-primary-foreground">Benefits</a>
            <a href="#contact" className="transition-colors hover:text-primary-foreground">Contact</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/90">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/75">
            <p>+91 98773 63729</p>
            <p>swacchpooja1@gmail.com</p>
            <p>Farukh Nagar, Gurgaon, Haryana</p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-primary-foreground/15 pt-6 flex flex-col gap-3 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <p className="text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} SwachhPooja. Made with 🌿 for a greener future.
        </p>
        <p className="text-xs text-primary-foreground/45">
          Clean devotion, responsible care, and community action.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
