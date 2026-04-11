import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Heart, QrCode, Users, Leaf } from "lucide-react";

const Support = () => {
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [vAvailability, setVAvailability] = useState("");
  const [vArea, setVArea] = useState("");
  const qrImageSrc = "/images/qr-only.jpeg";
  const upiId = "adityakumaradityakumar459@okhdfcbank";

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vName || !vPhone) {
      toast.error("Please fill required fields");
      return;
    }
    toast.success("Thank you for registering as a volunteer! We will contact you soon.");
    setVName("");
    setVPhone("");
    setVAvailability("");
    setVArea("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Support Our Cause</h1>
            <p className="text-lg text-muted-foreground">
              Every small action makes a big impact. Join us in our mission to keep our rivers clean and manage pooja waste sustainably.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 text-center border border-green-100 dark:border-green-800">
              <Leaf className="h-10 w-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-2">8,00+ kg</h3>
              <p className="text-green-800/80 dark:text-green-200/80 font-medium">Waste Collected</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 text-center border border-blue-100 dark:border-blue-800">
              <Heart className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">117+</h3>
              <p className="text-blue-800/80 dark:text-blue-200/80 font-medium">Areas Cleaned</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-8 text-center border border-purple-100 dark:border-purple-800">
              <Users className="h-10 w-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-2">45+</h3>
              <p className="text-purple-800/80 dark:text-purple-200/80 font-medium">Volunteers Joined</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Donation Section */}
            <div className="bg-card border rounded-2xl p-8 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <QrCode className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Support Us via UPI</h2>
              </div>
              <p className="text-muted-foreground mb-8">
                Your support helps us buy equipment, fund logistics, and operate composting facilities. Scan the QR code or use the UPI ID below.
              </p>
              
              <div className="bg-muted rounded-xl p-8 flex flex-col items-center justify-center mb-6">
                <div className="w-full max-w-[18rem] bg-white p-3 rounded-xl shadow-sm mb-4 border">
                  <img
                    src={qrImageSrc}
                    alt="UPI payment QR code"
                    className="h-auto w-full rounded-lg object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-center">Scan to Pay via UPI</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>UPI ID</Label>
                  <div className="flex items-center gap-2">
                    <Input value={upiId} readOnly className="bg-muted font-mono" />
                    <Button type="button" variant="outline" onClick={() => { navigator.clipboard.writeText(upiId); toast.success("UPI ID Copied"); }}>Copy</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Section */}
            <div className="bg-card border rounded-2xl p-8 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Become a Volunteer</h2>
              </div>
              <p className="text-muted-foreground mb-5 leading-relaxed">
                Want to make a hands-on impact? Join our community of dedicated volunteers for weekend cleanup drives and awareness campaigns.
              </p>
              
              <form onSubmit={handleVolunteerSubmit} className="flex h-full flex-col gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="vName">Full Name *</Label>
                  <Input id="vName" value={vName} onChange={(e) => setVName(e.target.value)} required placeholder="John Doe" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vPhone">Phone Number *</Label>
                  <Input id="vPhone" type="tel" value={vPhone} onChange={(e) => setVPhone(e.target.value)} required placeholder="+91 9876543210" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vArea">Preferred Working Area</Label>
                  <Input id="vArea" value={vArea} onChange={(e) => setVArea(e.target.value)} placeholder="E.g. North Delhi, Gomti Nagar" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="vAvailability">Availability</Label>
                  <select id="vAvailability" value={vAvailability} onChange={(e) => setVAvailability(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select availability</option>
                    <option value="Weekends Only">Weekends Only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
                <Button type="submit" className="w-full h-11 mt-2">Register as Volunteer</Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
