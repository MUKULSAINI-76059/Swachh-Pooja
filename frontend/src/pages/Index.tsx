import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogOut, Leaf, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import { API_BASE_URL, getApiErrorMessage } from "@/lib/api";

interface RequestEntry {
  id: number;
  userEmail: string;
  address: string;
  time: string;
  notes: string;
  photo: string | null;
  status: string;
  submittedAt: string;
}

const Index = () => {
  const [requests, setRequests] = useState<RequestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ email?: string;[key: string]: unknown } | null>(null);
  const navigate = useNavigate();

  // Form states
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userStr = localStorage.getItem("mock_login");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setRequests(data.map((b: any) => ({
            id: b._id,
            userEmail: user?.email || "",
            address: b.address || "",
            time: b.date,
            notes: "", // The schema does not hold notes but keeping object valid
            photo: null,
            status: b.status,
            submittedAt: b.createdAt
          })).reverse());
        }
      } catch (err) {
        console.error("Booking fetch error:", err);
      }

      setLoading(false);
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mock_login");
    toast.success("Logged out");
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !time) {
      toast.error("Please fill in required fields.");
      return;
    }

    const selectedDate = new Date(time);
    if (Number.isNaN(selectedDate.getTime())) {
      toast.error("Please choose a valid pickup date and time.");
      return;
    }

    if (selectedDate.getTime() < Date.now()) {
      toast.error("Pickup date and time cannot be in the past.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          address,
          date: selectedDate.toISOString()
        })
      });

      if (res.ok) {
        const data = await res.json();
        const newReq: RequestEntry = {
          id: data._id,
          userEmail: user?.email || "",
          address: data.address,
          time: data.date,
          notes,
          photo: null, // Add to DB schema if you want persistent images
          status: data.status,
          submittedAt: data.createdAt,
        };

        setRequests([newReq, ...requests]);
        setAddress("");
        setTime("");
        setNotes("");
        setPhoto(null);
        toast.success("Pickup Request Confirmed!");
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(getApiErrorMessage(errorData.error || errorData.message || errorData.msg, "Failed to submit request."));
      }
    } catch (err) {
      toast.error(getApiErrorMessage(err, "Network error submitting request."));
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const accepted = requests.filter(r => r.status === "In Progress" || r.status === "Accepted").length;
  const completed = requests.filter(r => r.status === "Completed").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-24 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, manage your pickup requests.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" /> Logout</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">Total Requests</h3>
            <p className="text-3xl font-bold mt-2">{total}</p>
          </div>
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
            <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Pending</h3>
            <p className="text-3xl font-bold mt-2 text-blue-700 dark:text-blue-300">{pending}</p>
          </div>
          <div className="bg-yellow-50/50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-100 dark:border-yellow-800 shadow-sm">
            <h3 className="text-sm font-medium text-yellow-600 dark:text-yellow-400">In Progress</h3>
            <p className="text-3xl font-bold mt-2 text-yellow-700 dark:text-yellow-300">{accepted}</p>
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/20 p-6 rounded-xl border border-green-100 dark:border-green-800 shadow-sm">
            <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Completed</h3>
            <p className="text-3xl font-bold mt-2 text-green-700 dark:text-green-300">{completed}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Request History</h2>
            {requests.length === 0 ? (
              <div className="text-center py-12 border rounded-xl bg-card/50 text-muted-foreground">
                No requests found. Create one to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((r) => (
                  <div key={r.id} className="bg-card border rounded-xl p-5 flex flex-col sm:flex-row gap-4 shadow-sm items-start">
                    {r.photo && (
                      <img src={r.photo} alt="Waste" className="w-full sm:w-32 h-32 object-cover rounded-lg shrink-0" />
                    )}
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-lg">{r.address}</p>
                          <p className="text-sm text-muted-foreground">{new Date(r.submittedAt).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-xs rounded-full font-medium whitespace-nowrap ${r.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : r.status === 'Pending'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                            }`}
                        >
                          {r.status}
                        </span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Preferred Time:</span> {new Date(r.time).toLocaleString()}
                      </p>
                      {r.notes && (
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">Notes:</span> {r.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
