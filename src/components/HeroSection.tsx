import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-illustration.jpg";

const HeroSection = () => (
  <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient">
    <div className="container grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6 animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-foreground">
          Spot Puja Waste on Roads? Report It, We'll Clean It!{" "}
          <span className="inline-block">🌱</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-lg">
          See puja materials — flowers, coconuts, cloth — dumped on roadsides or public areas? Just snap a photo and report it. Our team will collect and compost it. Clean streets, green dharti! 🙏
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <a href="#request">Request Pickup</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#how-it-works">How It Works</a>
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <img src={heroImg} alt="Puja materials composting into nature" width={1280} height={720} className="rounded-2xl shadow-lg max-w-full h-auto" />
      </div>
    </div>
  </section>
);

export default HeroSection;
