import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Upload, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, getApiErrorMessage } from "@/lib/api";

const RequestPickup = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const submitSectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = typeof reader.result === "string" ? reader.result : null;
        setImageDataUrl(result);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageDataUrl(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login or signup first to submit a pickup request.");
      navigate("/login");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const address = formData.get("address") as string;
    const pickupDateTime = formData.get("pickupDateTime") as string;

    if (!name || !phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }

    if (!pickupDateTime) {
      toast.error("Please select a pickup date and time.");
      return;
    }

    const selectedDate = new Date(pickupDateTime);
    if (Number.isNaN(selectedDate.getTime())) {
      toast.error("Please select a valid pickup date and time.");
      return;
    }

    if (selectedDate.getTime() < Date.now()) {
      toast.error("Pickup date and time cannot be in the past.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          reporterName: name,
          reporterPhone: phone,
          address,
          date: selectedDate.toISOString(),
          wasteImageDataUrl: imageDataUrl,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setImageDataUrl(null);
        setPreview(null);
        toast.success("Report submitted! We'll clean it up soon. 🙏");
        // Scroll to submit section after a brief delay
        setTimeout(() => {
          submitSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        const errData = await res.json().catch(() => ({}));
        toast.error(getApiErrorMessage(errData.error || errData.message || errData.msg, "Failed to submit request."));
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Network error. Backend might be offline."));
    }
  };

  if (submitted) {
    return (
      <section id="request" className="py-16 md:py-24" ref={submitSectionRef}>
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
          <p className="text-muted-foreground mt-2">Spotted puja waste on the road <br />  <b>Share the details and we'll clean it up!</b></p>
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
            <Label htmlFor="pickupDateTime">Preferred Pickup Date & Time</Label>
            <Input id="pickupDateTime" name="pickupDateTime" type="datetime-local" required />
            <p className="text-xs text-muted-foreground">Choose a real date and time. This prevents backend date validation errors.</p>
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
