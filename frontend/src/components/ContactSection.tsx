import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapComponent from "@/components/MapComponent";

const OFFICE_ADDRESS = "5km Ahead, Farukh Nagar (Kherakhurrampur), Gurgaon, Haryana 122506";
const MAP_QUERY_ADDRESS = "Kherakhurrampur, Farrukhnagar, Gurugram, Haryana 122506, India";

const ContactSection = () => (
  <section id="contact" className="py-16 md:py-24 section-alt">
    <div className="container max-w-2xl text-center space-y-8">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground">Get in Touch</h2>
      <p className="text-muted-foreground">Have questions? Reach out to us anytime!</p>

      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Phone, label: "+91 98773 63729", href: "tel:+919877363729" },
          { icon: Mail, label: "swacchpooja1@gmail.com", href: "mailto:swacchpooja1@gmail.com" },
          { icon: MapPin, label: OFFICE_ADDRESS, href: "#" },
        ].map((c, i) => (
          <a key={i} href={c.href} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <c.icon className="h-5 w-5 text-primary shrink-0" />
            <span className="text-sm text-foreground">{c.label}</span>
          </a>
        ))}
        <a
          href="https://wa.me/919877363729?text=Hi%2C%20I%20want%20to%20report%20puja%20waste%20on%20the%20road"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-primary rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <MessageCircle className="h-5 w-5 text-primary-foreground shrink-0" />
          <span className="text-sm text-primary-foreground font-medium">Chat on WhatsApp</span>
        </a>
      </div>

      {/* Google Maps */}
      <MapComponent 
        latitude={28.4506}
        longitude={76.8306}
        address={MAP_QUERY_ADDRESS}
        title={`SwachhPooja - ${OFFICE_ADDRESS}`}
        height="300px"
        zoom={16}
      />
    </div>
  </section>
);

export default ContactSection;
