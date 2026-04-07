import { Camera, MapPin, Truck, Sprout } from "lucide-react";

const steps = [
  { icon: Camera, title: "Spot & Snap", desc: "See puja waste on the road? Take a quick photo" },
  { icon: MapPin, title: "Share Location", desc: "Tell us the exact spot or area" },
  { icon: Truck, title: "We Collect", desc: "Our team goes to the location and picks it up" },
  { icon: Sprout, title: "We Compost", desc: "Waste becomes eco-friendly compost" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 md:py-24 section-alt">
    <div className="container text-center space-y-12">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground">How It Works</h2>
        <p className="text-muted-foreground mt-2">4 simple steps to a greener future</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="bg-card rounded-xl p-6 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="mx-auto w-14 h-14 rounded-full bg-leaf-light flex items-center justify-center">
              <s.icon className="h-7 w-7 text-primary" />
            </div>
            <span className="inline-block text-xs font-semibold text-secondary px-2 py-0.5 rounded-full bg-saffron-light">
              Step {i + 1}
            </span>
            <h3 className="font-semibold text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
