// Sample institution data for the product prototype. Fictional people and numbers, generated deterministically.

export const institution = { name: "Greenfield High School", today: "Sunday, 11 October 2026" };

const hash = (n: number) => ((Math.imul(n + 1, 2654435761) >>> 0) % 1000) / 1000;
const pick = <T,>(arr: readonly T[], n: number) => arr[Math.floor(hash(n) * arr.length)];
const pad = (n: number, w = 4) => String(n).padStart(w, "0");

const firstNames = ["Ayesha", "Tahmid", "Nusrat", "Imran", "Sadia", "Rafiq", "Maliha", "Zayan", "Tasnim", "Arif", "Farhana", "Shafin", "Mehnaz", "Rakib", "Laila", "Nabil", "Sumaiya", "Fahim", "Anika", "Sakib", "Ruhi", "Tanvir", "Samira", "Ishraq"] as const;
const lastNames = ["Rahman", "Hasan", "Akter", "Hossain", "Chowdhury", "Islam", "Khan", "Ahmed", "Begum", "Sarker"] as const;
const guardianFirst = ["Abdul", "Mizanur", "Shahida", "Kamal", "Rehana", "Jahangir", "Nazma", "Harun", "Salma", "Faruk"] as const;

export type FeeStatus = "Paid" | "Due" | "Overdue";

export type Student = {
  id: string;
  name: string;
  cls: number;
  section: "A" | "B";
  roll: number;
  guardian: string;
  phone: string;
  attendance: number; // percent this term
  absentToday: boolean;
  feeStatus: FeeStatus;
  tuition: number;
  monthsOwed: number;
};

const tuitionByClass: Record<number, number> = { 6: 1200, 7: 1300, 8: 1400, 9: 1600, 10: 1800 };

export const students: Student[] = [];
{
  let n = 0;
  for (const cls of [6, 7, 8, 9, 10]) {
    for (const section of ["A", "B"] as const) {
      for (let roll = 1; roll <= 24; roll++) {
        n++;
        const last = lastNames[(Math.floor(n / 24) * 3 + (n % 24)) % 10];
        const r = hash(n * 7);
        // Class 10 carries more outstanding fees.
        const overdueCut = cls === 10 ? 0.24 : cls === 9 ? 0.14 : 0.08;
        const feeStatus: FeeStatus = r < overdueCut ? "Overdue" : r < overdueCut + 0.22 ? "Due" : "Paid";
        students.push({
          id: `ST-${pad(n)}`,
          name: `${firstNames[n % 24]} ${last}`,
          cls,
          section,
          roll,
          guardian: `${pick(guardianFirst, n * 11)} ${last}`,
          phone: `01${pick(["7", "8", "9", "5"], n)}${pad(Math.floor(hash(n * 13) * 9000) + 1000)}••••`,
          attendance: Math.round(78 + hash(n * 17) * 21),
          absentToday: hash(n * 19 + 777) < 0.075,
          feeStatus,
          tuition: tuitionByClass[cls],
          monthsOwed: feeStatus === "Overdue" ? 2 + Math.floor(hash(n * 23) * 3) : feeStatus === "Due" ? 1 : 0,
        });
      }
    }
  }
}

/* Teachers and staff */
export type StaffMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  classTeacherOf?: string; // e.g. "9A"
  today: "Present" | "Late" | "On leave" | "Absent";
};

const teacherSeeds: [string, string, string][] = [
  ["Mr. Karim Uddin", "Mathematics", "Mathematics"], ["Ms. Rehana Parvin", "English", "Languages"], ["Mr. Anwar Hossain", "Physics", "Science"],
  ["Ms. Shirin Akter", "Chemistry", "Science"], ["Mr. Delwar Hossain", "Biology", "Science"], ["Ms. Nasrin Sultana", "Bangla", "Languages"],
  ["Mr. Habib Rahman", "ICT", "Computing"], ["Ms. Farzana Islam", "Social Science", "Humanities"], ["Mr. Mahbub Alam", "Mathematics", "Mathematics"],
  ["Ms. Tahmina Khatun", "English", "Languages"], ["Mr. Saiful Islam", "Physics", "Science"], ["Ms. Lutfun Nahar", "Religion", "Humanities"],
  ["Mr. Zahid Hasan", "Physical Education", "Activities"], ["Ms. Rokeya Begum", "Bangla", "Languages"], ["Mr. Nurul Amin", "Chemistry", "Science"],
  ["Ms. Moushumi Das", "Art", "Activities"], ["Mr. Shahed Ali", "Biology", "Science"], ["Ms. Jesmin Ara", "ICT", "Computing"],
];

export const sectionKeys = ["6A", "6B", "7A", "7B", "8A", "8B", "9A", "9B", "10A", "10B"] as const;

export const staff: StaffMember[] = teacherSeeds.map(([name, role, department], i): StaffMember => ({
  id: `TC-${pad(i + 1, 3)}`,
  name,
  role: `${role} teacher`,
  department,
  classTeacherOf: sectionKeys[i],
  today: i === 3 ? "On leave" : i === 11 ? "Late" : i === 13 ? "Absent" : "Present",
})).concat(
  (
    [["Ms. Salma Khatun", "Accounts officer", "Administration"], ["Mr. Rubel Mia", "Office assistant", "Administration"], ["Ms. Dilruba Yasmin", "Librarian", "Library"], ["Mr. Alamgir Kabir", "IT support", "Administration"]] as const
  ).map(([name, role, department], i): StaffMember => ({ id: `OF-${pad(i + 1, 3)}`, name, role, department, today: "Present" })),
);

/* Attendance register status by section */
export type SectionAttendance = {
  section: (typeof sectionKeys)[number];
  teacher: string;
  total: number;
  present: number;
  absent: number;
  submitted: boolean;
};

const notSubmitted = new Set(["7A", "8B", "9B", "10A"]);
export const attendanceBySection: SectionAttendance[] = sectionKeys.map((section, i) => {
  const cls = Number(section.slice(0, -1));
  const sec = section.slice(-1);
  const group = students.filter((s) => s.cls === cls && s.section === sec);
  const absent = group.filter((s) => s.absentToday).length;
  return {
    section,
    teacher: staff[i].name,
    total: group.length,
    present: group.length - absent,
    absent,
    submitted: !notSubmitted.has(section),
  };
});

/* Fee collection by class (for the finance view) */
export const feesByClass = [6, 7, 8, 9, 10].map((cls) => {
  const group = students.filter((s) => s.cls === cls);
  const billed = group.reduce((t, s) => t + s.tuition * 3, 0); // three months billed this term
  const outstanding = group.reduce((t, s) => t + s.tuition * s.monthsOwed, 0);
  return { cls, billed, outstanding, percent: Math.round((outstanding / billed) * 100) };
});

export type FeeRecord = {
  invoice: string;
  studentId: string;
  student: string;
  cls: number;
  section: string;
  amount: number;
  status: FeeStatus;
  dueDate: string;
  daysOverdue: number;
};

export const feeRecords: FeeRecord[] = students
  .filter((s) => s.feeStatus !== "Paid")
  .map((s, i) => ({
    invoice: `INV-26-${pad(1000 + i)}`,
    studentId: s.id,
    student: s.name,
    cls: s.cls,
    section: s.section,
    amount: s.tuition * s.monthsOwed,
    status: s.feeStatus,
    dueDate: s.feeStatus === "Overdue" ? `${String(1 + Math.floor(hash(i * 3) * 8)).padStart(2, "0")} Sep 2026` : "20 Oct 2026",
    daysOverdue: s.feeStatus === "Overdue" ? 10 + Math.floor(hash(i * 5) * 40) : 0,
  }));

/* Admissions */
export type Stage = "Applied" | "Under review" | "Documents pending" | "Interview" | "Pending approval" | "Approved" | "Rejected";
export const stages: Stage[] = ["Applied", "Under review", "Documents pending", "Interview", "Pending approval", "Approved", "Rejected"];
export const requiredDocs = ["Birth certificate", "Previous marksheet", "Photograph", "Guardian ID"] as const;

export type Application = {
  id: string;
  applicant: string;
  appliedClass: number;
  guardian: string;
  appliedOn: string;
  stage: Stage;
  docs: Record<(typeof requiredDocs)[number], boolean>;
};

const stagePlan: [Stage, number][] = [["Applied", 6], ["Under review", 8], ["Documents pending", 9], ["Interview", 6], ["Pending approval", 7], ["Approved", 6], ["Rejected", 2]];
export const applications: Application[] = [];
{
  let n = 0;
  for (const [stage, count] of stagePlan) {
    for (let k = 0; k < count; k++) {
      n++;
      const last = pick(lastNames, n * 29);
      const missing =
        stage === "Documents pending" ? 1 + (k % 2) : (stage === "Under review" && k < 5) || (stage === "Applied" && k < 4) ? 1 : 0;
      const docs = Object.fromEntries(requiredDocs.map((d, di) => [d, !(missing > 0 && di >= requiredDocs.length - missing)])) as Application["docs"];
      applications.push({
        id: `APP-26-${pad(n, 3)}`,
        applicant: `${pick(firstNames, n * 31)} ${last}`,
        appliedClass: 6 + (n % 4),
        guardian: `${pick(guardianFirst, n * 37)} ${last}`,
        appliedOn: `${String(1 + ((n * 2) % 28)).padStart(2, "0")} Oct 2026`,
        stage,
        docs,
      });
    }
  }
}
export const docsComplete = (a: Application) => requiredDocs.every((d) => a.docs[d]);

/* Notices */
export type Notice = { id: string; title: string; audience: string; status: "Published" | "Scheduled" | "Draft"; date: string; reach: string };
export const notices: Notice[] = [
  { id: "N-101", title: "Half-yearly examination routine, Classes 6 to 10", audience: "All students and parents", status: "Published", date: "10 Oct", reach: "1,102 of 1,160 read" },
  { id: "N-100", title: "Tuition fee payment deadline: 20 October", audience: "Parents", status: "Published", date: "08 Oct", reach: "512 of 480 reached" },
  { id: "N-099", title: "Parent-teacher meeting for Classes 9 and 10", audience: "Classes 9 to 10", status: "Scheduled", date: "Publishes 12 Oct", reach: "Not sent yet" },
  { id: "N-098", title: "Science fair registration", audience: "Classes 8 to 10", status: "Published", date: "05 Oct", reach: "301 of 360 read" },
  { id: "N-097", title: "Staff meeting: attendance procedure", audience: "Teachers", status: "Draft", date: "Edited 04 Oct", reach: "Draft" },
  { id: "N-096", title: "Public holiday on Thursday", audience: "Everyone", status: "Published", date: "02 Oct", reach: "1,380 of 1,402 read" },
];

/* Timetable */
export const timetableConflicts = [
  { id: "C-1", title: "Room 204 is double-booked", detail: "Monday 10:00 AM: Class 9A Physics and Class 8B Mathematics", fix: ["Move Class 8B Mathematics to Room 206 (free)", "Swap Class 8B Mathematics with Tuesday 10:00 AM"] },
  { id: "C-2", title: "Teacher assigned to two classes at once", detail: "Mr. Karim Uddin, Tuesday 11:30 AM: Class 7A and Class 9B", fix: ["Assign Mr. Mahbub Alam to Class 9B for this period", "Move Class 9B to Wednesday 11:30 AM"] },
] as const;

export const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu"] as const;
export const periods = ["08:30", "09:20", "10:10", "11:30", "12:20", "01:10"] as const;
export const timetable9A: { subject: string; teacher: string; room: string; conflict?: boolean }[][] = weekDays.map((_, d) =>
  periods.map((_, p) => {
    const subjects = ["Mathematics", "English", "Physics", "Bangla", "Chemistry", "ICT", "Biology", "Social Science"];
    const subject = subjects[(d * 3 + p * 2) % subjects.length];
    return { subject, teacher: staff[(d + p) % 12].name.replace(/^(Mr|Ms)\. /, ""), room: `Room ${201 + ((d + p) % 8)}`, conflict: d === 1 && p === 2 };
  }),
);

/* Exams */
export const exams = [
  { name: "Half-yearly examination", dates: "16 to 26 Nov", classes: "Classes 6 to 10", state: "Routine published" },
  { name: "Class 10 model test", dates: "02 Nov", classes: "Class 10", state: "Marks entry open" },
] as const;

/* Derived dashboard figures */
export const overview = (() => {
  const submitted = attendanceBySection.filter((s) => s.submitted);
  const present = submitted.reduce((t, s) => t + s.present, 0);
  const absent = submitted.reduce((t, s) => t + s.absent, 0);
  const overdue = feeRecords.filter((f) => f.status === "Overdue");
  const pending = applications.filter((a) => a.stage === "Pending approval").length;
  const incomplete = applications.filter((a) => !docsComplete(a) && !["Approved", "Rejected"].includes(a.stage)).length;
  const staffAbsent = staff.filter((s) => s.today === "Absent" || s.today === "On leave").length;
  return {
    students: students.length,
    present,
    absent,
    submittedSections: submitted.length,
    totalSections: attendanceBySection.length,
    notSubmitted: attendanceBySection.filter((s) => !s.submitted),
    overdueCount: overdue.length,
    overdueAmount: overdue.reduce((t, f) => t + f.amount, 0),
    pendingFees: feeRecords.reduce((t, f) => t + f.amount, 0),
    newApplications: applications.filter((a) => a.stage === "Applied").length,
    pendingApprovals: pending,
    incompleteDocs: incomplete,
    staffAbsent,
    staffTotal: staff.length,
    worstFeeClass: [...feesByClass].sort((a, b) => b.percent - a.percent)[0],
  };
})();

export const taka = (n: number) => `৳${n.toLocaleString("en-US")}`;
