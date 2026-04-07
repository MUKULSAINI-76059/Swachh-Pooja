import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 section-alt">
    <div className="container max-w-2xl text-center space-y-8">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
      <p className="text-muted-foreground">Have questions? Reach out to us anytime!</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Phone, label: "+91 98773 63729", href: "tel:+919877363729" },
          { icon: Mail, label: "adityakumar@gmail.com", href: "mailto:adityakumar@gmail.com" },
          { icon: MapPin, label: "Delhi NCR, India", href: "#" },
        ].map((c, i) => (
          <a key={i} href={c.href} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <c.icon className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm text-foreground">{c.label}</span>
          </a>
        ))}
        <a
          href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20report%20puja%20waste%20on%20the%20road"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-primary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <MessageCircle className="h-5 w-5 text-primary-foreground shrink-0" />
          <span className="text-sm text-primary-foreground font-medium">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Future: Google Maps placeholder */}
      <div className="rounded-xl border bg-muted h-48 flex items-center justify-center text-muted-foreground text-sm">
        📍 Google Maps integration — coming soon
      </div>
    </div>
  </section>
);

export default ContactSection;
