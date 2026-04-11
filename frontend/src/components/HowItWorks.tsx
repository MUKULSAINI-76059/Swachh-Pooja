import { Camera, MapPin, Truck, Sprout } from "lucide-react";

const steps = [
  { icon: Camera, title: "Spot & Snap", desc: "See puja waste on the road? Take a quick photo to verify." },
  { icon: MapPin, title: "Share Location", desc: "Tell us the exact spot so our team can easily reach it." },
  { icon: Truck, title: "We Collect", desc: "Our dedicated pickup team goes to the location and collects it." },
  { icon: Sprout, title: "We Compost", desc: "Collected waste is fully transformed into eco-friendly compost." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 md:py-20 section-alt bg-white border-y border-slate-100">
    <div className="container space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-semibold text-orange-700">
          Process
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">How It Works</h2>
        <p className="text-lg text-muted-foreground">4 incredibly simple steps to a greener, cleaner environment.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {/* Connection line inside grid */}
        <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-green-100 via-emerald-200 to-green-100 -z-10"></div>
        
        {steps.map((s, i) => (
          <div key={i} className="group flex flex-col items-center text-center space-y-5 bg-white sm:bg-transparent rounded-3xl p-6 sm:p-0 shadow-sm sm:shadow-none border sm:border-0 border-slate-100 hover:shadow-xl sm:hover:shadow-none transition-all duration-300 hover:-translate-y-1 sm:hover:translate-y-0 relative z-10">
            
            {/* Step Icon Bubble */}
            <div className="relative w-24 h-24 rounded-full bg-white shadow-lg border border-slate-50 flex items-center justify-center group-hover:scale-110 group-hover:shadow-xl transition-all duration-500 z-10">
              <span className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow-md border-2 border-white z-20">
                {i + 1}
              </span>
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <s.icon className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-xl text-foreground">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed px-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
