import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LogOut, Trash2, Leaf, MapPin, User, CheckCircle, Search } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6006";

interface RequestEntry {
  id: string;
  userEmail: string;
  address: string;
  time: string;
  notes: string;
  photo: string | null;
  status: string;
  submittedAt: string;
  assignedAgent?: string;
  acceptanceTime?: string;
}

const Admin = () => {
  const [requests, setRequests] = useState<RequestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      
      const mockStr = localStorage.getItem("mock_login");
      let isAdmin = false;
      if (mockStr && JSON.parse(mockStr).role === "Admin") {
        isAdmin = true;
      }
      
      if (!isAdmin) {
        navigate("/login");
        return;
      }
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setRequests(data.map((b: any) => ({
            id: b._id,
            userEmail: b.user?.email || "Unknown",
            address: b.address || "",
            time: b.date,
            notes: "", 
            photo: b.wasteImageDataUrl || null,
            status: b.status,
            submittedAt: b.createdAt,
            assignedAgent: b.assignedAgent,
            acceptanceTime: b.acceptanceTime
          })).reverse());
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mock_login");
    toast.success("Logged out");
    navigate("/login");
  };

  const handleClear = () => {
    toast.error("Clear feature currently disabled.");
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setRequests(requests.map(r => r.id === id ? { ...r, status: newStatus } : r));
        toast.success(`Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const assignAgent = async (id: string) => {
    const agentName = prompt("Enter agent name to assign:");
    if (!agentName) return;
    const time = new Date().toLocaleString();
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ assignedAgent: agentName, acceptanceTime: time, status: "In Progress" })
      });
      if (res.ok) {
        setRequests(requests.map(r => r.id === id ? { ...r, assignedAgent: agentName, acceptanceTime: time, status: "In Progress" } : r));
        toast.success(`Agent ${agentName} assigned successfully`);
      }
    } catch (err) {
      toast.error("Failed to assign agent");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const filteredRequests = requests.filter(r => {
    const matchStatus = filterStatus === "All" || r.status === filterStatus;
    const matchSearch = (r.address || "").toLowerCase().includes(search.toLowerCase()) || (r.userEmail || "").toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card/90 backdrop-blur-md sticky top-0 z-50 p-4">
        <div className="container flex items-center justify-between mx-auto">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Leaf className="h-6 w-6" /> Admin Panel
          </div>
          <div className="flex items-center gap-4">
            <Button variant="destructive" size="sm" onClick={handleClear} disabled={requests.length === 0}>
              <Trash2 className="h-4 w-4 mr-1" /> Clear Data
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4  mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container flex-1 py-8 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Requests Overview</h1>
            <p className="text-muted-foreground mt-1">Manage, assign, and track pickups.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search location..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8" />
            </div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-20 border rounded-xl bg-card/50">
            <p className="text-lg text-muted-foreground">No requests found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-4">
            {filteredRequests.map((r) => (
              <div key={r.id} className="bg-card border space-y-4 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
                <span className={`absolute top-5 right-5 px-3 py-1 text-xs rounded-full font-bold ${r.status === 'Completed' ? 'bg-green-100 text-green-800' : r.status === 'Pending' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {r.status}
                </span>
                
                <div className="flex gap-4 items-start">
                  {r.photo ? (
                    <img src={r.photo} alt="Waste" className="w-24 h-24 object-cover rounded-lg border" />
                  ) : (
                    <div className="w-24 h-24 bg-muted rounded-lg border flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                  )}
                  
                  <div className="space-y-1 pr-16 w-full">
                    <p className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/> {r.userEmail || "Guest User"}</p>
                    <p className="text-sm font-medium flex items-start gap-2"><MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5"/> <span className="line-clamp-2">{r.address}</span></p>
                    <p className="text-xs text-muted-foreground mt-2">Requested Time: {new Date(r.time).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Submitted: {new Date(r.submittedAt).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-muted/50 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-sm">
                    {r.assignedAgent ? (
                      <div>
                        <p><span className="font-semibold">Agent:</span> {r.assignedAgent}</p>
                        <p className="text-xs text-muted-foreground">Accepted: {r.acceptanceTime}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">No agent assigned</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!r.assignedAgent && (
                      <Button size="sm" variant="outline" onClick={() => assignAgent(r.id)}>Assign Agent</Button>
                    )}
                    {r.status === "Pending" && (
                      <Button size="sm" onClick={() => updateStatus(r.id, "In Progress")}>Start Progress</Button>
                    )}
                    {r.status === "In Progress" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateStatus(r.id, "Completed")}><CheckCircle className="h-4 w-4 mr-1"/> Finish</Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
