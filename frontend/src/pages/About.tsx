import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="text-center mb-0">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">About SwachhPooja</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight">Clean Devotion for Tomorrow</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Transforming puja waste into environmental action—one request at a time.
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-muted-foreground">
            
                <img src="/images/about-first.jpg" alt="Sacred flowers" className="w-full h-[400px] object-cover rounded-3xl shadow-md my-12" style={{ objectPosition: "center 30%" }} />

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">The Problem We're Solving</h2>
              <p>
                Every day, millions of flowers, incense sticks, and offerings are left at temples, homes, and sacred sites across India. While these expressions of devotion are beautiful, their disposal often harms our environment.
              </p>
              <p>
                Many offerings end up in landfills, rivers, and roadsides—contributing to pollution. We realized that your faith shouldn't come at the cost of nature. That's why we created SwachhPooja—a simple way to ensure your spiritual practice respects Mother Earth.
              </p>
            </div>

            <div className="pl-6 border-l-4 border-primary my-10 py-2">
              <p className="text-2xl font-medium text-foreground italic leading-relaxed m-0">
                "Devotion without pollution. Faith that heals, not harms."
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">How We're Different</h2>
              <p>
                SwachhPooja connects households and temples directly to our pickup teams. Simply request a pickup through our app, and we'll collect your puja waste responsibly. No hassle, no guilt—just clean devotion.
              </p>
              <p>
                Unlike traditional waste disposal, we ensure every offering is handled with respect. We compost organic materials naturally, creating nutrient-rich soil that supports local farmers and community gardens. Your waste becomes nature's gift.
              </p>
              <p>
                We're building a movement where spirituality and sustainability walk hand in hand.
              </p>
            </div>

            <img src="/images/about-community-service.jpg" alt="Community service" className="w-full h-[400px]  rounded-3xl shadow-md my-12" />

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
              <p>
                Since launch, we've collected and responsibly handled thousands of kilograms of puja waste. Our composting process has created organic fertilizer now used in urban gardens, temples, and agricultural lands.
              </p>
              <p>
                But numbers don't tell the full story. What matters most is the growing community of believers who understand that true devotion means giving back. Volunteers of all ages join us regularly—students, homemakers, retirees—all united by a simple belief: protecting nature is a spiritual act.
              </p>
            </div>

            <img src="/images/about-green-nature.jpg" alt="Green nature" className="w-full h-[400px] object-cover rounded-3xl shadow-md my-12" />

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Join the Movement</h2>
              <p>
                Every pickup request you make, every volunteer hour you contribute, every conversation you start—it all creates ripples of change. Together, we're proving that environmental responsibility and spiritual practice aren't opposites. They're partners.
              </p>
              <p>
                Whether you request a pickup from your home, volunteer with our teams, or simply spread awareness, you're part of something larger. You're part of a cleaner, greener, more mindful India.
              </p>
            </div>

          </div>
          
          <div className="mt-20 pt-10 border-t text-center">
            <h3 className="text-2xl font-bold mb-4">Join Our Journey</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We are a young startup built on passion, sweat, and community love. We invite you to be part of our story. Request a pickup, volunteer, or just spread the word.
            </p>
            <a href="/support" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 py-2">
              Support Our Cause
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
