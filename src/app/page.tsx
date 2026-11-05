"use client";

import snrWatermark from "@/assets/snr-logo-without-bg-water-mark.png";
import snrLogo from "@/assets/snr-logo-without-bg.png";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (email === "hr@snredatas.com" && password === "123456") {
        router.push("/builder");
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#e8e6df] relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <img
          src={snrWatermark.src}
          alt="background watermark"
          className="w-[80%] max-w-[800px] object-contain opacity-[0.03]"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#fdfbf7] rounded-xl shadow-2xl border border-[#d8d4c8] overflow-hidden">
        {/* Top Decorative Border */}
        <div className="h-2 w-full bg-gradient-to-r from-[#1f2536] via-[#b8862e] to-[#1f2536]" />

        <div className="p-10">
          <div className="flex flex-col items-center mb-8">
            <img
              src={snrLogo.src}
              alt="SNR Edatas Logo"
              className="h-16 object-contain mb-4"
            />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="text-3xl font-semibold text-[#1f2536] tracking-wide"
            >
              Certificate Studio
            </h1>
            <p className="text-sm text-[#6b6657] mt-1.5 text-center">
              SNR Edatas Central Certificate &amp; Verification Portal
            </p>
            <div className="mt-3 px-3 py-1 bg-[#b8862e]/10 border border-[#b8862e]/30 rounded-full text-[11px] font-semibold text-[#b8862e] tracking-wider uppercase">
              CMMI Level 5 &bull; Enterprise
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#1f2536] mb-1.5 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-[#d8d4c8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white transition-shadow"
                placeholder="hr@snredatas.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1f2536] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-[#d8d4c8] rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white transition-shadow"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-[#fef2f2] text-[#991b1b] border border-[#fca5a5] rounded-md p-3 text-sm flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#1f2536] text-white rounded-md py-3 text-sm font-semibold tracking-wide hover:bg-[#2c3450] transition-colors flex justify-center items-center ${isLoading ? "opacity-70 cursor-wait" : ""}`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setEmail("hr@snredatas.com");
                setPassword("123456");
              }}
              className="w-full text-xs text-[#6b6657] hover:text-[#1f2536] text-center pt-1 underline transition-colors"
            >
              Fill Demo Credentials (hr@snredatas.com)
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="bg-[#f6f2e7] border-t border-[#d8d4c8] py-4 text-center">
          <p className="text-xs text-[#9b9383] font-medium tracking-wide">
            © {new Date().getFullYear()} SNR Edatas. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
