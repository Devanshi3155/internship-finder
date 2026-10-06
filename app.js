// Internship board. Data -> filter -> render.

const internships = [
  { id: 1,  title: "Frontend Developer Intern", company: "Pixelforge Labs",  domain: "Web Development", mode: "Remote",  city: "Ahmedabad",   stipend: "10,000", months: 3, days: 1,  skills: ["HTML", "CSS", "JavaScript"], about: "Build responsive pages from design files and fix UI bugs with a mentor." },
  { id: 2,  title: "React Developer Intern",    company: "Northwind Apps",   domain: "Web Development", mode: "Hybrid",  city: "Gandhinagar", stipend: "15,000", months: 6, days: 2,  skills: ["React", "Git", "REST APIs"], about: "Work on a dashboard used by small retailers. Code review every week." },
  { id: 3,  title: "Node.js Backend Intern",    company: "Stackyard",        domain: "Web Development", mode: "On-site", city: "Surat",       stipend: "12,000", months: 4, days: 4,  skills: ["Node.js", "MongoDB", "APIs"], about: "Design and test API endpoints for an order tracking service." },
  { id: 4,  title: "Data Analyst Intern",       company: "Datakite",         domain: "Data Science",    mode: "Remote",  city: "Pune",        stipend: "8,000",  months: 3, days: 3,  skills: ["Excel", "SQL", "Python"], about: "Clean datasets, make charts and write short insight summaries." },
  { id: 5,  title: "Machine Learning Intern",   company: "Neuronest",        domain: "Data Science",    mode: "Hybrid",  city: "Bengaluru",   stipend: "20,000", months: 6, days: 1,  skills: ["Python", "scikit-learn", "Pandas"], about: "Train and test simple models on real customer data." },
  { id: 6,  title: "UI/UX Design Intern",       company: "Figtree Studio",   domain: "Design",          mode: "Remote",  city: "Mumbai",      stipend: "9,000",  months: 3, days: 5,  skills: ["Figma", "Wireframing"], about: "Create wireframes and test them with five real users." },
  { id: 7,  title: "Graphic Design Intern",     company: "Brightleaf Media", domain: "Design",          mode: "On-site", city: "Vadodara",    stipend: "6,000",  months: 2, days: 6,  skills: ["Canva", "Photoshop"], about: "Design social posts and posters for local brands." },
  { id: 8,  title: "Android App Intern",        company: "Appsmith Works",   domain: "Mobile",          mode: "Hybrid",  city: "Rajkot",      stipend: "12,000", months: 4, days: 2,  skills: ["Kotlin", "Android Studio"], about: "Add features to a student attendance app and fix crashes." },
  { id: 9,  title: "Flutter Developer Intern",  company: "Wavelength Tech",  domain: "Mobile",          mode: "Remote",  city: "Hyderabad",   stipend: "14,000", months: 5, days: 7,  skills: ["Flutter", "Dart", "Firebase"], about: "Build screens and connect them to Firebase." },
  { id: 10, title: "QA Testing Intern",         company: "Checkpoint QA",    domain: "Testing",         mode: "Remote",  city: "Chennai",     stipend: "7,000",  months: 3, days: 3,  skills: ["Test cases", "Selenium"], about: "Write test cases and report bugs with clear steps." },
  { id: 11, title: "Cybersecurity Intern",      company: "Lockbox Security", domain: "Security",        mode: "On-site", city: "Noida",       stipend: "10,000", months: 3, days: 8,  skills: ["Networking", "Linux"], about: "Help with vulnerability scans and write short reports." },
  { id: 12, title: "Content Writing Intern",    company: "Inkwell Digital",  domain: "Marketing",       mode: "Remote",  city: "Jaipur",      stipend: "5,000",  months: 2, days: 9,  skills: ["Writing", "SEO basics"], about: "Write blog posts and product descriptions for tech clients." }
];

const colors = ["#1757b8", "#0b6b3a", "#8e3b9e", "#c2410c", "#0f766e", "#b3261e"];

const searchBox = document.getElementById("search");
const domainBox = document.getElementById("domain");
const modeBox = document.getElementById("mode");
const savedBox = document.getElementById("savedOnly");
const listEl = document.getElementById("results");
const statusEl = document.getElementById("status");
const messageEl = document.getElementById("message");

let data = [];
let saved = [];
try { saved = JSON.parse(localStorage.getItem("saved")) || []; } catch (e) { saved = []; }

function loadData() {
  // add ?error=1 to the url to see the error state
  if (location.search.includes("error")) {
    showError();
    return;
  }
  data = internships;
  const domains = [...new Set(data.map(d => d.domain))].sort();
  domains.forEach(d => domainBox.append(new Option(d, d)));
  render();
}

function filterData() {
  const q = searchBox.value.trim().toLowerCase();
  return data.filter(i => {
    const text = (i.title + " " + i.company + " " + i.city + " " + i.skills.join(" ")).toLowerCase();
    if (q && !text.includes(q)) return false;
    if (domainBox.value && i.domain !== domainBox.value) return false;
    if (modeBox.value && i.mode !== modeBox.value) return false;
    if (savedBox.checked && !saved.includes(i.id)) return false;
    return true;
  });
}

function make(tag, text, cls) {
  const e = document.createElement(tag);
  if (text) e.textContent = text;
  if (cls) e.className = cls;
  return e;
}

function makeJob(i) {
  const li = make("li");
  const job = make("article", "", "job");

  const logo = make("div", i.company[0], "logobox");
  logo.style.background = colors[i.id % colors.length];
  logo.setAttribute("aria-hidden", "true");

  const body = make("div");
  body.append(make("h2", i.title), make("p", i.company, "company"));

  const info = make("p", "", "info");
  const pay = make("b", "₹" + i.stipend + "/month");
  info.append(pay, ` | ${i.mode} | ${i.city} | ${i.months} months | ${i.domain}`);
  body.append(info, make("p", "Skills: " + i.skills.join(", "), "skills"));
  body.append(make("p", i.days === 1 ? "Posted 1 day ago" : `Posted ${i.days} days ago`, "posted"));

  const about = make("p", i.about, "about");
  about.id = "about-" + i.id;
  about.hidden = true;
  body.append(about);

  const more = make("button", "View details", "btn primary");
  more.type = "button";
  more.setAttribute("aria-expanded", "false");
  more.setAttribute("aria-controls", about.id);
  more.onclick = () => {
    const open = about.hidden;
    about.hidden = !open;
    more.setAttribute("aria-expanded", String(open));
    more.textContent = open ? "Hide details" : "View details";
  };

  const save = make("button", saved.includes(i.id) ? "Saved" : "Save", "btn");
  save.type = "button";
  save.setAttribute("aria-pressed", String(saved.includes(i.id)));
  save.setAttribute("aria-label", "Save " + i.title + " at " + i.company);
  save.onclick = () => toggleSave(i.id, save);

  const actions = make("div", "", "actions");
  actions.append(more, save);
  body.append(actions);

  job.append(logo, body);
  li.append(job);
  return li;
}

function toggleSave(id, btn) {
  if (saved.includes(id)) saved = saved.filter(x => x !== id);
  else saved.push(id);
  try { localStorage.setItem("saved", JSON.stringify(saved)); } catch (e) {}
  if (savedBox.checked) return render();
  const on = saved.includes(id);
  btn.setAttribute("aria-pressed", String(on));
  btn.textContent = on ? "Saved" : "Save";
}

function render() {
  const result = filterData();
  listEl.replaceChildren(...result.map(makeJob));
  listEl.hidden = result.length === 0;
  messageEl.hidden = true;
  statusEl.textContent = `Showing ${result.length} of ${data.length} internships`;
  if (result.length === 0) showEmpty();
}

function showEmpty() {
  const btn = make("button", "Reset filters", "btn primary");
  btn.type = "button";
  btn.onclick = resetFilters;
  messageEl.className = "message";
  messageEl.replaceChildren(
    make("h2", "No internships found"),
    make("p", "Try a different keyword or remove a filter."),
    btn
  );
  messageEl.hidden = false;
}

function showError() {
  const btn = make("button", "Try again", "btn primary");
  btn.type = "button";
  btn.onclick = () => { location.href = location.pathname; };
  messageEl.className = "message error";
  messageEl.setAttribute("role", "alert");
  messageEl.replaceChildren(
    make("h2", "Could not load internships"),
    make("p", "Check your connection and try again."),
    btn
  );
  messageEl.hidden = false;
}

function resetFilters() {
  searchBox.value = "";
  domainBox.value = "";
  modeBox.value = "";
  savedBox.checked = false;
  render();
  searchBox.focus();
}

document.getElementById("filters").addEventListener("input", render);
document.getElementById("filters").addEventListener("change", render);
document.getElementById("filters").addEventListener("submit", e => e.preventDefault());
document.getElementById("clear").addEventListener("click", resetFilters);

loadData();
