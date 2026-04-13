import { useState, useEffect } from "react";
import { Menu, X, Leaf, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "@/lib/api";

const getTokenExpiryMs = (token: string): number | null => {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const payload = JSON.parse(atob(paddedBase64)) as { exp?: number };

    if (!payload.exp) return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);

  const clearSessionAndRedirect = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mock_login");
    setIsLogged(false);
    window.location.href = "/";
  };

  useEffect(() => {
    let logoutTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleAutoLogout = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      const expiryTime = getTokenExpiryMs(token);
      if (!expiryTime) return;

      const remainingMs = expiryTime - Date.now();
      if (remainingMs <= 0) {
        clearSessionAndRedirect();
        return;
      }

      logoutTimer = setTimeout(() => {
        clearSessionAndRedirect();
      }, remainingMs);
    };

    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const mockStr = localStorage.getItem("mock_login");

      if (!token && !mockStr) {
        setIsLogged(false);
        return;
      }

      if (mockStr) {
        try {
          JSON.parse(mockStr);
          setIsLogged(true);
          return;
        } catch {
          localStorage.removeItem("mock_login");
        }
      }

      setIsLogged(Boolean(token));
      scheduleAutoLogout();
    };

    checkAuth();

    const handleStorageChange = () => checkAuth();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [location.pathname]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Activity", href: "/activity" },
    { label: "Support NGO", href: "/support" },
    { label: "Contact", href: "/contact" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: "POST",
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } finally {
      clearSessionAndRedirect();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 max-w-6xl">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Leaf className="h-6 w-6" /> SwachhPooja
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} to={l.href} className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.href ? "text-primary" : "text-muted-foreground"}`}>
              {l.label}
            </Link>
          ))}
          
          {isLogged ? (
            <Button
              size="sm"
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}>
              <LogOut className="mr-1.5 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Join Us</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b pb-4 shadow-lg absolute w-full">
          <div className="container mx-auto px-4 flex flex-col gap-3 pt-2">
            {links.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={`text-sm font-medium py-2 border-b border-border/50 ${location.pathname === l.href ? "text-primary" : "text-muted-foreground"}`}>
                {l.label}
              </Link>
            ))}
            
            <div className="pt-2 flex flex-col gap-2">
              {isLogged ? (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full justify-start border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={async () => {
                    setOpen(false);
                    await handleLogout();
                  }}>
                  <LogOut className="mr-1.5 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button asChild size="sm" variant="outline" className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link to="/signup">Join Us</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
