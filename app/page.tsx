"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Server,
  Code,
  ImageIcon,
  ChevronRight,
  ChevronDown,
  Layout,
  ShieldCheck,
  FileText,
  Accessibility,
  ThumbsUp,
  Search,
  Laptop,
  ListTodo,
  Lock,
  ExternalLink,
  Globe,
} from "lucide-react";

// --- Types ---
type Severity = "critical" | "high" | "medium" | "low" | "pass";
type Category = "performance" | "seo" | "security" | "ux" | "accessibility";
type DeviceType = "mobile" | "desktop";

interface AuditIssue {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  category: Category;
  technicalDetails: string;
  fix: string;
  impact: string;
}

interface WebVital {
  label: string;
  value: string;
  score: "good" | "needs-improvement" | "poor";
  description: string;
}

// --- Data ---
const SITE_META = {
  url: "thedrinkhqexperience.com.au",
  host: "GreenGeeks (LiteSpeed Server)",
};

const PERFORMANCE_DATA = {
  mobile: {
    scores: {
      performance: 53,
      accessibility: 85,
      bestPractices: 73,
      seo: 92,
    },
    vitals: [
      {
        label: "Largest Contentful Paint (LCP)",
        value: "51.9 s",
        score: "poor" as const,
        description:
          "Severely Poor. Main content takes far too long to become visible.",
      },
      {
        label: "First Contentful Paint (FCP)",
        value: "5.5 s",
        score: "poor" as const,
        description: "Significant delay in initial rendering.",
      },
      {
        label: "Speed Index",
        value: "10.5 s",
        score: "poor" as const,
        description: "Content is visually displayed slowly.",
      },
      {
        label: "Total Blocking Time (TBT)",
        value: "210 ms",
        score: "needs-improvement" as const,
        description: "Main thread blocked by 3rd party code.",
      },
      {
        label: "Cumulative Layout Shift (CLS)",
        value: "0.02",
        score: "good" as const,
        description: "Good stability on mobile.",
      },
    ],
  },
  desktop: {
    scores: {
      performance: 48,
      accessibility: 85,
      bestPractices: 73,
      seo: 92,
    },
    vitals: [
      {
        label: "Cumulative Layout Shift (CLS)",
        value: "1.0",
        score: "poor" as const,
        description:
          "Poor/High Shift. Elements jump significantly during load.",
      },
      {
        label: "Largest Contentful Paint (LCP)",
        value: "3.3 s",
        score: "needs-improvement" as const,
        description: "Needs Improvement. Slower than ideal.",
      },
      {
        label: "Speed Index",
        value: "3.6 s",
        score: "needs-improvement" as const,
        description: "Moderate visual load speed.",
      },
      {
        label: "First Contentful Paint (FCP)",
        value: "0.7 s",
        score: "good" as const,
        description: "Good initial render.",
      },
      {
        label: "Total Blocking Time (TBT)",
        value: "90 ms",
        score: "good" as const,
        description: "Good. Desktop CPU handles scripts efficiently.",
      },
    ],
  },
};

const AUDIT_ISSUES: AuditIssue[] = [
  {
    id: "1",
    title: "Severe Mobile LCP Delay",
    description: "Mobile content takes ~52 seconds to fully load.",
    severity: "critical",
    category: "performance",
    technicalDetails:
      "Caused by massive unoptimized images (approx 11MB savings available).",
    fix: 'Convert all images to WebP/AVIF. Resize "cropped-3-1.png" (512x512) to thumbnail size (70x44).',
    impact: "Massive reduction in load time",
  },
  {
    id: "2",
    title: "High Desktop Layout Shift (CLS)",
    description: "Desktop layout is unstable (Score: 1.0).",
    severity: "critical",
    category: "ux",
    technicalDetails:
      "Elements are shifting because images/sliders lack explicit width/height attributes.",
    fix: "Set explicit dimensions on all images/iframes. Reserve CSS space for the top slider.",
    impact: "Stabilizes view, improves UX and Ranking",
  },
  {
    id: "3",
    title: "Uncrawlable Links",
    description: "Search engines cannot follow site navigation.",
    severity: "high",
    category: "seo",
    technicalDetails:
      'Links likely lack "href" attributes or rely on JavaScript events.',
    fix: "Ensure all <a> tags have valid href attributes.",
    impact: "Critical for SEO crawling",
  },
  {
    id: "4",
    title: "GreenGeeks Optimization Missed",
    description: "Not leveraging LiteSpeed server capabilities.",
    severity: "medium",
    category: "performance",
    technicalDetails: "Site likely using generic caching or none.",
    fix: "Configure LiteSpeed Cache plugin. Enable Redis Object Cache in cPanel.",
    impact: "Faster database queries and page serving",
  },
  {
    id: "5",
    title: "Render Blocking Resources",
    description: "CSS/JS delaying initial paint.",
    severity: "medium",
    category: "performance",
    technicalDetails: "Saves estimated ~860ms.",
    fix: "Defer JS parsing via LiteSpeed Cache. Review 3rd party scripts.",
    impact: "Improves FCP and TBT",
  },
];

// --- Components ---

const ScoreGauge = ({
  score,
  label,
  icon: Icon,
}: {
  score: number;
  label: string;
  icon: any;
}) => {
  const getColor = (s: number) => {
    if (s >= 90) return "text-emerald-500 border-emerald-500 bg-emerald-50";
    if (s >= 50) return "text-amber-500 border-amber-500 bg-amber-50";
    return "text-rose-500 border-rose-500 bg-rose-50";
  };

  const colorClass = getColor(score);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-slate-100 flex-1 min-w-[140px]">
      <div className="flex items-center gap-2 mb-3 text-slate-500 font-medium uppercase tracking-wider text-[10px] text-center h-8">
        <Icon size={14} className="shrink-0" />
        {label}
      </div>
      <div
        className={`relative flex items-center justify-center w-20 h-20 rounded-full border-4 ${colorClass}`}
      >
        <span className="text-2xl font-bold">{score}</span>
      </div>
      <div className="mt-3 text-center">
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${score < 50 ? "bg-rose-100 text-rose-700" : score < 90 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
        >
          {score < 50 ? "Poor/Fail" : score < 90 ? "Average" : "Good"}
        </span>
      </div>
    </div>
  );
};

const WebVitalCard = ({ vital }: { vital: WebVital }) => {
  const getStatusColor = (score: string) => {
    switch (score) {
      case "good":
        return "bg-emerald-500";
      case "needs-improvement":
        return "bg-amber-500";
      case "poor":
        return "bg-rose-500";
      default:
        return "bg-slate-300";
    }
  };

  return (
    <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-slate-700 text-sm">
            {vital.label}
          </h4>
          <div
            className={`px-2 py-0.5 rounded text-white text-[10px] font-bold uppercase ${getStatusColor(vital.score)}`}
          >
            {vital.score === "poor"
              ? "POOR"
              : vital.score === "good"
                ? "GOOD"
                : "AVG"}
          </div>
        </div>
        <div className="text-2xl font-bold text-slate-900 mb-2">
          {vital.value}
        </div>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-2 mt-1">
        {vital.description}
      </p>
    </div>
  );
};

const IssueRow = ({ issue }: { issue: AuditIssue }) => {
  const [expanded, setExpanded] = useState(false);

  const severityColor = {
    critical: "bg-rose-100 text-rose-700 border-rose-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    medium: "bg-amber-100 text-amber-700 border-amber-200",
    low: "bg-blue-100 text-blue-700 border-blue-200",
    pass: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <div className="border-b border-slate-100 last:border-0">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-24 text-center py-1 px-2 rounded text-xs font-bold uppercase border ${severityColor[issue.severity]}`}
          >
            {issue.severity}
          </div>
          <div>
            <h4 className="text-slate-800 font-medium">{issue.title}</h4>
            <p className="text-slate-500 text-sm hidden sm:block">
              {issue.description}
            </p>
          </div>
        </div>
        <div className="text-slate-400">
          {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {expanded && (
        <div className="p-4 bg-slate-50 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Code size={16} className="text-blue-500" />
                Technical Details
              </h5>
              <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200 font-mono">
                {issue.technicalDetails}
              </p>
            </div>
            <div>
              <h5 className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Zap size={16} className="text-amber-500" />
                Recommended Fix
              </h5>
              <p className="text-sm text-slate-600 bg-white p-3 rounded border border-slate-200">
                {issue.fix}
              </p>
              {issue.severity !== "pass" && (
                <div className="mt-2 text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Expected Impact: {issue.impact}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ChecklistItem = ({
  text,
  category,
}: {
  text: string;
  category: string;
}) => (
  <div className="flex items-start gap-3 p-3 bg-slate-50 rounded border border-slate-100">
    <div className="mt-0.5 h-5 w-5 rounded border-2 border-slate-300 bg-white flex-shrink-0" />
    <div>
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 block">
        {category}
      </span>
      <p className="text-sm text-slate-700">{text}</p>
    </div>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "issues" | "roadmap">(
    "overview",
  );
  const [device, setDevice] = useState<DeviceType>("mobile");

  const currentData = PERFORMANCE_DATA[device];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Personal Branding (Replaced Mock Logo) */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-slate-800">
                Audit by <span className="text-indigo-600">Shan Surat</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            {/* Personal Links */}
            <div className="flex gap-4">
              <a
                href="https://shansurat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >
                <Globe size={14} />{" "}
                <span className="hidden sm:inline">shansurat.com</span>
              </a>
              <a
                href="https://freelancer.com/u/ksurat"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors"
              >
                <ExternalLink size={14} />{" "}
                <span className="hidden sm:inline">Freelancer Profile</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Toggle */}
        <div className="mb-8 flex flex-col justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Performance Audit Report
              </h1>
              <p className="text-slate-500 mt-2">
                Analysis generated based on PageSpeed Insights data.
              </p>

              {/* Site Meta moved here */}
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Layout size={12} /> {SITE_META.url}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <Server size={12} /> {SITE_META.host}
                </span>
              </div>
            </div>

            <div className="bg-slate-200 p-1 rounded-lg flex items-center shrink-0 w-fit self-start md:self-auto">
              <button
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${device === "mobile" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}
              >
                <Smartphone size={16} /> Mobile
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${device === "desktop" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-800"}`}
              >
                <Laptop size={16} /> Desktop
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center md:justify-start mb-8">
          <div className="flex flex-wrap justify-center gap-1 bg-slate-200 p-1 rounded-lg w-fit">
            {[
              { id: "overview", label: "Executive Summary", icon: BarChart3 },
              { id: "issues", label: "Detailed Findings", icon: AlertTriangle },
              { id: "roadmap", label: "Strategy & Checklist", icon: ListTodo },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-indigo-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-300/50"
                }`}
              >
                <tab.icon size={16} className="shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Score Cards */}
            <div className="flex flex-wrap gap-4">
              <ScoreGauge
                score={currentData.scores.performance}
                label="Performance"
                icon={Zap}
              />
              <ScoreGauge
                score={currentData.scores.accessibility}
                label="Accessibility"
                icon={Accessibility}
              />
              <ScoreGauge
                score={currentData.scores.bestPractices}
                label="Best Practices"
                icon={ThumbsUp}
              />
              <ScoreGauge
                score={currentData.scores.seo}
                label="SEO"
                icon={Search}
              />
            </div>

            {/* Web Vitals Grid */}
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Clock size={20} className="text-slate-400" />
                {device === "mobile" ? "Mobile" : "Desktop"} Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {currentData.vitals.map((vital, idx) => (
                  <WebVitalCard key={idx} vital={vital} />
                ))}
              </div>
            </div>

            {/* Executive Summary Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  The Current State
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-rose-50 rounded-lg border border-rose-100">
                    <div className="flex items-center gap-2 font-bold text-rose-800 mb-1">
                      <Smartphone size={18} /> Mobile Critical Issue
                    </div>
                    <p className="text-sm text-rose-800/80">
                      <strong>Slow Load Time (LCP 51.9s):</strong> Extremely
                      poor. Caused by massive unoptimized images and file sizes.
                      Requires immediate compression and resizing.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <div className="flex items-center gap-2 font-bold text-orange-800 mb-1">
                      <Laptop size={18} /> Desktop Critical Issue
                    </div>
                    <p className="text-sm text-orange-800/80">
                      <strong>Unstable Layout (CLS 1.0):</strong> Elements jump
                      around during load. Frustrates users and hurts rankings.
                      Needs explicit width/height on images and reserved space
                      for sliders.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center gap-2">
                  <Server size={20} />
                  The GreenGeeks Advantage
                </h3>
                <p className="text-indigo-800/80 text-sm leading-relaxed mb-4">
                  Since you are hosted on GreenGeeks, you have access to{" "}
                  <strong>LiteSpeed Enterprise Servers</strong>.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-indigo-900">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <span>
                      <strong>Use LiteSpeed Cache:</strong> Much faster than WP
                      Rocket for this host.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-indigo-900">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <span>
                      <strong>Enable Redis Object Cache:</strong> Available in
                      cPanel. Speeds up database queries.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "issues" && (
          <div className="animate-in fade-in duration-500">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-700">
                  Audit Findings ({AUDIT_ISSUES.length})
                </h3>
                <span className="text-xs font-mono text-slate-400">
                  Sorted by Severity
                </span>
              </div>
              <div>
                {AUDIT_ISSUES.map((issue) => (
                  <IssueRow key={issue.id} issue={issue} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "roadmap" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* Roadmap Column 1 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Phase 1 */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="bg-rose-100 text-rose-700 py-1 px-3 rounded text-sm">
                    Phase 1
                  </span>
                  Performance Optimization ("Burning Issues")
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} className="text-slate-400" /> Fix
                      Image Delivery (Mobile Critical)
                    </h4>
                    <p className="text-sm text-slate-500 mb-3">
                      Mobile report estimates ~11MB savings. Single page should
                      be under 2-3MB.
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
                      <li>
                        Convert all images to <strong>WebP/AVIF</strong>.
                      </li>
                      <li>
                        Resize <code>cropped-3-1.png</code> (512x512 &rarr;
                        70x44).
                      </li>
                      <li>Ensure native lazy-loading is active.</li>
                    </ul>
                  </div>
                  <hr className="border-slate-100" />
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <Layout size={16} className="text-slate-400" /> Stabilize
                      Layout (Desktop Critical)
                    </h4>
                    <p className="text-sm text-slate-500 mb-3">
                      Fixing CLS of 1.0 (Target &lt; 0.1).
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-2">
                      <li>
                        Set explicit <code>width</code> and <code>height</code>{" "}
                        on all images/iframes.
                      </li>
                      <li>
                        Set CSS <code>min-height</code> for top slider/ads to
                        reserve space.
                      </li>
                      <li>
                        Use <code>font-display: swap</code> for custom fonts.
                      </li>
                    </ul>
                  </div>
                  <hr className="border-slate-100" />
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <Server size={16} className="text-slate-400" /> Server
                      Strategy
                    </h4>
                    <p className="text-sm text-slate-600 ml-2">
                      Strictly use <strong>LiteSpeed Cache</strong> +{" "}
                      <strong>Redis Object Cache</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 2 & 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-700 py-1 px-2 rounded text-xs">
                      Phase 2
                    </span>
                    Technical & Security
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <Code size={14} className="mt-1 text-slate-400" />{" "}
                      <strong>Theme Review:</strong> Check for JS errors in
                      console breaking menus.
                    </li>
                    <li className="flex gap-2">
                      <Zap size={14} className="mt-1 text-slate-400" />{" "}
                      <strong>Render Blocking:</strong> Defer JS parsing. Delay
                      Chat/Map widgets.
                    </li>
                    <li className="flex gap-2">
                      <ShieldCheck size={14} className="mt-1 text-slate-400" />{" "}
                      <strong>Security:</strong> Change wp-admin URL. Setup
                      external backups.
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-700 py-1 px-2 rounded text-xs">
                      Phase 3
                    </span>
                    SEO Technical Setup
                  </h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <Search size={14} className="mt-1 text-slate-400" />{" "}
                      <strong>Fix Uncrawlable Links:</strong> Ensure all nav
                      buttons use real <code>&lt;a href&gt;</code> tags.
                    </li>
                    <li className="flex gap-2">
                      <FileText size={14} className="mt-1 text-slate-400" />{" "}
                      <strong>Sitemap:</strong> Verify XML sitemap generation
                      and submission to Google.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Checklist Sidebar */}
            <div className="bg-slate-800 text-white p-6 rounded-xl h-fit">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-400" />
                Developer Checklist
              </h4>
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase mt-4 mb-2">
                  Image Remediation
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Bulk optimize media to WebP
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Resize oversized assets (logo/hero)
                </div>

                <div className="text-xs font-semibold text-slate-400 uppercase mt-4 mb-2">
                  Layout Stability (CLS)
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Add width/height to images
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  CSS reservation for top slider
                </div>

                <div className="text-xs font-semibold text-slate-400 uppercase mt-4 mb-2">
                  Speed (GreenGeeks)
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Config LiteSpeed Cache
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Activate Redis Object Cache
                </div>

                <div className="text-xs font-semibold text-slate-400 uppercase mt-4 mb-2">
                  Security & SEO
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Update PHP to 8.1/8.2
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <div className="h-4 w-4 border border-slate-500 rounded mt-0.5 shrink-0" />
                  Fix "Uncrawlable Links" error
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}