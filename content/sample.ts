// Illustrative sample data shown in product previews. Not real institutions or students.

export const notices = [
  { date: "12 Oct", category: "Examinations", title: "Half-yearly examination routine published for Classes VI to X" },
  { date: "10 Oct", category: "Fees", title: "Tuition fees for the third term are due by 20 October" },
  { date: "08 Oct", category: "Holiday", title: "Institution closed on Thursday for a public holiday" },
  { date: "05 Oct", category: "Admissions", title: "Interviews for Class VI applicants begin on 15 October" },
] as const;

export const calendar = [
  { day: "18", month: "Oct", name: "Science fair", kind: "Event" },
  { day: "25", month: "Oct", name: "Parent-teacher meeting", kind: "Meeting" },
  { day: "02", month: "Nov", name: "Annual sports day", kind: "Event" },
  { day: "16", month: "Nov", name: "Half-yearly examination begins", kind: "Examination" },
] as const;

export const resultsMeta = {
  caption: "Half-yearly examination · Class VIII · Section A",
  subjects: ["Bangla", "English", "Mathematics", "Science"],
} as const;

export const results = [
  { roll: 1, name: "Ayesha Rahman", marks: [92, 88, 96, 90], gpa: "5.00", grade: "A+" },
  { roll: 2, name: "Tahmid Hasan", marks: [84, 79, 90, 86], gpa: "4.83", grade: "A+" },
  { roll: 3, name: "Sadia Akter", marks: [76, 81, 72, 78], gpa: "4.33", grade: "A" },
  { roll: 4, name: "Imran Hossain", marks: [68, 70, 64, 71], gpa: "3.67", grade: "A-" },
] as const;

export const admissionSteps = [
  { title: "Application", text: "Families apply online or at the office. Every enquiry is logged automatically." },
  { title: "Review", text: "Staff check documents and mark each applicant's status in one shared list." },
  { title: "Interview", text: "Schedule interviews and record outcomes without a separate spreadsheet." },
  { title: "Enrolment", text: "Accepted applicants become student records, ready for the first day." },
] as const;

export const register = [
  { roll: 1, name: "Ayesha Rahman", present: true },
  { roll: 2, name: "Tahmid Hasan", present: true },
  { roll: 3, name: "Nusrat Jahan", present: false },
  { roll: 4, name: "Imran Hossain", present: true },
  { roll: 5, name: "Sadia Akter", present: true },
] as const;
