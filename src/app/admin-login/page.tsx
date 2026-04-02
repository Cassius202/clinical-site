"use client";

import { useState, useEffect, useCallback } from "react";
import { handleLogin } from "../actions/auth";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage"; 
import toast from "react-hot-toast";
// Import Lucide Icons
import { Eye, EyeOff, Lock, ShieldAlert, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

const MAX_ATTEMPTS_1HR = 7;
const MAX_ATTEMPTS_24HR = 12;
const RESET_1HR = 60 * 60 * 1000; 
const RESET_24HR = 24 * 60 * 60 * 1000; 

interface AttemptsData {
  attempts: number;
  lastAttemptTime: number;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const router = useRouter();

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [attemptsData, setAttemptsData] = useLocalStorage<AttemptsData | null>(
    "attemptedLogins",
    null,
  );

  const attempts = attemptsData?.attempts || 0;
  const lastAttemptTime = attemptsData?.lastAttemptTime || 0;

  const resetAttempts = useCallback(() => {
    setAttemptsData(null);
  }, [setAttemptsData]);

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS_1HR) {
      const now = Date.now();
      const waitTime = attempts >= MAX_ATTEMPTS_24HR ? RESET_24HR : RESET_1HR;
      const remaining = Math.max(0, waitTime - (now - lastAttemptTime));
      setTimeRemaining(remaining);

      const interval = setInterval(() => {
        const newRemaining = Math.max(0, waitTime - (Date.now() - lastAttemptTime));
        setTimeRemaining(newRemaining);
        if (newRemaining <= 0) {
          resetAttempts();
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [attempts, lastAttemptTime, resetAttempts]);

  const isBlocked = () => {
    if (!isMounted) return false;
    if (attempts >= MAX_ATTEMPTS_24HR) return "24hr";
    if (attempts >= MAX_ATTEMPTS_1HR) return "1hr";
    return false;
  };

  const formatTimeRemaining = (ms: number) => {
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((ms % (60 * 1000)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const blockedStatus = isBlocked();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (blockedStatus) return;

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    console.log(email)
    if (!email.match(EMAIL_REGEX)) {
      toast.error("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    const result = await handleLogin(formData);

    if (result.success) {
      toast.success("Admin Sign-in successful");
      resetAttempts();
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const newAttempts = attempts + 1;
      setAttemptsData({ attempts: newAttempts, lastAttemptTime: Date.now() });
      setError(result.error || "Invalid credentials");
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen grid place-content-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 m-auto items-start p-8 py-10 w-full max-w-[360px] text-gray-500 rounded-xl shadow-2xl border border-gray-200 bg-white"
      >
        <div className="m-auto flex flex-col items-center gap-2 mb-2">
            <div className="p-3 bg-sky-50 rounded-full text-sky-600">
                <Lock size={28} />
            </div>
            <p className="text-2xl font-semibold text-gray-800">Admin Login</p>
        </div>

        {/* Attempts Counter */}
        {isMounted && attempts > 0 && !blockedStatus && (
          <div className="w-full bg-amber-50 border border-amber-100 rounded-lg p-2 flex items-center justify-center gap-2 text-xs font-medium text-amber-700">
            <ShieldAlert size={14} />
            Attempts: {attempts} / {MAX_ATTEMPTS_1HR}
          </div>
        )}

        {/* Error Message */}
        {isMounted && error && (
          <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg w-full border border-red-100">
            <AlertCircle size={16} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="w-full">
          <label className="text-sm font-medium text-gray-700">Email Address</label>
          <input
            name="email"
            placeholder="admin@example.com"
            className="border border-gray-200 rounded-lg w-full p-2.5 mt-1 outline-sky-600 disabled:bg-gray-50 disabled:text-gray-400 transition-all"
            type="email"
            required
            disabled={loading || !!blockedStatus}
          />
        </div>

        <div className="w-full relative">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
                name="password"
                placeholder="••••••••"
                className="border border-gray-200 rounded-lg w-full p-2.5 mt-1 outline-sky-600 pr-10 disabled:bg-gray-50 disabled:text-gray-400 transition-all"
                type={showPassword ? "text" : "password"}
                required
                disabled={loading || !!blockedStatus}
            />
            <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-400 hover:text-sky-600 transition-colors disabled:opacity-50"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!!blockedStatus}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          disabled={loading || !!blockedStatus}
          className="bg-sky-600 hover:bg-sky-700 disabled:bg-sky-200 disabled:text-sky-500 transition-all text-white w-full py-2.5 rounded-lg font-semibold mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : blockedStatus ? (
            <Lock size={18} />
          ) : null}
          
          {!isMounted ? "Login" : 
           loading ? "Verifying..." : 
           blockedStatus ? `Locked (${formatTimeRemaining(timeRemaining)})` : 
           "Sign In"}
        </button>

        {isMounted && blockedStatus && (
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 m-auto mt-2 transition-colors font-medium"
          >
            Return to Homepage <ArrowRight size={12} />
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;