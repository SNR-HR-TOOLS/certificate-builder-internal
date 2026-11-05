"use client";

import ceoSign from "@/assets/ceo-sign-final-removebg-preview.png";
import hrSign from "@/assets/hr-sign-final-removebg-preview.png";
import snrLogo from "@/assets/snr-logo-without-bg.png";
import {
  AcademicTemplate,
  ClassicTemplate,
  CorporateTemplate,
  CreativeTemplate,
  ElegantTemplate,
  ExecutiveTemplate,
  GeometricTemplate,
  MinimalistTemplate,
  ModernTemplate,
  PremiumDarkTemplate,
} from "@/components/templates/CertificateTemplates";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import {
  Award,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FileCheck2,
  FileDown,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  LogOut,
  PenLine,
  Printer,
  QrCode,
  RefreshCw,
  Sparkles,
  Type,
  Upload,
  UserCheck,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import Link from "next/link";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

const TEMPLATES = {
  Classic: ClassicTemplate,
  Modern: ModernTemplate,
  Minimalist: MinimalistTemplate,
  Corporate: CorporateTemplate,
  Elegant: ElegantTemplate,
  Geometric: GeometricTemplate,
  PremiumDark: PremiumDarkTemplate,
  Academic: AcademicTemplate,
  Creative: CreativeTemplate,
  Executive: ExecutiveTemplate,
} as const;

type TemplateKey = keyof typeof TEMPLATES;

/* ─── Certificate Presets ──────────────────────────────────────── */
interface Preset {
  id: string;
  name: string;
  categoryBadge: string;
  badgeStyle: string;
  description: string;
  title: string;
  subtitle: string;
  presentationLine: string;
  recipientName: string;
  nameFont: "script" | "serif" | "sans";
  body: string;
  periodLabel: string;
  period: string;
  showPeriod: boolean;
  sig1Name: string;
  sig1Role: string;
  sig1Org: string;
  sig2Name: string;
  sig2Role: string;
  sig2Org: string;
  serial: string;
  date: string;
  template: TemplateKey;
}

const PRESETS: Preset[] = [
  {
    id: "cmmi-level-5",
    name: "CMMI Level 5 Recognition",
    categoryBadge: "Primary Preset",
    badgeStyle: "bg-[#b8862e]/15 text-[#b8862e] border-[#b8862e]/40",
    description:
      "SNR Edatas CMMI Level 5 Program Recognition of Completion Certificate",
    title: "RECOGNITION OF COMPLETION",
    subtitle: "CMMI LEVEL 5",
    presentationLine: "This certificate is proudly presented to",
    recipientName: "D. Karthik",
    nameFont: "script",
    body: "In recognition of successful completion in the\nCMMI Level 5 Program\nConducted by SNR Edatas Private Limited, acknowledging their commitment to understanding process excellence, continuous improvement and organizational maturity practices.",
    periodLabel: "Training Period",
    period: "01 May 2026 – 15 May 2026",
    showPeriod: true,
    sig1Name: "Authorized Signatory",
    sig1Role: "Authorized Signatory",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Managing Director",
    sig2Role: "SNR Edatas Private Limited",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-CMMI-2026-0842",
    date: "15/05/2026",
    template: "Classic",
  },
  {
    id: "internship-completion",
    name: "Internship Completion",
    categoryBadge: "Internship",
    badgeStyle: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Standard SNR Edatas internship completion certificate",
    title: "Certificate of Internship",
    subtitle: "SNR EDATAS PRIVATE LIMITED",
    presentationLine: "This is to certify that",
    recipientName: "D. Karthik",
    nameFont: "script",
    body: "This is to certify that D.Karthik has successfully completed an internship at SNR Edatas.\nDuring this period, his/her conduct and performance were found to be satisfactory.\nWe wish him/her all the best for future opportunities.",
    periodLabel: "Internship Period",
    period: "1st April 2026 to 31st May 2026",
    showPeriod: true,
    sig1Name: "G. Mallikarjuna",
    sig1Role: "Chief Executive Officer",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Anuradha.A.J",
    sig2Role: "Human Resource and Management",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-INT-2026-3478",
    date: "31/05/2026",
    template: "Classic",
  },
  {
    id: "training-program",
    name: "Training & Awareness",
    categoryBadge: "Training",
    badgeStyle: "bg-emerald-100 text-emerald-800 border-emerald-200",
    description:
      "For professional workshops, corporate seminars, and technical training",
    title: "CERTIFICATE OF COMPLETION",
    subtitle: "PROCESS EXCELLENCE & QUALITY",
    presentationLine: "This certificate is proudly presented to",
    recipientName: "A. Suresh Kumar",
    nameFont: "serif",
    body: "In recognition of active participation and successful completion of the Process Excellence & Organizational Maturity Training Program organized by SNR Edatas Private Limited, demonstrating high competence and commitment to quality execution.",
    periodLabel: "Training Period",
    period: "10 April 2026 – 20 April 2026",
    showPeriod: true,
    sig1Name: "Authorized Signatory",
    sig1Role: "Authorized Signatory",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Managing Director",
    sig2Role: "SNR Edatas Private Limited",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-TRN-2026-1120",
    date: "20/04/2026",
    template: "Corporate",
  },
  {
    id: "excellence-award",
    name: "Certificate of Excellence",
    categoryBadge: "Excellence",
    badgeStyle: "bg-purple-100 text-purple-800 border-purple-200",
    description:
      "Honoring outstanding performance, quality delivery, and excellence",
    title: "CERTIFICATE OF EXCELLENCE",
    subtitle: "CONTINUOUS IMPROVEMENT",
    presentationLine: "Conferred with highest distinction upon",
    recipientName: "R. Ananya Rao",
    nameFont: "script",
    body: "For demonstrating exceptional capability, diligence, and commendable dedication in achieving highest organizational quality benchmarks and process compliance at SNR Edatas Private Limited.",
    periodLabel: "Assessment Period",
    period: "Q1 2026",
    showPeriod: true,
    sig1Name: "Authorized Signatory",
    sig1Role: "Authorized Signatory",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Managing Director",
    sig2Role: "SNR Edatas Private Limited",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-EXC-2026-0045",
    date: "30/04/2026",
    template: "Executive",
  },
  {
    id: "appreciation",
    name: "Certificate of Appreciation",
    categoryBadge: "Appreciation",
    badgeStyle: "bg-rose-100 text-rose-800 border-rose-200",
    description: "Recognition for valuable contributions and dedication",
    title: "CERTIFICATE OF APPRECIATION",
    subtitle: "ORGANIZATIONAL MATURITY",
    presentationLine: "Awarded with gratitude to",
    recipientName: "M. Sneha Reddy",
    nameFont: "serif",
    body: "In sincere gratitude for valuable contributions, dedication, and exemplary commitment during the corporate development initiatives at SNR Edatas Private Limited.",
    periodLabel: "Recognition Year",
    period: "2026",
    showPeriod: true,
    sig1Name: "Authorized Signatory",
    sig1Role: "Authorized Signatory",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Managing Director",
    sig2Role: "SNR Edatas Private Limited",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-APP-2026-0198",
    date: "05/05/2026",
    template: "Elegant",
  },
  {
    id: "custom-certification",
    name: "Custom / Blank (Any Certificate)",
    categoryBadge: "Universal",
    badgeStyle: "bg-slate-100 text-slate-800 border-slate-200",
    description:
      "Fully configurable for ANY certification, diploma, workshop, or award",
    title: "RECOGNITION OF COMPLETION",
    subtitle: "SPECIAL CERTIFICATION",
    presentationLine: "This certificate is proudly presented to",
    recipientName: "Participant Name",
    nameFont: "script",
    body: "In recognition of successful participation in the certified program organized by SNR Edatas Private Limited, acknowledging their commitment and excellence.",
    periodLabel: "Duration",
    period: "01 May 2026 – 15 May 2026",
    showPeriod: true,
    sig1Name: "Authorized Signatory",
    sig1Role: "Authorized Signatory",
    sig1Org: "SNR Edatas Private Limited",
    sig2Name: "Managing Director",
    sig2Role: "SNR Edatas Private Limited",
    sig2Org: "SNR Edatas Private Limited",
    serial: "SNR-CERT-2026-001",
    date: "15/05/2026",
    template: "Classic",
  },
];

/* ─── Main Builder Page ────────────────────────────────────────── */
export default function BuilderPage() {
  const defaultPreset = PRESETS[0]; // CMMI Level 5

  // Primary Certificate State
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    defaultPreset.id,
  );
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>(
    defaultPreset.template,
  );
  const [logo, setLogo] = useState<string>(snrLogo.src);
  const [organization, setOrganization] = useState<string>(
    "SNR Edatas Private Limited",
  );
  const [title, setTitle] = useState(defaultPreset.title);
  const [subtitle, setSubtitle] = useState(defaultPreset.subtitle);
  const [presentationLine, setPresentationLine] = useState(
    defaultPreset.presentationLine,
  );
  const [name, setName] = useState(defaultPreset.recipientName);
  const [nameFont, setNameFont] = useState<"script" | "serif" | "sans">(
    defaultPreset.nameFont,
  );
  const [nameFontSize, setNameFontSize] = useState<number>(54);
  const [body, setBody] = useState(defaultPreset.body);

  // Period
  const [showPeriod, setShowPeriod] = useState(defaultPreset.showPeriod);
  const [periodLabel, setPeriodLabel] = useState(defaultPreset.periodLabel);
  const [period, setPeriod] = useState(defaultPreset.period);

  // Left Signatory (Sig 1)
  const [sig1Name, setSig1Name] = useState(defaultPreset.sig1Name);
  const [sig1Role, setSig1Role] = useState(defaultPreset.sig1Role);
  const [sig1Org, setSig1Org] = useState(defaultPreset.sig1Org);
  const [sig1Img, setSig1Img] = useState<string>(ceoSign.src);

  // Right Signatory (Sig 2)
  const [sig2Name, setSig2Name] = useState(defaultPreset.sig2Name);
  const [sig2Role, setSig2Role] = useState(defaultPreset.sig2Role);
  const [sig2Org, setSig2Org] = useState(defaultPreset.sig2Org);
  const [sig2Img, setSig2Img] = useState<string>(hrSign.src);

  // Metadata
  const [serial, setSerial] = useState(defaultPreset.serial);
  const [date, setDate] = useState(defaultPreset.date);
  const [showWatermark, setShowWatermark] = useState(true);
  const [showQrCode, setShowQrCode] = useState(true);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  // Canvas View Scale
  const [zoomScale, setZoomScale] = useState<number>(1);

  // UI Tabs
  const [activeTab, setActiveTab] = useState<
    "presets" | "templates" | "content" | "signatories" | "branding" | "batch"
  >("presets");

  // Multi-Participant / Batch Mode
  const [batchRawNames, setBatchRawNames] = useState(
    "D. Karthik\nA. Sharma\nP. Verma\nR. Ananya\nM. Suresh",
  );
  const [batchIdPrefix, setBatchIdPrefix] = useState("SNR-CMMI-2026-");
  const [batchStartNum, setBatchStartNum] = useState(842);
  const [batchIndex, setBatchIndex] = useState(0);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 });

  // Export State
  const certRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load Preset
  const applyPreset = (preset: Preset) => {
    setSelectedPresetId(preset.id);
    setSelectedTemplate(preset.template);
    setTitle(preset.title);
    setSubtitle(preset.subtitle);
    setPresentationLine(preset.presentationLine);
    setName(preset.recipientName);
    setNameFont(preset.nameFont);
    setNameFontSize(
      preset.nameFont === "script" ? 54 : preset.nameFont === "serif" ? 44 : 38,
    );
    setBody(preset.body);
    setShowPeriod(preset.showPeriod);
    setPeriodLabel(preset.periodLabel);
    setPeriod(preset.period);
    setSig1Name(preset.sig1Name);
    setSig1Role(preset.sig1Role);
    setSig1Org(preset.sig1Org);
    setSig2Name(preset.sig2Name);
    setSig2Role(preset.sig2Role);
    setSig2Org(preset.sig2Org);
    setSerial(preset.serial);
    setDate(preset.date);
  };

  // Generate QR Code with verification URL
  useEffect(() => {
    let isCancelled = false;
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const params = new URLSearchParams({
      serial,
      name,
      title,
      subtitle,
      date,
      period,
      periodLabel,
      sig1Name,
      sig1Role,
      sig2Name,
      sig2Role,
      org: organization,
    });
    const verifyUrl = `${origin}/verify?${params.toString()}`;

    QRCode.toDataURL(verifyUrl, {
      width: 140,
      margin: 1,
      color: { dark: "#1f2536", light: "#ffffff" },
    })
      .then((url) => {
        if (!isCancelled) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error("QR Code generation error:", err);
      });

    return () => {
      isCancelled = true;
    };
  }, [
    serial,
    name,
    title,
    subtitle,
    date,
    period,
    periodLabel,
    sig1Name,
    sig1Role,
    sig2Name,
    sig2Role,
    organization,
  ]);

  // Export as PNG
  const exportImage = async (customName?: string, customSerial?: string) => {
    if (!certRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2.5,
        backgroundColor: "#fdfbf7",
      });

      const participantName = customName || name;
      const idStr = customSerial || serial;
      const sanitizedName = participantName
        .trim()
        .replace(/[^a-zA-Z0-9.\- ]/g, "")
        .replace(/\s+/g, "_");
      const fileName = `${sanitizedName}_${idStr || "certificate"}`;

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  // Export as PDF
  const exportPdf = async (customName?: string, customSerial?: string) => {
    if (!certRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(certRef.current, {
        pixelRatio: 2.5,
        backgroundColor: "#fdfbf7",
      });

      const participantName = customName || name;
      const idStr = customSerial || serial;
      const sanitizedName = participantName
        .trim()
        .replace(/[^a-zA-Z0-9.\- ]/g, "")
        .replace(/\s+/g, "_");
      const fileName = `${sanitizedName}_${idStr || "certificate"}`;

      const width = certRef.current.offsetWidth;
      const height = certRef.current.offsetHeight;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [width, height],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
      pdf.save(`${fileName}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  // System Print
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Copy Verification Link
  const handleCopyVerifyLink = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams({
        serial,
        name,
        title,
        subtitle,
        date,
        period,
        periodLabel,
        sig1Name,
        sig1Role,
        sig2Name,
        sig2Role,
        org: organization,
      });
      const url = `${window.location.origin}/verify?${params.toString()}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  // Auto Generate Serial ID
  const handleRandomizeId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const prefix = subtitle
      ? `SNR-${subtitle.replace(/[^A-Za-z0-9]/g, "").slice(0, 4).toUpperCase()}-2026-`
      : "SNR-CERT-2026-";
    setSerial(`${prefix}${randomNum}`);
  };

  // Set Date to Today
  const handleSetToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    setDate(`${dd}/${mm}/${yyyy}`);
  };

  // Parse Batch Participants
  const batchParticipants = batchRawNames
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean)
    .map((n, idx) => ({
      index: idx,
      name: n,
      serial: `${batchIdPrefix}${String(batchStartNum + idx).padStart(4, "0")}`,
    }));

  // Batch Export Loop
  const handleBatchExport = async () => {
    if (batchParticipants.length === 0 || !certRef.current) return;
    setIsBatchGenerating(true);
    setBatchProgress({ current: 0, total: batchParticipants.length });

    try {
      for (let i = 0; i < batchParticipants.length; i++) {
        const p = batchParticipants[i];
        setBatchIndex(i);
        setName(p.name);
        setSerial(p.serial);
        setBatchProgress({ current: i + 1, total: batchParticipants.length });

        // Small delay to allow DOM render
        await new Promise((resolve) => setTimeout(resolve, 450));
        await exportPdf(p.name, p.serial);
      }
    } finally {
      setIsBatchGenerating(false);
    }
  };

  const ActiveTemplate = TEMPLATES[selectedTemplate];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#e8e6df]">
      {/* ── Top Header Navigation ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#1f2536] text-white border-b border-[#2d364e] px-4 sm:px-8 py-3.5 shadow-md print:hidden">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <img
              src={snrLogo.src}
              alt="SNR Edatas Logo"
              className="h-9 w-auto object-contain brightness-0 invert"
            />
            <div className="border-l border-white/20 pl-3">
              <h1 className="text-base font-bold tracking-wide flex items-center gap-2">
                Certificate Studio
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#b8862e] text-white tracking-wider">
                  Enterprise
                </span>
              </h1>
              <p className="text-[11px] text-white/60">
                SNR Edatas Private Limited • CMMI Level 5 &amp; Universal
                Certification
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleCopyVerifyLink}
              title="Copy public verification link"
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors border border-white/10"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#b8a98a]" />
                  <span>Verification Link</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              title="Print certificate"
              className="px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors border border-white/10"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={() => exportImage()}
              disabled={isExporting}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#2c3450] text-white hover:bg-[#394366] transition-colors border border-white/15 flex items-center gap-1.5 ${
                isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PNG</span>
            </button>

            <button
              onClick={() => exportPdf()}
              disabled={isExporting}
              className={`px-4 py-1.5 text-xs font-bold rounded-md bg-[#b8862e] text-white hover:bg-[#a17527] shadow-sm transition-colors flex items-center gap-1.5 ${
                isExporting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>

            <Link
              href="/"
              title="Sign Out"
              className="p-1.5 rounded-md hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Studio Body ──────────────────────────────────────── */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">
        {/* Preset Selector Banner */}
        <section className="bg-[#fdfbf7] rounded-xl border border-[#d8d4c8] p-4 shadow-sm print:hidden">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#b8862e]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1f2536]">
                Instant Certification Presets
              </h2>
            </div>
            <span className="text-xs text-[#6b6657]">
              Switch templates with pre-configured text, roles &amp; layouts
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PRESETS.map((preset) => {
              const isSelected = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => applyPreset(preset)}
                  className={`relative p-2.5 rounded-lg border text-left transition-all ${
                    isSelected
                      ? "border-[#b8862e] bg-[#f9f5ec] shadow-sm ring-1 ring-[#b8862e]"
                      : "border-[#d8d4c8] bg-white hover:border-[#b8862e]/60 hover:bg-[#faf8f2]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${preset.badgeStyle}`}
                    >
                      {preset.categoryBadge}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b8862e]" />
                    )}
                  </div>
                  <div className="font-bold text-[12px] text-[#1f2536] leading-tight line-clamp-1">
                    {preset.name}
                  </div>
                  <div className="text-[10px] text-[#6b6657] mt-1 line-clamp-1">
                    {preset.subtitle || preset.title}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Certificate Preview Stage ───────────────────────────── */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Canvas Controls Toolbar */}
          <div className="w-full max-w-[1100px] flex items-center justify-between mb-2 text-xs text-[#6b6657] px-1 print:hidden">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#1f2536] flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#b8862e]" />
                Live Preview
              </span>
              <span className="hidden sm:inline text-white/50">•</span>
              <span className="hidden sm:inline">
                Template:{" "}
                <strong className="text-[#1f2536] font-medium">
                  {selectedTemplate}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#6b6657]">Zoom:</span>
              <button
                onClick={() => setZoomScale((s) => Math.max(0.65, s - 0.1))}
                className="p-1 rounded bg-white border border-[#d8d4c8] hover:bg-[#f6f2e7]"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoomScale(1)}
                className="px-2 py-0.5 text-[11px] font-medium rounded bg-white border border-[#d8d4c8] hover:bg-[#f6f2e7]"
              >
                {Math.round(zoomScale * 100)}%
              </button>
              <button
                onClick={() => setZoomScale((s) => Math.min(1.25, s + 0.1))}
                className="p-1 rounded bg-white border border-[#d8d4c8] hover:bg-[#f6f2e7]"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Certificate Container with Zoom Scaling */}
          <div
            className="w-full max-w-[1100px] flex justify-center overflow-x-auto pb-4 transition-transform duration-150 origin-top"
            style={{ transform: `scale(${zoomScale})` }}
          >
            <ActiveTemplate
              ref={certRef}
              logo={logo}
              organization={organization}
              title={title}
              subtitle={subtitle}
              presentationLine={presentationLine}
              name={name}
              nameFont={nameFont}
              nameFontSize={nameFontSize}
              body={body}
              periodLabel={periodLabel}
              period={period}
              showPeriod={showPeriod}
              sig1Name={sig1Name}
              sig1Role={sig1Role}
              sig1Org={sig1Org}
              sig1Img={sig1Img}
              sig2Name={sig2Name}
              sig2Role={sig2Role}
              sig2Org={sig2Org}
              sig2Img={sig2Img}
              serial={serial}
              date={date}
              showWatermark={showWatermark}
              showQrCode={showQrCode}
              qrDataUrl={qrDataUrl}
            />
          </div>

          {/* ── Quick Edit Key Details Bar (Instant Access) ─────────── */}
          <div className="w-full max-w-[1100px] mt-3 bg-white p-4 rounded-xl border border-[#d8d4c8] shadow-sm flex flex-col gap-3 print:hidden">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <PenLine className="w-4 h-4 text-[#b8862e]" />
                <span className="font-bold text-xs uppercase tracking-wider text-[#1f2536]">
                  Quick Edit Essential Fields
                </span>
              </div>
              <span className="text-[11px] text-[#6b6657]">
                Edit recipient, change &apos;Training Period&apos; name, or
                adjust dates directly
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Certificate Title */}
              <div>
                <label className="block text-[10px] font-bold text-[#6b6657] uppercase tracking-wider mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-[#d8d4c8] rounded-md px-3 py-1.5 text-xs font-semibold text-[#1f2536] focus:ring-2 focus:ring-[#b8862e] outline-none bg-[#fdfbf7]"
                  placeholder="RECOGNITION OF COMPLETION"
                />
              </div>

              {/* Recipient Name */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[10px] font-bold text-[#6b6657] uppercase tracking-wider">
                    Recipient Name
                  </label>
                  <div className="flex items-center gap-1 text-[10px] text-[#6b6657]">
                    <span>Size:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setNameFontSize((s) => Math.max(28, s - 2))
                      }
                      className="w-4 h-4 rounded bg-[#f6f2e7] hover:bg-[#ece6d5] border border-[#d8d4c8] flex items-center justify-center font-bold"
                      title="Decrease font size"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-[#1f2536] w-6 text-center">
                      {nameFontSize}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setNameFontSize((s) => Math.min(76, s + 2))
                      }
                      className="w-4 h-4 rounded bg-[#f6f2e7] hover:bg-[#ece6d5] border border-[#d8d4c8] flex items-center justify-center font-bold"
                      title="Increase font size"
                    >
                      +
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#d8d4c8] rounded-md px-3 py-1.5 text-xs font-semibold text-[#1f2536] focus:ring-2 focus:ring-[#b8862e] outline-none bg-[#fdfbf7]"
                  placeholder="D. Karthik"
                />
              </div>

              {/* Period Field Name (Label) */}
              <div>
                <label className="block text-[10px] font-bold text-[#6b6657] uppercase tracking-wider mb-1">
                  Period Field Name
                </label>
                <input
                  type="text"
                  value={periodLabel}
                  onChange={(e) => setPeriodLabel(e.target.value)}
                  className="w-full border border-[#d8d4c8] rounded-md px-3 py-1.5 text-xs font-semibold text-[#1f2536] focus:ring-2 focus:ring-[#b8862e] outline-none bg-[#fdfbf7]"
                  placeholder="e.g. Training Period, Program Duration"
                />
              </div>

              {/* Period Dates */}
              <div>
                <label className="block text-[10px] font-bold text-[#6b6657] uppercase tracking-wider mb-1">
                  Period Dates
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full border border-[#d8d4c8] rounded-md px-3 py-1.5 text-xs font-semibold text-[#1f2536] focus:ring-2 focus:ring-[#b8862e] outline-none bg-[#fdfbf7]"
                  placeholder="e.g. 01 May 2026 – 15 May 2026"
                />
              </div>

              {/* Certificate ID */}
              <div>
                <label className="block text-[10px] font-bold text-[#6b6657] uppercase tracking-wider mb-1">
                  Certificate ID
                </label>
                <input
                  type="text"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  className="w-full border border-[#d8d4c8] rounded-md px-3 py-1.5 text-xs font-mono font-semibold text-[#1f2536] focus:ring-2 focus:ring-[#b8862e] outline-none bg-[#fdfbf7]"
                  placeholder="SNR-CMMI-2026-0842"
                />
              </div>
            </div>

            {/* Quick Suggestions for Certificate Title */}
            <div className="pt-2 border-t border-[#e6e1d2] flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6657] shrink-0">
                Title Presets:
              </span>
              {[
                "RECOGNITION OF COMPLETION",
                "CERTIFICATE OF PARTICIPATION",
                "CERTIFICATE OF COMPLETION",
                "CERTIFICATE OF EXCELLENCE",
                "CERTIFICATE OF APPRECIATION",
              ].map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setTitle(sug)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors border ${
                    title.trim() === sug
                      ? "bg-[#1f2536] text-white border-[#1f2536]"
                      : "bg-[#f6f2e7] text-[#1f2536] border-[#d8d4c8] hover:border-[#b8862e]"
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Quick Suggestions for Period Label */}
            <div className="pt-2 border-t border-[#e6e1d2] flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6b6657] shrink-0">
                Replace &apos;Training Period&apos; with:
              </span>
              {[
                "Training Period",
                "Program Duration",
                "Awareness Period",
                "Training & Awareness Period",
                "Program Period",
                "Assessment Period",
                "Period of Participation",
                "Conducted On",
              ].map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setPeriodLabel(sug)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors border ${
                    periodLabel.trim() === sug
                      ? "bg-[#1f2536] text-white border-[#1f2536]"
                      : "bg-[#f6f2e7] text-[#1f2536] border-[#d8d4c8] hover:border-[#b8862e]"
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Customization Studio Panel ───────────────────────────── */}
        <div className="w-full bg-[#fdfbf7] rounded-xl shadow-lg border border-[#d8d4c8] overflow-hidden print:hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#d8d4c8] bg-[#f6f2e7] overflow-x-auto">
            <TabButton
              active={activeTab === "presets"}
              onClick={() => setActiveTab("presets")}
              icon={<Sparkles className="w-4 h-4" />}
              label="1. Certification Presets"
            />
            <TabButton
              active={activeTab === "templates"}
              onClick={() => setActiveTab("templates")}
              icon={<Layers className="w-4 h-4" />}
              label="2. Templates &amp; Styles"
            />
            <TabButton
              active={activeTab === "content"}
              onClick={() => setActiveTab("content")}
              icon={<FileText className="w-4 h-4" />}
              label="3. Certificate Content"
            />
            <TabButton
              active={activeTab === "signatories"}
              onClick={() => setActiveTab("signatories")}
              icon={<PenLine className="w-4 h-4" />}
              label="4. Signatories"
            />
            <TabButton
              active={activeTab === "branding"}
              onClick={() => setActiveTab("branding")}
              icon={<Award className="w-4 h-4" />}
              label="5. ID &amp; Branding"
            />
            <TabButton
              active={activeTab === "batch"}
              onClick={() => setActiveTab("batch")}
              icon={<Users className="w-4 h-4" />}
              label="6. Batch Generator"
              badge={batchParticipants.length.toString()}
            />
          </div>

          <div className="p-6">
            {/* ── TAB 1: Presets ──────────────────────────────────── */}
            {activeTab === "presets" && (
              <div className="space-y-4">
                <div className="border-b border-[#e6e1d2] pb-3">
                  <h3 className="text-base font-bold text-[#1f2536]">
                    Select or Customize Certification Preset
                  </h3>
                  <p className="text-xs text-[#6b6657] mt-1">
                    Choose from standard SNR Edatas programs or modify for ANY
                    kind of certification.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PRESETS.map((preset) => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <div
                        key={preset.id}
                        className={`rounded-xl border p-4 cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#b8862e] bg-[#fbf8f0] shadow-sm ring-2 ring-[#b8862e]/50"
                            : "border-[#d8d4c8] bg-white hover:border-[#b8862e] hover:bg-[#faf8f2]"
                        }`}
                        onClick={() => applyPreset(preset)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${preset.badgeStyle}`}
                          >
                            {preset.categoryBadge}
                          </span>
                          {isSelected && (
                            <span className="text-xs font-semibold text-[#b8862e] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Active
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-[14px] text-[#1f2536]">
                          {preset.name}
                        </h4>
                        <p className="text-xs text-[#6b6657] mt-1 leading-relaxed">
                          {preset.description}
                        </p>

                        <div className="mt-3 pt-2 border-t border-[#e6e1d2] text-[11px] text-[#1f2536]/80 flex flex-col gap-0.5">
                          <div>
                            <span className="font-medium text-[#6b6657]">
                              Title:
                            </span>{" "}
                            {preset.title}
                          </div>
                          {preset.subtitle && (
                            <div>
                              <span className="font-medium text-[#6b6657]">
                                Subtitle:
                              </span>{" "}
                              <strong className="text-[#b8862e]">
                                {preset.subtitle}
                              </strong>
                            </div>
                          )}
                          <div>
                            <span className="font-medium text-[#6b6657]">
                              Template:
                            </span>{" "}
                            {preset.template}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── TAB 2: Templates ────────────────────────────────── */}
            {activeTab === "templates" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-[#1f2536]">
                    Select Visual Template Design
                  </h3>
                  <p className="text-xs text-[#6b6657] mt-1">
                    Choose from 10 distinct, print-ready corporate aesthetics.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {(Object.keys(TEMPLATES) as TemplateKey[]).map((tmpl) => {
                    const isSelected = selectedTemplate === tmpl;
                    return (
                      <button
                        key={tmpl}
                        onClick={() => setSelectedTemplate(tmpl)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "border-[#1f2536] bg-[#1f2536] text-white shadow-md"
                            : "border-[#d8d4c8] bg-white text-[#1f2536] hover:bg-[#faf8f2] hover:border-[#b8862e]"
                        }`}
                      >
                        <div className="font-semibold text-xs tracking-wide">
                          {tmpl.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div
                          className={`text-[10px] mt-1 ${
                            isSelected ? "text-white/70" : "text-[#6b6657]"
                          }`}
                        >
                          {tmpl === "Classic" && "Cream & double gold border"}
                          {tmpl === "Modern" && "Navy & gold left bar"}
                          {tmpl === "Minimalist" && "Subtle editorial clean"}
                          {tmpl === "Corporate" && "Deep navy border frame"}
                          {tmpl === "Elegant" && "Warm cream rounded gold"}
                          {tmpl === "Geometric" && "Modern linear pinstripes"}
                          {tmpl === "PremiumDark" && "Midnight navy & gold glow"}
                          {tmpl === "Academic" && "Double border with corners"}
                          {tmpl === "Creative" && "Split two-tone layout"}
                          {tmpl === "Executive" && "Navy top header band"}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Recipient Font Style Selection */}
                <div className="pt-4 border-t border-[#e6e1d2]">
                  <Label>Recipient Name Typography Style</Label>
                  <p className="text-[11px] text-[#6b6657] mb-2">
                    Choose the font family used for rendering the
                    recipient&apos;s name
                  </p>
                  <div className="grid grid-cols-3 gap-3 max-w-lg">
                    {[
                      {
                        id: "script" as const,
                        name: "Calligraphic Script",
                        desc: "Great Vibes (Traditional)",
                        sample: "D. Karthik",
                        fontStyle: "var(--font-great-vibes)",
                      },
                      {
                        id: "serif" as const,
                        name: "Regal Serif",
                        desc: "Cormorant Garamond",
                        sample: "D. Karthik",
                        fontStyle: "var(--font-cormorant)",
                      },
                      {
                        id: "sans" as const,
                        name: "Clean Sans",
                        desc: "Montserrat (Modern)",
                        sample: "D. KARTHIK",
                        fontStyle: "var(--font-montserrat)",
                      },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => {
                          setNameFont(f.id);
                          setNameFontSize(
                            f.id === "script" ? 54 : f.id === "serif" ? 44 : 38,
                          );
                        }}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          nameFont === f.id
                            ? "border-[#b8862e] bg-[#f9f5ec] ring-1 ring-[#b8862e]"
                            : "border-[#d8d4c8] bg-white hover:bg-[#faf8f2]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#1f2536]">
                          {f.name}
                        </div>
                        <div
                          style={{ fontFamily: f.fontStyle }}
                          className="text-lg text-[#1f2536] my-1 truncate"
                        >
                          {f.sample}
                        </div>
                        <div className="text-[10px] text-[#6b6657]">
                          {f.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient Font Size Control */}
                <div className="pt-4 border-t border-[#e6e1d2]">
                  <div className="flex items-center justify-between mb-1.5">
                    <div>
                      <Label>
                        Recipient Name Font Size (Fixed &amp; Consistent)
                      </Label>
                      <p className="text-[11px] text-[#6b6657]">
                        Locks font size so it remains strictly consistent and
                        never shrinks while entering names
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#b8862e] bg-[#b8862e]/10 px-2.5 py-0.5 rounded border border-[#b8862e]/30">
                      {nameFontSize}px
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={30}
                      max={76}
                      value={nameFontSize}
                      onChange={(e) => setNameFontSize(Number(e.target.value))}
                      className="w-full accent-[#b8862e] cursor-pointer"
                    />
                    <div className="flex gap-1 shrink-0">
                      {[40, 48, 54, 62, 70].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setNameFontSize(sz)}
                          className={`px-2 py-0.5 text-[10px] font-semibold rounded border transition-colors ${
                            nameFontSize === sz
                              ? "bg-[#1f2536] text-white border-[#1f2536]"
                              : "bg-white text-[#1f2536] border-[#d8d4c8] hover:bg-[#f6f2e7]"
                          }`}
                        >
                          {sz}px
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#e6e1d2]">
                  <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#d8d4c8]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#1f2536]">
                        Watermark
                      </p>
                      <p className="text-[11px] text-[#6b6657] mt-0.5">
                        SNR Edatas faint watermark in the background
                      </p>
                    </div>
                    <Switch
                      checked={showWatermark}
                      onChange={setShowWatermark}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white rounded-lg border border-[#d8d4c8]">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#1f2536]">
                        Verification QR Code
                      </p>
                      <p className="text-[11px] text-[#6b6657] mt-0.5">
                        Scannable QR code linking to verification page
                      </p>
                    </div>
                    <Switch checked={showQrCode} onChange={setShowQrCode} />
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 3: Certificate Content ──────────────────────── */}
            {activeTab === "content" && (
              <div className="space-y-4 text-sm">
                <div className="border-b border-[#e6e1d2] pb-2">
                  <h3 className="text-base font-bold text-[#1f2536]">
                    Certificate Text &amp; Details
                  </h3>
                  <p className="text-xs text-[#6b6657] mt-0.5">
                    Customize titles, badges, recipient, recognition text, and
                    duration.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Field
                      label="Certificate Title"
                      value={title}
                      onChange={setTitle}
                      hint="e.g. RECOGNITION OF COMPLETION, CERTIFICATE OF PARTICIPATION"
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {[
                        "RECOGNITION OF COMPLETION",
                        "CERTIFICATE OF PARTICIPATION",
                        "CERTIFICATE OF COMPLETION",
                        "CERTIFICATE OF EXCELLENCE",
                        "CERTIFICATE OF APPRECIATION",
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTitle(t)}
                          className={`px-2 py-0.5 text-[10px] rounded border transition-colors ${
                            title === t
                              ? "bg-[#1f2536] text-white border-[#1f2536] font-semibold"
                              : "bg-[#fdfbf7] text-[#1f2536] border-[#d8d4c8] hover:border-[#b8862e]"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Field
                    label="Program / Track Badge (Subtitle)"
                    value={subtitle}
                    onChange={setSubtitle}
                    hint="e.g. CMMI LEVEL 5, ISO 9001:2015, PROCESS EXCELLENCE"
                  />
                  <Field
                    label="Presentation Line"
                    value={presentationLine}
                    onChange={setPresentationLine}
                    hint="e.g. This certificate is proudly presented to"
                  />
                  <Field
                    label="Recipient / Participant Name"
                    value={name}
                    onChange={setName}
                    hint="Full name of the certificate recipient"
                  />

                  {/* Body Text */}
                  <div className="md:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <Label>Recognition Description / Body Text</Label>
                      <button
                        type="button"
                        onClick={() =>
                          setBody(
                            "In recognition of successful completion in the\nCMMI Level 5 Program\nConducted by SNR Edatas Private Limited, acknowledging their commitment to understanding process excellence, continuous improvement and organizational maturity practices.",
                          )
                        }
                        className="text-[11px] text-[#b8862e] hover:underline font-medium"
                      >
                        Reset to CMMI Level 5 Standard Text
                      </button>
                    </div>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      rows={5}
                      className="w-full border border-[#d8d4c8] rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white leading-relaxed font-normal"
                    />
                    <span className="text-[11px] text-[#6b6657] mt-1 block">
                      SNR Edatas &amp; CMMI Level 5 are automatically highlighted
                      in bold across all templates
                    </span>
                  </div>

                  {/* Duration / Period */}
                  <div className="md:col-span-2 pt-3 border-t border-[#e6e1d2] bg-[#fbf8f0] p-4 rounded-xl border border-[#d8d4c8]">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <Label>Program Duration &amp; Period Customization</Label>
                        <p className="text-[11px] text-[#6b6657]">
                          Customize the field name (&quot;Training Period:&quot;)
                          or change it to any other name (e.g. Program Duration,
                          Awareness Period)
                        </p>
                      </div>
                      <Switch checked={showPeriod} onChange={setShowPeriod} />
                    </div>

                    {showPeriod && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Period Field Name / Label</Label>
                            <input
                              type="text"
                              value={periodLabel}
                              onChange={(e) => setPeriodLabel(e.target.value)}
                              placeholder="e.g. Training Period, Program Duration"
                              className="w-full border border-[#d8d4c8] rounded-md px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white font-medium text-[#1f2536]"
                            />
                            <p className="text-[11px] text-[#6b6657] mt-1">
                              Custom name that appears before the dates on the
                              certificate
                            </p>
                          </div>

                          <div>
                            <Label>Period Dates / Value</Label>
                            <input
                              type="text"
                              value={period}
                              onChange={(e) => setPeriod(e.target.value)}
                              placeholder="e.g. 01 May 2026 – 15 May 2026"
                              className="w-full border border-[#d8d4c8] rounded-md px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white font-medium text-[#1f2536]"
                            />
                            <p className="text-[11px] text-[#6b6657] mt-1">
                              Date range or duration string
                            </p>
                          </div>
                        </div>

                        {/* Quick Name Suggestions */}
                        <div>
                          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#6b6657] block mb-1.5">
                            Quick-Select Field Name (1-Click Apply):
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Training Period",
                              "Program Duration",
                              "Awareness Period",
                              "Training & Awareness Period",
                              "Program Period",
                              "Assessment Period",
                              "Period of Participation",
                              "Certification Period",
                              "Conducted On",
                              "Internship Period",
                              "Duration",
                            ].map((suggestedLabel) => (
                              <button
                                key={suggestedLabel}
                                type="button"
                                onClick={() => setPeriodLabel(suggestedLabel)}
                                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
                                  periodLabel.trim() === suggestedLabel
                                    ? "bg-[#1f2536] text-white border-[#1f2536] shadow-xs"
                                    : "bg-white text-[#1f2536] border-[#d8d4c8] hover:border-[#b8862e] hover:bg-[#faf8f2]"
                                }`}
                              >
                                {suggestedLabel}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 4: Signatories ──────────────────────────────── */}
            {activeTab === "signatories" && (
              <div className="space-y-6">
                <div className="border-b border-[#e6e1d2] pb-2">
                  <h3 className="text-base font-bold text-[#1f2536]">
                    Authorized Signatories
                  </h3>
                  <p className="text-xs text-[#6b6657] mt-0.5">
                    Configure signatories, designations, company name, and
                    signature graphics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Signatory */}
                  <div className="bg-white p-4 rounded-xl border border-[#d8d4c8] space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#e6e1d2] pb-2">
                      <PenLine className="w-4 h-4 text-[#b8862e]" />
                      <h4 className="font-bold text-sm text-[#1f2536]">
                        Left Signatory (Signatory 1)
                      </h4>
                    </div>

                    <Field
                      label="Signatory Name / Title"
                      value={sig1Name}
                      onChange={setSig1Name}
                      hint="e.g. Authorized Signatory, G. Mallikarjuna"
                    />
                    <Field
                      label="Designation / Role"
                      value={sig1Role}
                      onChange={setSig1Role}
                      hint="e.g. Authorized Signatory, Chief Executive Officer"
                    />
                    <Field
                      label="Organization / Subtitle"
                      value={sig1Org}
                      onChange={setSig1Org}
                      hint="e.g. SNR Edatas Private Limited"
                    />

                    <ImageUpload
                      label="Signature Image"
                      value={sig1Img}
                      onChange={setSig1Img}
                      onClear={() => setSig1Img("")}
                      icon={<PenLine className="w-5 h-5" />}
                      hint="Upload transparent PNG signature"
                    />
                  </div>

                  {/* Right Signatory */}
                  <div className="bg-white p-4 rounded-xl border border-[#d8d4c8] space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#e6e1d2] pb-2">
                      <PenLine className="w-4 h-4 text-[#b8862e]" />
                      <h4 className="font-bold text-sm text-[#1f2536]">
                        Right Signatory (Signatory 2)
                      </h4>
                    </div>

                    <Field
                      label="Signatory Name / Title"
                      value={sig2Name}
                      onChange={setSig2Name}
                      hint="e.g. Managing Director, Anuradha.A.J"
                    />
                    <Field
                      label="Designation / Role"
                      value={sig2Role}
                      onChange={setSig2Role}
                      hint="e.g. SNR Edatas Private Limited, Managing Director"
                    />
                    <Field
                      label="Organization / Subtitle"
                      value={sig2Org}
                      onChange={setSig2Org}
                      hint="e.g. SNR Edatas Private Limited"
                    />

                    <ImageUpload
                      label="Signature Image"
                      value={sig2Img}
                      onChange={setSig2Img}
                      onClear={() => setSig2Img("")}
                      icon={<PenLine className="w-5 h-5" />}
                      hint="Upload transparent PNG signature"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 5: Identification & Branding ────────────────── */}
            {activeTab === "branding" && (
              <div className="space-y-5">
                <div className="border-b border-[#e6e1d2] pb-2">
                  <h3 className="text-base font-bold text-[#1f2536]">
                    Identification &amp; Branding
                  </h3>
                  <p className="text-xs text-[#6b6657] mt-0.5">
                    Certificate ID, issue date, and issuing company logo.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Certificate ID */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Certificate ID</Label>
                      <button
                        onClick={handleRandomizeId}
                        className="text-[11px] text-[#b8862e] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <RefreshCw className="w-3 h-3" /> Generate New ID
                      </button>
                    </div>
                    <input
                      type="text"
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                      className="w-full border border-[#d8d4c8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white font-mono"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Date of Issue / Certification</Label>
                      <button
                        onClick={handleSetToday}
                        className="text-[11px] text-[#b8862e] hover:underline font-semibold"
                      >
                        Set to Today
                      </button>
                    </div>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full border border-[#d8d4c8] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white font-mono"
                    />
                  </div>

                  {/* Organization Name */}
                  <div className="md:col-span-2">
                    <Field
                      label="Issuing Organization"
                      value={organization}
                      onChange={setOrganization}
                      hint="Official company name"
                    />
                  </div>

                  {/* Logo Upload */}
                  <div className="md:col-span-2 pt-2 border-t border-[#e6e1d2]">
                    <ImageUpload
                      label="Company Logo"
                      value={logo}
                      onChange={setLogo}
                      onClear={() => setLogo(snrLogo.src)}
                      icon={<ImageIcon className="w-5 h-5" />}
                      hint="Upload custom logo (PNG/SVG transparent recommended)"
                      wide
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── TAB 6: Batch Generator (Multi-Participant) ──────── */}
            {activeTab === "batch" && (
              <div className="space-y-5">
                <div className="border-b border-[#e6e1d2] pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#1f2536] flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#b8862e]" />
                        Bulk / Multi-Participant Generation
                      </h3>
                      <p className="text-xs text-[#6b6657] mt-0.5">
                        Generate and download certificates for entire training
                        cohorts automatically.
                      </p>
                    </div>

                    <button
                      onClick={handleBatchExport}
                      disabled={
                        isBatchGenerating || batchParticipants.length === 0
                      }
                      className={`px-4 py-2 bg-[#b8862e] text-white rounded-md text-xs font-bold hover:bg-[#a17527] transition-all flex items-center gap-2 shadow-sm ${
                        isBatchGenerating ? "opacity-70 cursor-wait" : ""
                      }`}
                    >
                      {isBatchGenerating ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>
                            Exporting ({batchProgress.current}/
                            {batchProgress.total})...
                          </span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>
                            Download All ({batchParticipants.length}) as PDF
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="space-y-3">
                    <Label>Participant Names (One per line)</Label>
                    <textarea
                      value={batchRawNames}
                      onChange={(e) => setBatchRawNames(e.target.value)}
                      rows={7}
                      className="w-full border border-[#d8d4c8] rounded-md p-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white leading-relaxed"
                      placeholder="D. Karthik&#10;A. Sharma&#10;R. Ananya"
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label>ID Prefix</Label>
                        <input
                          type="text"
                          value={batchIdPrefix}
                          onChange={(e) => setBatchIdPrefix(e.target.value)}
                          className="w-full border border-[#d8d4c8] rounded-md px-2.5 py-1.5 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <Label>Start Number</Label>
                        <input
                          type="number"
                          value={batchStartNum}
                          onChange={(e) =>
                            setBatchStartNum(Number(e.target.value))
                          }
                          className="w-full border border-[#d8d4c8] rounded-md px-2.5 py-1.5 text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Participants Table */}
                  <div className="lg:col-span-2 bg-white rounded-lg border border-[#d8d4c8] p-3 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[#1f2536] uppercase tracking-wider">
                        Generated Cohort List ({batchParticipants.length})
                      </span>
                      <span className="text-[11px] text-[#6b6657]">
                        Click &apos;Preview&apos; to load individual certificate
                      </span>
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-[#e6e1d2] border border-[#e6e1d2] rounded-md">
                      {batchParticipants.map((p) => {
                        const isCurrent = name === p.name;
                        return (
                          <div
                            key={p.index}
                            className={`p-2.5 flex items-center justify-between gap-3 text-xs ${
                              isCurrent ? "bg-[#fbf8f0]" : "hover:bg-[#faf8f2]"
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="w-6 text-center font-mono text-[10px] text-[#6b6657]">
                                #{p.index + 1}
                              </span>
                              <div className="truncate">
                                <div className="font-semibold text-[#1f2536] truncate">
                                  {p.name}
                                </div>
                                <div className="text-[10px] font-mono text-[#6b6657]">
                                  {p.serial}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => {
                                  setName(p.name);
                                  setSerial(p.serial);
                                }}
                                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                                  isCurrent
                                    ? "bg-[#1f2536] text-white"
                                    : "bg-[#f6f2e7] text-[#1f2536] hover:bg-[#ece6d5]"
                                }`}
                              >
                                {isCurrent ? "Viewing" : "Preview"}
                              </button>
                              <button
                                onClick={() => exportPdf(p.name, p.serial)}
                                title="Download single PDF"
                                className="p-1 rounded bg-white border border-[#d8d4c8] hover:bg-[#f6f2e7] text-[#1f2536]"
                              >
                                <FileDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─── Shared UI Helpers ────────────────────────────────────────── */

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-xs font-semibold tracking-wide flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
        active
          ? "border-[#b8862e] bg-[#fdfbf7] text-[#1f2536]"
          : "border-transparent text-[#6b6657] hover:text-[#1f2536] hover:bg-white/50"
      }`}
    >
      <span className={active ? "text-[#b8862e]" : ""}>{icon}</span>
      <span>{label}</span>
      {badge && (
        <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#1f2536] text-white font-mono">
          {badge}
        </span>
      )}
    </button>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold text-[#1f2536] mb-1 uppercase tracking-wider">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#d8d4c8] rounded-md px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#b8862e] bg-white"
      />
      {hint && <p className="text-[11px] text-[#6b6657] mt-1">{hint}</p>}
    </div>
  );
}

function Switch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#b8862e] ${
        checked ? "bg-[#b8862e]" : "bg-[#d8d4c8]"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function ImageUpload({
  label,
  value,
  onChange,
  onClear,
  icon,
  hint,
  wide,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  onClear: () => void;
  icon: React.ReactNode;
  hint?: string;
  wide?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(f);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div
        onClick={() => inputRef.current?.click()}
        className="group relative flex items-center gap-3 border-2 border-dashed border-[#d8d4c8] rounded-lg p-3 cursor-pointer hover:border-[#b8862e] hover:bg-[#faf8f2] transition-colors"
      >
        <div
          className={`shrink-0 rounded-md bg-[#f6f2e7] border border-[#e6e1d2] flex items-center justify-center overflow-hidden ${
            wide ? "w-28 h-14" : "w-14 h-14"
          }`}
        >
          {value ? (
            <img
              src={value}
              alt={label}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <span className="text-[#b8862e]">{icon}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#1f2536]">
            <Upload className="w-3.5 h-3.5" />
            {value ? "Replace image" : "Click to upload"}
          </div>
          <p className="text-[11px] text-[#6b6657] mt-0.5 truncate">
            {hint || "PNG, SVG, JPG up to 2MB"}
          </p>
        </div>
        {value && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="shrink-0 p-1.5 rounded-md text-[#1f2536]/60 hover:text-[#1f2536] hover:bg-[#f6f2e7]"
            title="Remove"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handle}
          className="hidden"
        />
      </div>
    </div>
  );
}
