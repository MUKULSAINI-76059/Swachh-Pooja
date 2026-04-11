import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Loader2, MessageCircle, Send, X, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const heroImg = "/images/hero-gemini.png";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

type ChatApiResponse = {
  success: boolean;
  answer?: string;
  error?: string;
};

const CHAT_API_URL = `${import.meta.env.VITE_API_BASE_URL || "http://localhost:6006"}/api/chat/query`;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    text: "Namaste! I can help with pickup requests, waste reporting, composting, and support.",
  },
];

const QUICK_SUGGESTIONS = [
  "How does pickup work?",
  "How to report waste?",
  "How can I track my request?",
];

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isSending, setIsSending] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!chatOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const clickedNode = event.target as Node;

      if (chatContainerRef.current && !chatContainerRef.current.contains(clickedNode)) {
        setChatOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [chatOpen]);

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSendQuery = async () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery || isSending) {
      return;
    }

    setMessages((currentMessages): ChatMessage[] => [...currentMessages, { role: "user", text: trimmedQuery }]);
    setQuery("");

    try {
      setIsSending(true);

      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedQuery }),
      });

      const data: ChatApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to get chat response");
      }

      setMessages((currentMessages): ChatMessage[] => [
        ...currentMessages,
        { role: "assistant", text: data.answer || "Sorry, I could not generate a response." },
      ]);
    } catch {
      setMessages((currentMessages): ChatMessage[] => [
        ...currentMessages,
        {
          role: "assistant",
          text: "Chat server is not reachable right now. Please start backend and try again.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleQueryKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendQuery();
    }
  };

  return (
    <>
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden hero-gradient border-b border-green-200/30">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 bg-[hsl(30_90%_55%)] rounded-full opacity-5 blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-[hsl(145_63%_32%)] rounded-full opacity-5 blur-3xl"
          style={{ transform: `translateY(${-scrollY * 0.3}px)` }}
        />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center py-20 md:py-24">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-0 bg-green-100/60 dark:bg-green-900/20 rounded-full border border-green-300/40 w-fit">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Clean Dharti, Happy Temples
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent">
                Turn Puja Waste
              </span>
              <br />
              <span className="text-foreground">Into Green Impact</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            <span className="block">See puja waste like flowers, coconuts, or cloth dumped on roadsides</span>
            <span className="mt-1 block font-semibold text-foreground">Take one photo, send a quick report, and our team handles collection and composting.</span>
            
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-y border-green-200/30 py-4 pb-0">
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-green-700">120+</p>
              <p className="text-sm text-muted-foreground">Cleanups Completed</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-green-700">200+</p>
              <p className="text-sm text-muted-foreground">Waste Composted</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-bold text-green-700">15+</p>
              <p className="text-sm text-muted-foreground">Cities Active</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white h-12 px-8 rounded-lg font-semibold group">
              <a href="#request" className="flex items-center gap-2">
                Request Pickup Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-lg font-semibold border-2 border-green-300/50 hover:bg-green-50 dark:hover:bg-green-950/30"
            >
              <a href="#how-it-works" className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                How It Works
              </a>
            </Button>
          </div>

        </div>

        {/* Right Image Section */}
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-orange-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Image Container */}
          <div className="relative">
            <img
              src={heroImg}
              alt="Puja materials composting into nature"
              width={1280}
              height={720}
              className="rounded-2xl shadow-2xl max-w-full h-max object-cover border border-green-200/30 group-hover:shadow-green-500/20 transition-shadow duration-300"
            />
            {/* Image Overlay Accent */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-600/5 to-orange-400/5 pointer-events-none" />
            {/* Bottom-right blend to hide source watermark */}
            <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-2xl bg-gradient-to-tl from-[#856a52]/95 via-[#94765b]/80 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-sm">
          <span className="hidden sm:inline">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>

    {/* Floating Side Chat */}
    <div ref={chatContainerRef} className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-2 md:bottom-6 md:right-6">
      {chatOpen ? (
        <div className="flex h-[27.5rem] w-[min(90vw,21rem)] flex-col overflow-hidden rounded-3xl border border-green-200/60 bg-white/95 shadow-[0_18px_50px_rgba(22,101,52,0.18)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-3 border-b border-green-100 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-700 text-white shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Swachh Assistant</p>
                <p className="text-xs text-muted-foreground">Ask anything about this</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setChatOpen(false)}
              className="h-9 w-9 rounded-full text-muted-foreground hover:bg-green-50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div ref={messagesContainerRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === "user"
                      ? "bg-green-700 text-white"
                      : "border border-green-100 bg-green-50 text-foreground"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-green-100 p-3">
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleQueryKeyDown}
              placeholder="Type your project question here..."
              aria-label="Type your project question"
              rows={1}
              className="w-full resize-none rounded-2xl border border-green-200 bg-white px-4 py-2.5 text-sm text-foreground outline-none transition focus:border-green-400 focus:ring-2 focus:ring-green-200"
            />

            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  aria-label={`Use suggestion: ${suggestion}`}
                  className="rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-[11px] font-medium text-green-700 transition hover:bg-green-100"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <Button
              type="button"
              onClick={handleSendQuery}
              disabled={isSending}
              className="mt-2 h-10 w-full rounded-full bg-green-700 px-5 text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:bg-green-400"
            >
              {isSending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              {isSending ? "Sending..." : "Send Query"}
            </Button>
          </div>
        </div>
      ) : null}

      {!chatOpen ? (
        <span className="rounded-full border border-green-200/80 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-green-800 shadow-sm backdrop-blur">
          Chat with Swachh Assistant
        </span>
      ) : null}

      <Button
        type="button"
        onClick={() => setChatOpen((current) => !current)}
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        className="group relative h-14 w-14 rounded-full bg-gradient-to-br from-green-600 to-green-800 p-0 text-white shadow-[0_16px_36px_rgba(22,101,52,0.36)] transition-all duration-200 hover:scale-105 hover:from-green-500 hover:to-green-700"
      >
        {!chatOpen ? <span className="absolute inset-0 rounded-full bg-green-400/25 animate-ping" /> : null}
        <span className="absolute -inset-[3px] rounded-full border border-white/25" />
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/20">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-orange-400 ring-2 ring-green-700" />
        </span>
      </Button>
    </div>
    </>
  );
};

export default HeroSection;
