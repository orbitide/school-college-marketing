"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  applications as baseApps, attendanceBySection, feeRecords, notices as baseNotices, requiredDocs, staff, students,
  type Application, type FeeRecord, type Notice, type SectionAttendance, type Stage, type Student,
} from "@/content/product/data";

/*
  Simulated live institution. Everything here runs in the browser against the sample data:
  events arrive on a timer and user actions change the same state the dashboard and tables read.
  TODO: replace with real-time data from the API (websocket or polling).
*/

export type ActivityKind = "attendance" | "fee" | "admission" | "notice" | "system";
export type Activity = { id: number; kind: ActivityKind; text: string; at: number | null; label?: string };

export type LiveState = {
  submitted: string[]; // sections whose register has been submitted since load
  reminded: string[]; // sections reminded
  paid: string[]; // invoices paid since load
  invoicesReminded: string[];
  stages: Record<string, Stage>;
  newApps: Application[];
  docsGot: Record<string, string[]>;
  docsAsked: string[];
  notices: Notice[];
  resolved: string[];
  cover: string[];
  activity: Activity[];
  unread: number;
  paused: boolean;
  seq: number;
  tick: number;
};

const seedActivity: Activity[] = [
  { id: -1, kind: "fee", text: "Payment received: ৳1,800, Class 10B", at: null, label: "4 min ago" },
  { id: -2, kind: "attendance", text: "Ms. Rehana Parvin submitted attendance for 6B", at: null, label: "11 min ago" },
  { id: -3, kind: "admission", text: "New application received for Class 7", at: null, label: "23 min ago" },
];

export const initial: LiveState = {
  submitted: [], reminded: [], paid: [], invoicesReminded: [], stages: {}, newApps: [], docsGot: {}, docsAsked: [],
  notices: [], resolved: [], cover: [], activity: seedActivity, unread: 3, paused: false, seq: 0, tick: 0,
};

let state: LiveState = initial;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let nextId = 1;

const emit = () => listeners.forEach((l) => l());
const set = (patch: (s: LiveState) => Partial<LiveState>) => {
  state = { ...state, ...patch(state) };
  emit();
};
const log = (kind: ActivityKind, text: string, notify = true) =>
  set((s) => ({ activity: [{ id: nextId++, kind, text, at: Date.now() }, ...s.activity].slice(0, 30), unread: s.unread + (notify ? 1 : 0) }));

/* ---------- derived data ---------- */
export const sectionsLive = (s: LiveState): SectionAttendance[] =>
  attendanceBySection.map((x) => (s.submitted.includes(x.section) ? { ...x, submitted: true } : x));

export const feesLive = (s: LiveState): (FeeRecord & { reminded: boolean })[] =>
  feeRecords.map((f) => ({ ...f, status: s.paid.includes(f.invoice) ? "Paid" : f.status, daysOverdue: s.paid.includes(f.invoice) ? 0 : f.daysOverdue, reminded: s.invoicesReminded.includes(f.invoice) }));

export const studentsLive = (s: LiveState): Student[] => {
  const byStudent = new Map(feeRecords.map((f) => [f.studentId, f.invoice]));
  return students.map((st) => {
    const inv = byStudent.get(st.id);
    return inv && s.paid.includes(inv) ? { ...st, feeStatus: "Paid" as const, monthsOwed: 0 } : st;
  });
};

export const applicationsLive = (s: LiveState): Application[] =>
  [...s.newApps, ...baseApps].map((a) => {
    const got = s.docsGot[a.id];
    const docs = got ? { ...a.docs, ...Object.fromEntries(got.map((d) => [d, true])) } : a.docs;
    return { ...a, docs: docs as Application["docs"], stage: s.stages[a.id] ?? a.stage };
  });

const complete = (a: Application) => requiredDocs.every((d) => a.docs[d]);

export function overviewLive(s: LiveState) {
  const secs = sectionsLive(s);
  const submitted = secs.filter((x) => x.submitted);
  const fees = feesLive(s);
  const unpaid = fees.filter((f) => f.status !== "Paid");
  const overdue = fees.filter((f) => f.status === "Overdue");
  const apps = applicationsLive(s);
  const byClass = [6, 7, 8, 9, 10].map((cls) => {
    const group = students.filter((st) => st.cls === cls);
    const billed = group.reduce((t, st) => t + st.tuition * 3, 0);
    const outstanding = fees.filter((f) => f.cls === cls && f.status !== "Paid").reduce((t, f) => t + f.amount, 0);
    return { cls, billed, outstanding, percent: Math.round((outstanding / billed) * 100) };
  });
  const away = staff.filter((m) => (m.today === "Absent" || m.today === "On leave") && !s.cover.includes(m.id));
  return {
    present: submitted.reduce((t, x) => t + x.present, 0),
    absent: submitted.reduce((t, x) => t + x.absent, 0),
    submittedSections: submitted.length,
    totalSections: secs.length,
    notSubmitted: secs.filter((x) => !x.submitted),
    overdueCount: overdue.length,
    overdueAmount: overdue.reduce((t, f) => t + f.amount, 0),
    unpaidAmount: unpaid.reduce((t, f) => t + f.amount, 0),
    pendingApprovals: apps.filter((a) => a.stage === "Pending approval").length,
    incompleteDocs: apps.filter((a) => !complete(a) && !["Approved", "Rejected"].includes(a.stage)).length,
    newApplications: apps.filter((a) => a.stage === "Applied").length,
    approved: apps.filter((a) => a.stage === "Approved").length,
    staffAway: away.length,
    staffPresent: staff.length - away.length,
    staffTotal: staff.length,
    byClass,
    worstClass: [...byClass].sort((a, b) => b.percent - a.percent)[0],
    conflicts: 2 - s.resolved.length,
    collectedPercentThisMonth: 100 - Math.round((unpaid.reduce((t, f) => t + f.amount, 0) / 520000) * 100),
  };
}

/* ---------- simulated events ---------- */
const newcomers = ["Rashed Karim", "Mim Akter", "Siam Hossain", "Priya Das", "Yasin Arafat", "Nafisa Rahman"] as const;

function nextEvent() {
  const s = state;
  const kind = s.seq % 4;
  if (kind === 0) {
    const sec = sectionsLive(s).find((x) => !x.submitted);
    if (sec) return submitSection(sec.section);
  }
  if (kind === 1 || kind === 0) {
    const f = feesLive(s).find((x) => x.status !== "Paid" && (x.status === "Overdue" || s.seq % 2 === 0));
    if (f) return payInvoice(f.invoice, false);
  }
  if (kind === 2) {
    const n = newcomers[s.newApps.length % newcomers.length];
    const id = `APP-26-${100 + s.newApps.length}`;
    const docs = Object.fromEntries(requiredDocs.map((d, i) => [d, i < 3])) as Application["docs"];
    set((x) => ({ newApps: [{ id, applicant: n, appliedClass: 6 + (x.newApps.length % 4), guardian: `Guardian of ${n.split(" ")[0]}`, appliedOn: "11 Oct 2026", stage: "Applied", docs }, ...x.newApps] }));
    return log("admission", `New application: ${n}, Class ${6 + ((state.newApps.length - 1) % 4)}`);
  }
  const app = applicationsLive(s).find((a) => !complete(a) && a.stage === "Documents pending" && !(s.docsGot[a.id]?.length));
  if (app) return receiveDoc(app.id);
  const f = feesLive(s).find((x) => x.status !== "Paid");
  if (f) return payInvoice(f.invoice, false);
}

function submitSection(section: string, byReminder = false) {
  const sec = attendanceBySection.find((x) => x.section === section)!;
  if (state.submitted.includes(section)) return;
  set((s) => ({ submitted: [...s.submitted, section] }));
  log("attendance", `${sec.teacher} submitted attendance for ${section}${byReminder ? " after the reminder" : ""} (${sec.present}/${sec.total} present)`);
}

function payInvoice(invoice: string, afterReminder: boolean) {
  const f = feeRecords.find((x) => x.invoice === invoice);
  if (!f || state.paid.includes(invoice)) return;
  set((s) => ({ paid: [...s.paid, invoice] }));
  log("fee", `Payment received: ৳${f.amount.toLocaleString("en-US")} from ${f.student}, Class ${f.cls}${f.section}${afterReminder ? " (after reminder)" : ""}`);
}

function receiveDoc(appId: string) {
  const a = applicationsLive(state).find((x) => x.id === appId);
  const missing = a && requiredDocs.find((d) => !a.docs[d]);
  if (!a || !missing) return;
  set((s) => ({ docsGot: { ...s.docsGot, [appId]: [...(s.docsGot[appId] ?? []), missing] } }));
  log("admission", `${a.guardian} sent the ${missing.toLowerCase()} for ${a.applicant}`);
}

/* ---------- actions ---------- */
export const actions = {
  remindSections(sections: string[]) {
    const fresh = sections.filter((x) => !state.reminded.includes(x));
    set((s) => ({ reminded: [...s.reminded, ...fresh] }));
    log("system", `Reminder sent to ${sections.length} class teacher${sections.length === 1 ? "" : "s"}`, false);
    fresh.forEach((sec, i) => setTimeout(() => submitSection(sec, true), 3500 + i * 2600));
  },
  remindInvoices(invoices: string[]) {
    set((s) => ({ invoicesReminded: [...new Set([...s.invoicesReminded, ...invoices])] }));
    log("system", `Fee reminder sent to ${invoices.length} guardian${invoices.length === 1 ? "" : "s"}`, false);
    invoices.filter((_, i) => i % 3 === 0).forEach((inv, i) => setTimeout(() => payInvoice(inv, true), 6000 + i * 3500));
  },
  recordPayments(invoices: string[]) {
    invoices.forEach((inv) => payInvoice(inv, false));
  },
  setStage(id: string, stage: Stage) {
    const a = applicationsLive(state).find((x) => x.id === id);
    set((s) => ({ stages: { ...s.stages, [id]: stage } }));
    if (a) log("admission", `${a.applicant} ${stage === "Approved" ? "approved" : stage === "Rejected" ? "declined" : `moved to ${stage}`}`, false);
  },
  requestDocs(ids: string[]) {
    set((s) => ({ docsAsked: [...new Set([...s.docsAsked, ...ids])] }));
    log("system", `Document request sent for ${ids.length} applicant${ids.length === 1 ? "" : "s"}`, false);
    ids.slice(0, 3).forEach((id, i) => setTimeout(() => receiveDoc(id), 5000 + i * 3500));
  },
  addNotice(n: Notice) {
    set((s) => ({ notices: [n, ...s.notices] }));
    log("notice", `Notice ${n.status === "Draft" ? "saved as draft" : "published"}: ${n.title}`, false);
  },
  resolveConflict(id: string) {
    set((s) => ({ resolved: [...s.resolved, id] }));
    log("system", "Timetable conflict resolved; affected teachers notified", false);
  },
  coverStaff(id: string) {
    const m = staff.find((x) => x.id === id);
    set((s) => ({ cover: [...s.cover, id] }));
    if (m) log("system", `Cover arranged for ${m.name}`, false);
  },
  markRead: () => set(() => ({ unread: 0 })),
  togglePause: () => set((s) => ({ paused: !s.paused })),
};

export const allNotices = (s: LiveState): Notice[] => [...s.notices, ...baseNotices];

/* ---------- hooks ---------- */
function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    timer = setInterval(() => {
      set((s) => ({ tick: s.tick + 1 }));
      if (!state.paused && state.tick % 2 === 0) {
        set((s) => ({ seq: s.seq + 1 }));
        nextEvent();
      }
    }, 3500);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export function useLive() {
  return useSyncExternalStore(subscribe, () => state, () => initial);
}

/** Re-renders every few seconds so relative times stay fresh. */
export function useRelativeTime() {
  const [, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((n) => n + 1), 5000);
    return () => clearInterval(t);
  }, []);
  return (a: Activity) => {
    if (a.at === null) return a.label ?? "";
    const sec = Math.max(0, Math.round((Date.now() - a.at) / 1000));
    return sec < 8 ? "just now" : sec < 60 ? `${sec}s ago` : `${Math.round(sec / 60)} min ago`;
  };
}
