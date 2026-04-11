export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:6006";

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  const rawMessage =
    typeof error === "string"
      ? error
      : error && typeof error === "object" && "message" in error
        ? String((error as { message?: unknown }).message || "")
        : "";

  const message = rawMessage.toLowerCase();

  if (message.includes("user already exists") || message.includes("email already exists") || message.includes("duplicate key")) {
    return "This email is already registered. Please login instead.";
  }

  if (message.includes("cast to date failed") || message.includes("validation failed: date")) {
    return "Please select a valid pickup date and time.";
  }

  if (message.includes("invalid credentials")) {
    return "Invalid email or password.";
  }

  if (message.includes("network error") || message.includes("failed to fetch")) {
    return "Network error. Please check your internet connection or backend server.";
  }

  return rawMessage || fallback;
};