import { Recycle, TreePine, ThumbsUp } from "lucide-react";

const benefits = [
  { icon: Recycle, title: "Eco-Friendly Disposal", desc: "No more roadside dumping. Reported puja waste gets a second life as compost." },
  { icon: TreePine, title: "Supports Nature", desc: "The compost nurtures plants and trees — from waste to greenery." },
  { icon: ThumbsUp, title: "Easy & Hassle-Free", desc: "Just spot, snap, and report. We handle the cleanup." },
];

const BenefitsSection = () => (
  <section id="benefits" className="py-16 md:py-24">
    <div className="container text-center space-y-12">
      <div>
        <h2 className="text-2xl md:text-4xl font-bold text-foreground">Why Choose Us?</h2>
        <p className="text-muted-foreground mt-2">Simple reasons to feel good about your choice</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-8">
        {benefits.map((b, i) => (
          <div key={i} className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-saffron-light flex items-center justify-center">
              <b.icon className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{b.title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
