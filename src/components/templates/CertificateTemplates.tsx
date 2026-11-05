"use client";

import snrWatermark from "@/assets/snr-logo-without-bg-water-mark.png";
import { forwardRef } from "react";

export interface TemplateProps {
  // Brand & Header
  logo: string;
  organization?: string;
  title: string;
  subtitle?: string;
  presentationLine?: string;

  // Recipient & Body
  name: string;
  nameFont?: "script" | "serif" | "sans";
  nameFontSize?: number;
  body: string;

  // Period / Timing
  periodLabel?: string;
  period?: string;
  showPeriod?: boolean;

  // Signatory 1 (Left)
  sig1Name?: string;
  sig1Role?: string;
  sig1Org?: string;
  sig1Img?: string;

  // Signatory 2 (Right)
  sig2Name?: string;
  sig2Role?: string;
  sig2Org?: string;
  sig2Img?: string;

  // Metadata
  serial: string;
  idLabel?: string;
  date: string;
  dateLabel?: string;

  // Options
  showWatermark: boolean;
  showQrCode?: boolean;
  qrDataUrl?: string;

  // Backward-compatibility aliases
  ceoName?: string;
  ceoRole?: string;
  sigImg?: string;
  hrName?: string;
  hrRole?: string;
  sigImgRight?: string;
}

/* ─── Normalize Props ─────────────────────────────────────────── */
function normalizeProps(props: TemplateProps) {
  return {
    logo: props.logo,
    organization: props.organization ?? "SNR Edatas Private Limited",
    title: props.title || "RECOGNITION OF COMPLETION",
    subtitle: props.subtitle ?? "",
    presentationLine:
      props.presentationLine ?? "This certificate is proudly presented to",
    name: props.name || "Recipient Name",
    nameFont: props.nameFont ?? "script",
    nameFontSize: props.nameFontSize,
    body:
      props.body ||
      "In recognition of successful completion in the\nCMMI Level 5 Program\nConducted by SNR Edatas Private Limited, acknowledging their commitment to understanding process excellence, continuous improvement and organizational maturity practices.",
    periodLabel: props.periodLabel ?? "Training Period",
    period: props.period ?? "",
    showPeriod: props.showPeriod !== false && Boolean(props.period),
    sig1Name: props.sig1Name ?? props.ceoName ?? "Authorized Signatory",
    sig1Role: props.sig1Role ?? props.ceoRole ?? "Authorized Signatory",
    sig1Org: props.sig1Org ?? "",
    sig1Img: props.sig1Img ?? props.sigImg ?? "",
    sig2Name: props.sig2Name ?? props.hrName ?? "Managing Director",
    sig2Role: props.sig2Role ?? props.hrRole ?? "SNR Edatas Private Limited",
    sig2Org: props.sig2Org ?? "SNR Edatas Private Limited",
    sig2Img: props.sig2Img ?? props.sigImgRight ?? "",
    serial: props.serial || "SNR-CERT-001",
    idLabel: props.idLabel ?? "CERTIFICATE ID",
    date: props.date || new Date().toLocaleDateString("en-GB"),
    dateLabel: props.dateLabel ?? "DATE",
    showWatermark: props.showWatermark,
    showQrCode: Boolean(props.showQrCode && props.qrDataUrl),
    qrDataUrl: props.qrDataUrl,
  };
}

/* ─── Helper: Clean Period Label (Prevents Double Colons) ──────── */
function formatPeriodLabel(label?: string, separator = ":") {
  if (!label) return "";
  const clean = label.replace(/[:/\-–—\s]+$/, "").trim();
  return `${clean}${separator}`;
}

/* ─── Helper: Format & Highlight Body Text ─────────────────────── */
function renderFormattedBody(
  text: string,
  highlightColor = "font-bold text-[#1f2536]",
) {
  if (!text) return null;
  const lines = text.split("\n");
  const regex =
    /(SNR Edatas Private Limited|SNR Edatas|CMMI Level 5|CMMI LEVEL 5)/g;

  return (
    <>
      {lines.map((line, lIdx) => {
        const parts = line.split(regex);
        return (
          <span key={lIdx} className="block leading-relaxed">
            {parts.map((part, pIdx) => {
              if (
                part === "SNR Edatas Private Limited" ||
                part === "SNR Edatas" ||
                part === "CMMI Level 5" ||
                part === "CMMI LEVEL 5"
              ) {
                return (
                  <strong key={pIdx} className={highlightColor}>
                    {part}
                  </strong>
                );
              }
              return <span key={pIdx}>{part}</span>;
            })}
          </span>
        );
      })}
    </>
  );
}

/* ─── Recipient name with consistent font size (no erratic shrinking) ─── */
function RecipientName({
  name,
  align = "center",
  width = 960,
  font = "script",
  fontSize: customFontSize,
  textColor = "text-[#1f2536]",
  lineColor = "bg-[#1f2536]/40",
  showUnderline = true,
}: {
  name: string;
  align?: "center" | "left" | "right";
  width?: number;
  font?: "script" | "serif" | "sans";
  fontSize?: number;
  textColor?: string;
  lineColor?: string;
  showUnderline?: boolean;
}) {
  const defaultSize = font === "script" ? 54 : font === "serif" ? 42 : 36;
  const activeFontSize = customFontSize || defaultSize;

  const fontFamily =
    font === "script"
      ? "var(--font-great-vibes)"
      : font === "serif"
        ? "var(--font-cormorant)"
        : "var(--font-montserrat)";

  return (
    <div
      className={`mt-3 w-full flex flex-col ${
        align === "center"
          ? "items-center"
          : align === "right"
            ? "items-end"
            : "items-start"
      } px-4`}
      style={{ maxWidth: `${width}px` }}
    >
      <h2
        style={{
          fontFamily,
          fontSize: `${activeFontSize}px`,
          fontWeight: font === "script" ? 400 : font === "serif" ? 600 : 700,
        }}
        className={`leading-tight whitespace-nowrap ${textColor} max-w-full tracking-wide`}
      >
        {name || "\u00A0"}
      </h2>
      {showUnderline && (
        <div className={`mt-2 h-[1.5px] ${lineColor} w-64 max-w-[80%]`} />
      )}
    </div>
  );
}

/* ─── Subtitle / Program Badge ────────────────────────────────── */
function SubtitleBadge({
  subtitle,
  variant = "gold",
  className = "",
}: {
  subtitle?: string;
  variant?: "gold" | "navy" | "dark" | "outline";
  className?: string;
}) {
  if (!subtitle) return null;
  const styles = {
    gold: "bg-[#b8862e]/10 border border-[#b8862e]/50 text-[#b8862e]",
    navy: "bg-[#1f2536]/10 border border-[#1f2536]/30 text-[#1f2536]",
    dark: "bg-[#b8862e]/20 border border-[#b8862e]/60 text-[#d4af37]",
    outline: "border border-current opacity-85",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full text-[11px] font-bold tracking-[0.24em] uppercase shadow-xs ${styles[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {subtitle}
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
    </div>
  );
}

/* ─── Signature Block ─────────────────────────────────────────── */
function SignatureBlock({
  align,
  signature,
  name,
  role,
  org,
  dark = false,
}: {
  align: "left" | "right" | "center";
  signature?: string;
  name: string;
  role: string;
  org?: string;
  dark?: boolean;
}) {
  const isRight = align === "right";
  const isCenter = align === "center";
  return (
    <div
      className={`flex flex-col ${
        isRight
          ? "items-end text-right"
          : isCenter
            ? "items-center text-center"
            : "items-start text-left"
      }`}
    >
      <div className="h-14 flex items-end justify-center mb-1">
        {signature ? (
          <img
            src={signature}
            alt="signature"
            className="max-h-14 max-w-[180px] object-contain"
            style={dark ? { filter: "brightness(0) invert(1)" } : undefined}
          />
        ) : (
          <div className="h-14" />
        )}
      </div>
      <div
        className={`w-[180px] h-[1.5px] ${
          dark ? "bg-white/30" : "bg-[#1f2536]/50"
        }`}
      />
      <p
        className={`mt-1.5 text-[12.5px] font-bold tracking-wide ${
          dark ? "text-white" : "text-[#1f2536]"
        }`}
      >
        {name}
      </p>
      <p
        className={`text-[11px] mt-0.5 font-medium ${
          dark ? "text-[#f8f9fa]/75" : "text-[#1f2536]/75"
        }`}
      >
        {role}
      </p>
      {org && org !== role && (
        <p
          className={`text-[10px] mt-0.5 ${
            dark ? "text-[#f8f9fa]/50" : "text-[#1f2536]/60"
          }`}
        >
          {org}
        </p>
      )}
    </div>
  );
}

/* ─── Metadata Footer (ID & Date + optional QR) ───────────────── */
function MetadataFooter({
  idLabel = "CERTIFICATE ID",
  serial,
  dateLabel = "DATE",
  date,
  qrDataUrl,
  showQrCode = false,
  dark = false,
  align = "between",
}: {
  idLabel?: string;
  serial: string;
  dateLabel?: string;
  date: string;
  qrDataUrl?: string;
  showQrCode?: boolean;
  dark?: boolean;
  align?: "between" | "center" | "right";
}) {
  return (
    <div
      className={`w-full flex items-center ${
        align === "center"
          ? "justify-center"
          : align === "right"
            ? "justify-end"
            : "justify-between"
      } text-[10px] uppercase tracking-[0.16em] ${
        dark ? "text-[#f8f9fa]/60" : "text-[#1f2536]/65"
      }`}
    >
      <div className="flex items-center gap-3">
        <span>
          {idLabel}:{" "}
          <strong className={dark ? "text-white" : "text-[#1f2536]"}>
            {serial}
          </strong>
        </span>
        <span className="opacity-40 font-light">|</span>
        <span>
          {dateLabel}:{" "}
          <strong className={dark ? "text-white" : "text-[#1f2536]"}>
            {date}
          </strong>
        </span>
      </div>

      {showQrCode && qrDataUrl && (
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${
            dark
              ? "bg-white text-[#1f2536]"
              : "bg-white border border-[#d8d4c8] text-[#1f2536]"
          } shadow-xs`}
        >
          <img
            src={qrDataUrl}
            alt="Verification QR Code"
            className="w-7 h-7 object-contain"
          />
          <div className="text-[7px] font-bold leading-tight uppercase tracking-wider">
            Verified
            <br />
            Credential
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   1. Classic Template (Base / Flagship)
   ──────────────────────────────────────────────────────────────── */
export const ClassicTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden"
        style={{
          backgroundColor: "#fdfbf7",
          backgroundImage:
            "radial-gradient(circle at center, #ffffff 0%, #f6f2e7 100%)",
        }}
      >
        {/* Decorative double border */}
        <div className="absolute inset-[16px] border border-[#b8a98a]/60 pointer-events-none" />
        <div className="absolute inset-[23px] border border-[#b8a98a]/30 pointer-events-none" />

        {/* Watermark */}
        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[52%] max-w-[400px] object-contain opacity-[0.06]"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 pt-9 pb-7 text-[#1f2536]">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain"
              style={{ width: "160px", height: "auto", maxHeight: "48px" }}
            />
            <div className="mt-2.5 w-24 h-px bg-[#b8862e]/60" />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-3 text-[42px] leading-tight font-semibold text-center tracking-wide uppercase"
            >
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1.5">
                <SubtitleBadge subtitle={p.subtitle} variant="gold" />
              </div>
            )}
          </div>

          {/* Recipient Section */}
          <div className="w-full flex flex-col items-center my-auto">
            {p.presentationLine && (
              <p
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[15px] italic text-[#1f2536]/75 tracking-wide"
              >
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
            />

            <div className="mt-4 max-w-[700px] text-center text-[13.5px] text-[#1f2536]/90 font-normal">
              {renderFormattedBody(p.body)}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] tracking-wide text-[#1f2536]/80">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <strong className="font-semibold text-[#1f2536]">
                  {p.period}
                </strong>
              </p>
            )}
          </div>

          {/* Signatures + Footer */}
          <div className="w-full mt-auto">
            <div className="grid grid-cols-2 gap-8 items-end">
              <SignatureBlock
                align="left"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="right"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>

            <div className="mt-4 pt-2.5 border-t border-[#1f2536]/12">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ClassicTemplate.displayName = "ClassicTemplate";

/* ────────────────────────────────────────────────────────────────
   2. Modern Template
   ──────────────────────────────────────────────────────────────── */
export const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white flex"
      >
        {/* Left Accent Bars */}
        <div className="w-[36px] h-full bg-[#1f2536] shrink-0" />
        <div className="w-[7px] h-full bg-[#b8862e] shrink-0" />

        {/* Watermark */}
        {p.showWatermark && (
          <div className="absolute inset-0 pl-[44px] flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[48%] max-w-[380px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        {/* Content Area */}
        <div className="relative z-10 flex-1 h-full flex flex-col justify-between px-14 py-9 text-[#1f2536]">
          {/* Header Row */}
          <div className="flex items-start justify-between w-full">
            <div className="flex-1">
              <h1
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[40px] leading-tight font-bold tracking-wider uppercase text-[#1f2536]"
              >
                {p.title}
              </h1>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="w-14 h-[2.5px] bg-[#b8862e]" />
                {p.subtitle && (
                  <SubtitleBadge subtitle={p.subtitle} variant="gold" />
                )}
              </div>
            </div>
            <div className="shrink-0 ml-6">
              <img
                src={p.logo}
                alt="Company logo"
                className="object-contain max-h-[46px] w-auto"
              />
            </div>
          </div>

          {/* Recipient Section */}
          <div className="my-auto flex flex-col justify-center">
            {p.presentationLine && (
              <p className="text-[13px] uppercase tracking-[0.2em] text-[#1f2536]/60 font-semibold mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              align="left"
              width={800}
              font={p.nameFont}
              fontSize={p.nameFontSize}
            />

            <div className="mt-4 max-w-[720px] text-[14px] text-[#1f2536]/90 border-l-[3px] border-[#b8862e] pl-4">
              {renderFormattedBody(p.body)}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] tracking-wide pl-4">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <strong className="font-semibold text-[#b8862e]">
                  {p.period}
                </strong>
              </p>
            )}
          </div>

          {/* Footer Row */}
          <div className="w-full mt-auto">
            <div className="flex justify-between items-end border-t border-[#1f2536]/10 pt-4">
              <div className="flex gap-14">
                <SignatureBlock
                  align="left"
                  signature={p.sig1Img}
                  name={p.sig1Name}
                  role={p.sig1Role}
                  org={p.sig1Org}
                />
                <SignatureBlock
                  align="left"
                  signature={p.sig2Img}
                  name={p.sig2Name}
                  role={p.sig2Role}
                  org={p.sig2Org}
                />
              </div>

              <div className="w-[340px]">
                <MetadataFooter
                  idLabel={p.idLabel}
                  serial={p.serial}
                  dateLabel={p.dateLabel}
                  date={p.date}
                  qrDataUrl={p.qrDataUrl}
                  showQrCode={p.showQrCode}
                  align="right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ModernTemplate.displayName = "ModernTemplate";

/* ────────────────────────────────────────────────────────────────
   3. Minimalist Template
   ──────────────────────────────────────────────────────────────── */
export const MinimalistTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#faf9f5]"
      >
        <div className="absolute inset-[10px] border border-[#e6e1d2] pointer-events-none" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[42%] max-w-[340px] object-contain opacity-[0.04] grayscale"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 py-10 text-[#2d313a]">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[44px] w-auto"
            />
            <h1 className="mt-3 text-[18px] uppercase tracking-[0.3em] font-medium text-[#7a7263]">
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1.5">
                <SubtitleBadge subtitle={p.subtitle} variant="navy" />
              </div>
            )}
          </div>

          {/* Recipient */}
          <div className="my-auto flex flex-col items-center w-full">
            {p.presentationLine && (
              <p className="text-[12.5px] uppercase tracking-[0.25em] text-[#7a7263]/70 font-semibold mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
              lineColor="bg-[#b8862e]"
            />

            <div className="mt-4 max-w-[680px] text-center text-[13.5px] text-[#50545e] font-light leading-relaxed">
              {renderFormattedBody(p.body, "font-semibold text-[#1b1c20]")}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[12px] tracking-widest text-[#7a7263] uppercase">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <strong className="text-[#1b1c20] font-medium">
                  {p.period}
                </strong>
              </p>
            )}
          </div>

          {/* Footer Area */}
          <div className="w-full flex justify-between items-end mt-auto pt-4 border-t border-[#e6e1d2]/70">
            <div className="w-[320px]">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
                align="between"
              />
            </div>

            <div className="flex gap-10">
              <SignatureBlock
                align="center"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="center"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
MinimalistTemplate.displayName = "MinimalistTemplate";

/* ────────────────────────────────────────────────────────────────
   4. Corporate Template
   ──────────────────────────────────────────────────────────────── */
export const CorporateTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute inset-0 border-[20px] border-[#1f2536] pointer-events-none" />
        <div className="absolute inset-[26px] border-[2px] border-[#b8862e] pointer-events-none" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[48%] max-w-[380px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 py-10 text-[#1f2536]">
          {/* Header */}
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[46px] w-auto"
            />
            <div className="mt-2 w-16 h-[2px] bg-[#b8862e]" />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-2 text-[38px] font-bold tracking-wider uppercase text-center text-[#1f2536]"
            >
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1">
                <SubtitleBadge subtitle={p.subtitle} variant="gold" />
              </div>
            )}
          </div>

          {/* Recipient */}
          <div className="my-auto flex flex-col items-center w-full">
            {p.presentationLine && (
              <p className="text-[13px] uppercase tracking-[0.2em] text-[#6b6657] font-semibold">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
              textColor="text-[#1f2536]"
              lineColor="bg-[#b8862e]"
            />

            <div className="mt-4 max-w-[700px] text-center text-[13.5px] text-[#1f2536]/85 leading-relaxed">
              {renderFormattedBody(p.body)}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] tracking-wide text-[#6b6657]">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <strong className="text-[#1f2536] font-semibold">
                  {p.period}
                </strong>
              </p>
            )}
          </div>

          {/* Signatures + Footer */}
          <div className="w-full mt-auto">
            <div className="grid grid-cols-2 gap-8 items-end">
              <SignatureBlock
                align="left"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="right"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>

            <div className="mt-3.5 pt-2 border-t border-[#1f2536]/15">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
CorporateTemplate.displayName = "CorporateTemplate";

/* ────────────────────────────────────────────────────────────────
   5. Elegant Template
   ──────────────────────────────────────────────────────────────── */
export const ElegantTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#fffdfa]"
      >
        <div className="absolute inset-[20px] border border-[#b8862e]/40 pointer-events-none rounded-2xl" />
        <div className="absolute inset-[26px] border border-[#b8862e]/20 pointer-events-none rounded-xl" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[360px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 py-9 text-[#33302a]">
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[46px] w-auto"
            />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-2 text-[38px] font-bold text-[#b8862e] uppercase tracking-wider text-center"
            >
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1">
                <SubtitleBadge subtitle={p.subtitle} variant="gold" />
              </div>
            )}
          </div>

          <div className="my-auto flex flex-col items-center w-full">
            {p.presentationLine && (
              <p className="text-[13px] uppercase tracking-[0.3em] text-[#33302a]/60 font-semibold mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
              lineColor="bg-[#b8862e]"
            />

            <div className="mt-4 max-w-[700px] text-center text-[13.5px] italic text-[#33302a]/85 leading-relaxed">
              {renderFormattedBody(
                p.body,
                "font-semibold not-italic text-[#33302a]",
              )}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[12.5px] tracking-[0.1em] uppercase text-[#33302a]/70">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <strong className="text-[#33302a]">{p.period}</strong>
              </p>
            )}
          </div>

          <div className="w-full flex justify-between items-end mt-auto pt-3 border-t border-[#b8862e]/20">
            <div className="w-[340px]">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
              />
            </div>
            <div className="flex gap-12">
              <SignatureBlock
                align="center"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="center"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ElegantTemplate.displayName = "ElegantTemplate";

/* ────────────────────────────────────────────────────────────────
   6. Geometric Template
   ──────────────────────────────────────────────────────────────── */
export const GeometricTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-gradient-to-bl from-[#b8862e]/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#1f2536]/5 to-transparent pointer-events-none" />
        <div className="absolute top-[18px] left-[18px] bottom-[18px] w-[6px] bg-[#1f2536]" />
        <div className="absolute top-[18px] left-[28px] bottom-[18px] w-[2px] bg-[#b8862e]" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[42%] max-w-[340px] object-contain opacity-[0.03] grayscale"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col pl-[80px] pr-16 py-9 text-[#1f2536] justify-between">
          <div className="flex justify-between items-end w-full border-b border-[#e6e1d2] pb-3.5">
            <div>
              <h1 className="text-[34px] font-bold tracking-tight uppercase text-[#1f2536]">
                {p.title}
              </h1>
              {p.subtitle && (
                <div className="mt-1">
                  <SubtitleBadge subtitle={p.subtitle} variant="gold" />
                </div>
              )}
            </div>
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[44px] w-auto"
            />
          </div>

          <div className="my-auto flex flex-col justify-center">
            {p.presentationLine && (
              <p className="text-[12.5px] font-semibold tracking-[0.2em] uppercase text-[#b8862e] mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              align="left"
              width={800}
              font={p.nameFont}
              fontSize={p.nameFontSize}
            />

            <div className="mt-3.5 relative">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#1f2536]/25" />
              <div className="pl-4 max-w-[750px] text-[13.5px] text-[#1f2536]/85 leading-relaxed">
                {renderFormattedBody(p.body)}
              </div>
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] font-medium tracking-wide">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <span className="font-bold text-[#b8862e]">{p.period}</span>
              </p>
            )}
          </div>

          <div className="w-full flex justify-between items-end mt-auto border-t border-[#e6e1d2] pt-3.5">
            <div className="flex gap-14">
              <SignatureBlock
                align="left"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="left"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>
            <div className="w-[340px]">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
                align="right"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
GeometricTemplate.displayName = "GeometricTemplate";

/* ────────────────────────────────────────────────────────────────
   7. Premium Dark Template
   ──────────────────────────────────────────────────────────────── */
export const PremiumDarkTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#1a1f2e]"
      >
        <div className="absolute inset-[18px] border-[2px] border-[#b8862e]/40 pointer-events-none" />
        <div className="absolute inset-[24px] border border-[#b8862e]/20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#b8862e]/5 rounded-full blur-[90px] pointer-events-none" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[48%] max-w-[380px] object-contain opacity-[0.07]"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 py-9 text-[#f8f9fa]">
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[46px] w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <div className="mt-2 w-16 h-px bg-[#b8862e]" />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-2 text-[38px] font-semibold text-center tracking-[0.15em] text-[#b8862e] uppercase"
            >
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1">
                <SubtitleBadge subtitle={p.subtitle} variant="dark" />
              </div>
            )}
          </div>

          <div className="my-auto flex flex-col items-center w-full">
            {p.presentationLine && (
              <p className="text-[13px] uppercase tracking-[0.3em] text-[#f8f9fa]/50 mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
              textColor="text-white"
              lineColor="bg-[#b8862e]"
            />

            <div className="mt-4 max-w-[700px] text-center text-[13.5px] text-[#f8f9fa]/75 leading-relaxed">
              {renderFormattedBody(p.body, "font-semibold text-white")}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] tracking-wide text-[#f8f9fa]/60">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <span className="text-[#b8862e] font-medium">{p.period}</span>
              </p>
            )}
          </div>

          <div className="w-full mt-auto">
            <div className="flex justify-between items-end border-t border-[#f8f9fa]/10 pt-3">
              <div className="w-[340px]">
                <MetadataFooter
                  idLabel={p.idLabel}
                  serial={p.serial}
                  dateLabel={p.dateLabel}
                  date={p.date}
                  qrDataUrl={p.qrDataUrl}
                  showQrCode={p.showQrCode}
                  dark
                />
              </div>

              <div className="flex gap-14">
                <SignatureBlock
                  align="center"
                  signature={p.sig1Img}
                  name={p.sig1Name}
                  role={p.sig1Role}
                  org={p.sig1Org}
                  dark
                />
                <SignatureBlock
                  align="center"
                  signature={p.sig2Img}
                  name={p.sig2Name}
                  role={p.sig2Role}
                  org={p.sig2Org}
                  dark
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
PremiumDarkTemplate.displayName = "PremiumDarkTemplate";

/* ────────────────────────────────────────────────────────────────
   8. Academic Template
   ──────────────────────────────────────────────────────────────── */
export const AcademicTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-[#faf8f5]"
      >
        <div className="absolute inset-[16px] border-[5px] border-double border-[#1f2536] pointer-events-none" />
        <div className="absolute inset-[24px] border border-[#1f2536]/30 pointer-events-none" />

        {/* Corner Accents */}
        <div className="absolute top-[16px] left-[16px] w-7 h-7 border-r-[2.5px] border-b-[2.5px] border-[#b8862e] pointer-events-none" />
        <div className="absolute top-[16px] right-[16px] w-7 h-7 border-l-[2.5px] border-b-[2.5px] border-[#b8862e] pointer-events-none" />
        <div className="absolute bottom-[16px] left-[16px] w-7 h-7 border-r-[2.5px] border-t-[2.5px] border-[#b8862e] pointer-events-none" />
        <div className="absolute bottom-[16px] right-[16px] w-7 h-7 border-l-[2.5px] border-t-[2.5px] border-[#b8862e] pointer-events-none" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[45%] max-w-[360px] object-contain opacity-[0.06] sepia-[0.3]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between px-16 py-9 text-[#1f2536]">
          <div className="flex flex-col items-center">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[46px] w-auto"
            />
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-2 text-[40px] font-bold text-center tracking-wide text-[#1f2536] uppercase"
            >
              {p.title}
            </h1>
            {p.subtitle && (
              <div className="mt-1">
                <SubtitleBadge subtitle={p.subtitle} variant="gold" />
              </div>
            )}
          </div>

          <div className="my-auto flex flex-col items-center w-full">
            {p.presentationLine && (
              <p
                className="text-[14.5px] font-medium italic text-[#1f2536]/70"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              font={p.nameFont}
              fontSize={p.nameFontSize}
              lineColor="bg-[#b8862e]"
            />

            <div className="mt-4 max-w-[720px] text-center text-[13.5px] text-[#1f2536]/90 font-medium leading-relaxed">
              {renderFormattedBody(p.body)}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13.5px] font-semibold text-[#1f2536]">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <span className="text-[#b8862e]">{p.period}</span>
              </p>
            )}
          </div>

          <div className="w-full flex justify-between items-end mt-auto pt-3 border-t border-[#1f2536]/15">
            <div className="w-[340px]">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
              />
            </div>

            <div className="flex gap-14">
              <SignatureBlock
                align="center"
                signature={p.sig1Img}
                name={p.sig1Name}
                role={p.sig1Role}
                org={p.sig1Org}
              />
              <SignatureBlock
                align="center"
                signature={p.sig2Img}
                name={p.sig2Name}
                role={p.sig2Role}
                org={p.sig2Org}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
AcademicTemplate.displayName = "AcademicTemplate";

/* ────────────────────────────────────────────────────────────────
   9. Creative Template
   ──────────────────────────────────────────────────────────────── */
export const CreativeTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f6f2e7] pointer-events-none" />
        <div className="absolute top-[30px] right-[30px] bottom-[30px] left-[30px] border-2 border-[#1f2536] pointer-events-none z-[2]" />
        <div className="absolute top-[24px] right-[38px] bottom-[38px] left-[24px] border-2 border-[#b8862e] pointer-events-none z-[2]" />

        {p.showWatermark && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1] pr-[33%]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[50%] max-w-[360px] object-contain opacity-[0.05]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-between px-16 py-10 text-[#1f2536]">
          <div className="w-[62%] pr-6">
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[46px] w-auto mb-4"
            />
            <h1 className="text-[38px] font-black tracking-tight leading-none text-[#1f2536] uppercase">
              {p.title}
            </h1>
            <div className="flex items-center gap-3 mt-2 mb-4">
              <div className="w-12 h-1.5 bg-[#b8862e]" />
              {p.subtitle && (
                <SubtitleBadge subtitle={p.subtitle} variant="gold" />
              )}
            </div>

            {p.presentationLine && (
              <p className="text-[12.5px] font-bold tracking-[0.2em] uppercase text-[#1f2536]/50 mb-1">
                {p.presentationLine}
              </p>
            )}
            <RecipientName
              name={p.name}
              align="left"
              width={640}
              font={p.nameFont}
              fontSize={p.nameFontSize}
            />

            <div className="mt-4 text-[13.5px] text-[#1f2536]/80 font-medium leading-relaxed">
              {renderFormattedBody(p.body)}
            </div>

            {p.showPeriod && (
              <p className="mt-3 text-[13px] font-bold text-[#1f2536]">
                {formatPeriodLabel(p.periodLabel)}{" "}
                <span className="text-[#b8862e]">{p.period}</span>
              </p>
            )}
          </div>

          <div className="absolute right-[56px] bottom-[48px] w-[26%] flex flex-col gap-6">
            <SignatureBlock
              align="right"
              signature={p.sig1Img}
              name={p.sig1Name}
              role={p.sig1Role}
              org={p.sig1Org}
            />
            <SignatureBlock
              align="right"
              signature={p.sig2Img}
              name={p.sig2Name}
              role={p.sig2Role}
              org={p.sig2Org}
            />

            <div className="pt-2 border-t-2 border-[#b8862e]">
              <MetadataFooter
                idLabel={p.idLabel}
                serial={p.serial}
                dateLabel={p.dateLabel}
                date={p.date}
                qrDataUrl={p.qrDataUrl}
                showQrCode={p.showQrCode}
                align="right"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
CreativeTemplate.displayName = "CreativeTemplate";

/* ────────────────────────────────────────────────────────────────
   10. Executive Template
   ──────────────────────────────────────────────────────────────── */
export const ExecutiveTemplate = forwardRef<HTMLDivElement, TemplateProps>(
  (rawProps, ref) => {
    const p = normalizeProps(rawProps);
    return (
      <div
        ref={ref}
        className="relative w-full max-w-[1100px] aspect-[1.414/1] shadow-2xl overflow-hidden bg-white"
      >
        <div className="absolute top-0 left-0 w-full h-[140px] bg-[#1f2536] pointer-events-none" />
        <div className="absolute top-[136px] left-0 w-full h-[4px] bg-[#b8862e] pointer-events-none" />

        {p.showWatermark && (
          <div className="absolute inset-0 top-[140px] flex items-center justify-center pointer-events-none z-[1]">
            <img
              src={snrWatermark.src}
              alt="watermark"
              className="w-[44%] max-w-[360px] object-contain opacity-[0.04]"
            />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col items-center justify-between pb-8">
          {/* Header */}
          <div className="w-full h-[140px] flex justify-between items-center px-16">
            <div>
              <h1
                style={{ fontFamily: "var(--font-cormorant)" }}
                className="text-[38px] font-semibold tracking-wider text-white uppercase"
              >
                {p.title}
              </h1>
              {p.subtitle && (
                <div className="mt-1">
                  <SubtitleBadge subtitle={p.subtitle} variant="dark" />
                </div>
              )}
            </div>
            <img
              src={p.logo}
              alt="Company logo"
              className="object-contain max-h-[50px] w-auto"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>

          {/* Body */}
          <div className="flex-1 w-full px-16 pt-5 flex flex-col items-center justify-between text-[#1f2536]">
            <div className="my-auto flex flex-col items-center w-full">
              {p.presentationLine && (
                <p className="text-[13px] font-bold tracking-[0.2em] uppercase text-[#1f2536]/60 mb-1">
                  {p.presentationLine}
                </p>
              )}
              <RecipientName
                name={p.name}
                font={p.nameFont}
                fontSize={p.nameFontSize}
                lineColor="bg-[#b8862e]"
              />

              <div className="mt-4 max-w-[740px] text-center text-[14px] text-[#1f2536]/85 font-medium leading-relaxed">
                {renderFormattedBody(p.body)}
              </div>

              {p.showPeriod && (
                <p className="mt-3 text-[13.5px] font-bold tracking-wide">
                  {formatPeriodLabel(p.periodLabel)}{" "}
                  <span className="text-[#b8862e]">{p.period}</span>
                </p>
              )}
            </div>

            <div className="w-full flex justify-between items-end mt-auto border-t border-[#1f2536]/15 pt-3">
              <div className="flex gap-14">
                <SignatureBlock
                  align="left"
                  signature={p.sig1Img}
                  name={p.sig1Name}
                  role={p.sig1Role}
                  org={p.sig1Org}
                />
                <SignatureBlock
                  align="left"
                  signature={p.sig2Img}
                  name={p.sig2Name}
                  role={p.sig2Role}
                  org={p.sig2Org}
                />
              </div>

              <div className="w-[360px]">
                <MetadataFooter
                  idLabel={p.idLabel}
                  serial={p.serial}
                  dateLabel={p.dateLabel}
                  date={p.date}
                  qrDataUrl={p.qrDataUrl}
                  showQrCode={p.showQrCode}
                  align="right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ExecutiveTemplate.displayName = "ExecutiveTemplate";
