import { Heart, Droplets, TreePine } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-16 md:py-24 section-alt">
    <div className="container max-w-3xl text-center space-y-8">
      <h2 className="text-2xl md:text-4xl font-bold text-foreground">About Us</h2>
      <p className="text-muted-foreground text-lg leading-relaxed">
        Every year, tons of puja materials are dumped on roadsides, near rivers, and in public spaces — polluting our environment. At <strong className="text-primary">SwachhPooja</strong>, we empower citizens to report roadside puja waste so our team can collect and compost it responsibly.
      </p>
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { icon: Droplets, text: "Reduce water pollution from nirmalya waste" },
          { icon: TreePine, text: "Convert waste into organic compost" },
          { icon: Heart, text: "Promote eco-friendly religious practices" },
        ].map((item, i) => (
          <div key={i} className="bg-card rounded-xl p-5 shadow-sm space-y-3">
            <item.icon className="h-8 w-8 text-secondary mx-auto" />
            <p className="text-sm text-foreground font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
