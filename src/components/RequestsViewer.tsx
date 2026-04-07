import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface RequestEntry {
  id: number;
  name: string;
  phone: string;
  address: string;
  time: string;
  photo: string | null;
  submittedAt: string;
}

const RequestsViewer = () => {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState<RequestEntry[]>([]);

  useEffect(() => {
    if (open) {
      const data = JSON.parse(localStorage.getItem("puja_requests") || "[]");
      setRequests(data);
    }
  }, [open]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 opacity-10 hover:opacity-100 transition-opacity z-50"
        onClick={() => setOpen(true)}
        title="View Requests"
      >
        <Eye className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submitted Requests ({requests.length})</DialogTitle>
            <DialogDescription>All waste reports saved locally.</DialogDescription>
          </DialogHeader>

          {requests.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No requests yet.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((r) => (
                <div key={r.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-foreground">{r.name}</p>
                      <p className="text-sm text-muted-foreground">{r.phone}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.submittedAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm"><span className="font-medium">Location:</span> {r.address}</p>
                  <p className="text-sm"><span className="font-medium">Pickup Time:</span> {r.time}</p>
                  {r.photo && (
                    <img src={r.photo} alt="Waste" className="rounded-lg max-h-32 object-cover" />
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestsViewer;
