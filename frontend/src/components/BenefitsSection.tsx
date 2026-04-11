import { Recycle, TreePine, ThumbsUp } from "lucide-react";

const benefits = [
  { icon: Recycle, title: "Eco-Friendly Disposal", desc: "No more roadside dumping. Reported puja waste gets a second life as compost.", color: "from-emerald-400 to-green-500", bg: "bg-green-50" },
  { icon: TreePine, title: "Supports Nature", desc: "The compost nurtures plants and trees — from waste to greenery and life.", color: "from-teal-400 to-emerald-500", bg: "bg-teal-50" },
  { icon: ThumbsUp, title: "Easy & Hassle-Free", desc: "Just spot, snap, and report. We handle the pickup and cleanup efficiently.", color: "from-green-400 to-lime-500", bg: "bg-lime-50" },
];

const BenefitsSection = () => (
  <section id="benefits" className="py-20 md:py-20 bg-slate-50 relative overflow-hidden">
    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    
    <div className="container relative z-10 text-center space-y-16">
      <div className="space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">Why Choose Us?</h2>
        <p className="text-lg text-muted-foreground">We make it simple to turn devotional waste into an environmental blessing.</p>
      </div>
      
      <div className="grid sm:grid-cols-3 gap-8 md:gap-12">
        {benefits.map((b, i) => (
          <div key={i} className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 overflow-hidden text-left flex flex-col items-center sm:items-start">
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${b.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            
            <div className={`w-16 h-16 rounded-2xl ${b.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white`}>
              <b.icon className="h-8 w-8 text-emerald-600" />
            </div>
            
            <h3 className="font-bold text-xl text-foreground mb-3 sm:text-left text-center">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed sm:text-left text-center">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BenefitsSection;
