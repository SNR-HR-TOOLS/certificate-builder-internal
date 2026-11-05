"use client";

import snrLogo from "@/assets/snr-logo-without-bg.png";
import { CheckCircle2, Copy, ExternalLink, Printer, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function Row({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value?: string | null;
  highlight?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between py-3.5 border-b border-[#e6e1d2] last:border-b-0 gap-1 sm:gap-4">
      <div className="text-xs uppercase tracking-wider text-[#6b6657] font-semibold sm:w-48 shrink-0">
        {label}
      </div>
      <div
        className={`text-[14.5px] text-right sm:text-left ${
          highlight
            ? "font-bold text-[#1f2536] text-[16px]"
            : "text-[#1f2536]/90 font-medium"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const s = {
    name: searchParams.get("name") ?? undefined,
    serial: searchParams.get("serial") ?? undefined,
    title: searchParams.get("title") ?? "RECOGNITION OF COMPLETION",
    subtitle: searchParams.get("subtitle") ?? undefined,
    date: searchParams.get("date") ?? undefined,
    periodLabel: searchParams.get("periodLabel") ?? "Training Period",
    period: searchParams.get("period") ?? undefined,
    organization:
      searchParams.get("org") ??
      searchParams.get("brand") ??
      "SNR Edatas Private Limited",
    sig1Name: searchParams.get("sig1Name") ?? searchParams.get("mentor"),
    sig1Role: searchParams.get("sig1Role") ?? searchParams.get("role"),
    sig2Name: searchParams.get("sig2Name"),
    sig2Role: searchParams.get("sig2Role"),
    body: searchParams.get("body") ?? undefined,
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#e8e6df] flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-[#fdfbf7] rounded-2xl shadow-2xl overflow-hidden border border-[#d8d4c8]">
        {/* Top Header */}
        <div className="bg-[#1f2536] text-white px-8 py-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8862e]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#b8a98a] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#b8862e]" />
              Official Credential Verification
            </div>
            <Link
              href="/builder"
              className="text-xs text-[#b8a98a] hover:text-white flex items-center gap-1 transition-colors"
            >
              Open Studio <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-3xl sm:text-4xl font-semibold tracking-wide"
              >
                {s.organization}
              </h1>
              <p className="text-sm text-white/70 mt-1">
                Central Verification Registry • Secure Authentication
              </p>
            </div>
            <img
              src={snrLogo.src}
              alt="SNR Edatas Logo"
              className="h-10 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className="bg-[#eaf5ea] border-b border-[#c2e4c2] px-8 py-3.5 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-[#1b6b2d] font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-[#228b37]" />
            <span>Authenticated &amp; Valid Certificate</span>
          </div>
          {s.serial && (
            <span className="text-xs font-mono font-bold bg-white text-[#1b6b2d] px-2.5 py-1 rounded-md border border-[#c2e4c2]">
              ID: {s.serial}
            </span>
          )}
        </div>

        {/* Certificate Details */}
        <div className="p-8">
          <div className="space-y-1">
            <Row label="Certificate Title" value={s.title} highlight />
            {s.subtitle && (
              <Row
                label="Program / Track"
                value={s.subtitle}
                highlight
              />
            )}
            <Row
              label="Recipient Name"
              value={s.name || "Participant Name"}
              highlight
            />
            <Row label="Issuing Organization" value={s.organization} />
            <Row label="Certificate ID" value={s.serial} />
            <Row label="Date of Certification" value={s.date} />

            {s.period && (
              <Row
                label={s.periodLabel || "Training Period"}
                value={s.period}
              />
            )}

            {s.sig1Name && (
              <Row
                label="Primary Signatory"
                value={`${s.sig1Name} (${s.sig1Role || "Authorized Signatory"})`}
              />
            )}

            {s.sig2Name && (
              <Row
                label="Secondary Signatory"
                value={`${s.sig2Name} (${s.sig2Role || "SNR Edatas Private Limited"})`}
              />
            )}

            {s.body && (
              <div className="pt-3.5 pb-2 border-b border-[#e6e1d2]">
                <div className="text-xs uppercase tracking-wider text-[#6b6657] font-semibold mb-2">
                  Program Description &amp; Recognition
                </div>
                <p className="text-[13.5px] leading-relaxed text-[#1f2536]/80 bg-[#f6f2e7] p-3.5 rounded-lg border border-[#e6e1d2]">
                  {s.body}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-[#e6e1d2] flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-[#9b9383]">
              Verified securely via SNR Edatas Verification Registry
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-[#f6f2e7] text-[#1f2536] border border-[#d8d4c8] hover:bg-[#ece6d5] flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? "Link Copied!" : "Copy Link"}
              </button>
              <button
                onClick={handlePrint}
                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-[#1f2536] text-white hover:bg-[#2c3450] flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Record
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f6f2e7] border-t border-[#d8d4c8] py-3 text-center text-xs text-[#9b9383]">
          © {new Date().getFullYear()} SNR Edatas Private Limited. All rights
          reserved.
        </div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#e8e6df] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f2536]" />
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
