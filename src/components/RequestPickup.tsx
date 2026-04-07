import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, CheckCircle2 } from "lucide-react";

const RequestPickup = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const entry = {
      id: Date.now(),
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      time: formData.get("time") as string,
      photo: preview || null,
      submittedAt: new Date().toISOString(),
    };
    const existing = JSON.parse(localStorage.getItem("puja_requests") || "[]");
    existing.push(entry);
    localStorage.setItem("puja_requests", JSON.stringify(existing));
    setSubmitted(true);
    toast.success("Report submitted! We'll clean it up soon. 🙏");
  };

  if (submitted) {
    return (
      <section id="request" className="py-16 md:py-24">
        <div className="container max-w-lg text-center space-y-6 animate-fade-in-up">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Thank You!</h2>
          <p className="text-muted-foreground">Your report has been received. Our team will go to the spot and clean it up!</p>
          <Button onClick={() => setSubmitted(false)}>Submit Another Request</Button>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="py-16 md:py-24">
      <div className="container max-w-xl space-y-8">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">Report Puja Waste</h2>
          <p className="text-muted-foreground mt-2">Spotted puja waste on the road? Share the details and we'll clean it up!</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-sm border p-6 md:p-8 space-y-5">
          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photo of Roadside Puja Waste</Label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-primary transition-colors"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="max-h-40 rounded-lg object-cover" />
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload a photo of the waste spot</span>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Your name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Waste Location</Label>
            <Input id="address" name="address" placeholder="Road/area where you spotted the waste" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Preferred Pickup Time</Label>
            <Input id="time" name="time" placeholder="e.g. Morning 9-12" required />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Submit Request
          </Button>
        </form>
      </div>
    </section>
  );
};

export default RequestPickup;
