import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Trash2, Leaf } from "lucide-react";

interface RequestEntry {
  id: number;
  name: string;
  phone: string;
  address: string;
  time: string;
  photo: string | null;
  submittedAt: string;
}

const Admin = () => {
  const [requests, setRequests] = useState<RequestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      const data = JSON.parse(localStorage.getItem("puja_requests") || "[]");
      setRequests(data.reverse());
      setLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/login");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
    navigate("/");
  };

  const handleClear = () => {
    localStorage.removeItem("puja_requests");
    setRequests([]);
    toast.success("All requests cleared");
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2 font-bold text-lg text-primary">
            <Leaf className="h-6 w-6" /> Admin Dashboard
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleClear} disabled={requests.length === 0}>
              <Trash2 className="h-4 w-4 mr-1" /> Clear All
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Submitted Reports</h1>
        <p className="text-muted-foreground mb-6">Total: {requests.length} reports</p>

        {requests.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No reports submitted yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-card border rounded-xl p-5 space-y-3 shadow-sm">
                {r.photo && (
                  <img src={r.photo} alt="Waste" className="rounded-lg w-full h-40 object-cover" />
                )}
                <div>
                  <p className="font-semibold text-foreground">{r.name}</p>
                  <p className="text-sm text-muted-foreground">{r.phone}</p>
                </div>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium text-foreground">Location:</span> <span className="text-muted-foreground">{r.address}</span></p>
                  <p><span className="font-medium text-foreground">Pickup Time:</span> <span className="text-muted-foreground">{r.time}</span></p>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(r.submittedAt).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
