export const SITE = {
  name: "Karnataka State Rifle Association",
  short: "K.S.R.A",
  tagline: "Where Karnataka's champions take aim.",
  phone: "91485 19777",
  emails: ["helpdesk@ksra.in", "ksrajnr@yahoo.com"],
  gstin: "29AAAAK1499E1ZJ",
  rangeAddress:
    "Sports Authority of India Shooting Range, SAI Complex, Bangalore University Campus, Mysore Road, Bengaluru – 560 056",
  officeAddress:
    "Karnataka State Rifle Association, SAI Shooting Range, SAI Complex, Bangalore University Campus, Mysore Road, Bengaluru – 560 056",
  facebook: "https://www.facebook.com/share/1AgpXPiS4v/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/ksra_official",
  legacy: "http://theksra.co.in",
};

export const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Introduction", href: "/about" },
      { label: "History & Milestones", href: "/about#history" },
      { label: "Governing Body", href: "/about#governance" },
      { label: "Affiliated Clubs", href: "/about#clubs" },
    ],
  },
  {
    label: "Facilities",
    href: "/facilities",
    children: [
      { label: "10m Air Rifle & Pistol", href: "/facilities#air" },
      { label: "25 / 50m Range", href: "/facilities#range" },
      { label: "Trap & Skeet", href: "/facilities#trap" },
      { label: "Training & Coaching", href: "/facilities#training" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Results", href: "/results" },
  { label: "Gallery", href: "/gallery" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: 1997, label: "Range established", format: "year" },
  { value: 4, label: "World-class ranges", suffix: "" },
  { value: 24, label: "International medallists felicitated", suffix: "+" },
  { value: 50, label: "Metre outdoor range", suffix: "m" },
];

export const FACILITIES = [
  {
    id: "air",
    title: "10m Air Rifle & Pistol Range",
    distance: "10m",
    blurb:
      "A climate-controlled indoor range with electronic target scoring, built to ISSF specifications for air rifle and air pistol disciplines.",
    points: ["Electronic scoring targets", "Indoor, all-weather", "Junior & senior lanes", "Live score display"],
  },
  {
    id: "range",
    title: "25 / 50m Range",
    distance: "50m",
    blurb:
      "The 50m rifle and 25m pistol ranges were re-designed and merged for easy monitoring, hosting state and national level championships.",
    points: ["50m rifle prone & 3P", "25m rapid-fire & sport pistol", "Spectator & media areas", "Equipment control area"],
  },
  {
    id: "trap",
    title: "Trap & Skeet Range",
    distance: "TRAP",
    blurb:
      "Shotgun disciplines are catered for with a dedicated Trap & Skeet range within the Sports Authority of India complex.",
    points: ["Trap & Skeet fields", "Shotgun coaching", "Selection trials", "Practice sessions"],
  },
  {
    id: "training",
    title: "Competition Training & Coaching Camps",
    distance: "CAMP",
    blurb:
      "Structured coaching camps and competition training with guidance from senior shooters and visiting National Squad members.",
    points: ["Coaching camps", "Competition preparation", "National squad interaction", "Performance analysis"],
  },
  {
    id: "weapon",
    title: "Weapon Training Centre",
    distance: "CRTC",
    blurb:
      "K.S.R.A. imparts training in safe weapon handling under the Civilian Rifle Training Course for interested citizens.",
    points: ["Civilian Rifle Training Course", "Safety-first handling", "Certified instructors", "Open to all segments"],
  },
  {
    id: "ammo",
    title: "Weapons, Ammunition & Extras",
    distance: "GEAR",
    blurb:
      "The Association works to procure world-class guns and ammunition, with changing areas and support amenities for shooters.",
    points: ["Guns & ammunition support", "Shooter changing areas", "Gun & equipment control", "Additional amenities"],
  },
];

export const TIMELINE = [
  { year: "1997", title: "Range inaugurated", text: "A full-fledged shooting complex — 50m, 25m pistol, 10m indoor air gun and Trap & Skeet — opens at the Sports Authority of India complex in May." },
  { year: "2008", title: "Mega upgrade begins", text: "Post the 52nd N.S.C.C., SAI launches a mega-plan to re-design the Jagdale N Radhakrishna Shooting Range, SAI South." },
  { year: "2009–11", title: "International standards", text: "All ranges renovated with state-of-the-art electronic target shooting equipment to match international standards." },
  { year: "2025", title: "Hosting the nation", text: "K.S.R.A. hosts the 13th Karnataka State Shooting Competition & Championship and the 68th National Shooting Championship (Pistol & Rifle)." },
];

export const GOVERNANCE = [
  {
    title: "K.S.R.A – Forecast",
    text: "The present K.S.R.A shooters are a force to reckon with, consistently improving scores and medal tallies at national championships. The Association is making every effort to procure world-class ammunition and guns, and with senior-shooter experience and regular tips from visiting National Squad members, the Karnataka team is improving in leaps and bounds. K.S.R.A. is planning to expand its services to reach all segments of people and uncover hidden talent.",
  },
  {
    title: "K.S.R.A – Upgrade of Range & Facilities",
    text: "All three ranges — 50m, 25m and 10m indoor — were merged for easy access to monitor and conduct shooting programmes, with targets and facilities upgraded to international standards. The complex was restructured to better accommodate shooters, changing areas, spectators, and gun & equipment control.",
  },
];

export const CLUBS_NOTE =
  "K.S.R.A. works with affiliated units and clubs across Karnataka. The official affiliated list is maintained by the Association office.";

export const ALBUMS_SEED = [
  { title: "68th National Shooting Championship — Pistol & Rifle 2025", cover: "/ref/91.jpg", year: 2025, category: "National" },
  { title: "Felicitation Ceremony for 24 International & many National Medal Winners", cover: "/ref/71.jpeg", year: 2025, category: "Ceremony" },
  { title: "13th KSCC 2025", cover: "/ref/26.jpeg", year: 2025, category: "State" },
  { title: "Felicitation Ceremony", cover: "/ref/62.jpeg", year: 2024, category: "Ceremony" },
  { title: "Shooting", cover: "/ref/44.jpeg", year: 2024, category: "Training" },
  { title: "Shooting Competition & Championship", cover: "/ref/39.jpeg", year: 2024, category: "State" },
];

export const NOTICES_SEED = [
  { title: "13th Karnataka State Shooting Competition & Championship 2025", category: "Championship", body: "The 13th KSCC was held from 1st to 21st July 2025 at the Sports Authority of India Shooting Range and Bangalore University Shooting Range, welcoming all shooters, parents and coaches.", href: null, pinned: true, publishedAt: "2025-07-01" },
  { title: "68th National Shooting Championship — Pistol & Rifle", category: "National", body: "Karnataka State Rifle Association proudly hosted the 68th National Shooting Championship for pistol and rifle events in 2025.", href: null, pinned: true, publishedAt: "2025-06-15" },
  { title: "Felicitation for International & National Medal Winners", category: "Ceremony", body: "A felicitation ceremony honoured 24 international and many national medal winners from Karnataka.", href: null, pinned: false, publishedAt: "2025-05-20" },
  { title: "Prevention of Age Fraud", category: "Policy", body: "Guidelines and notices regarding prevention of age fraud in competitive shooting.", href: "http://theksra.co.in/topmenupage.php?pagename=8", pinned: false, publishedAt: "2025-04-10" },
  { title: "POSH Act Complaint Committee", category: "Policy", body: "Details of the Complaint Committee constituted under the POSH Act.", href: "http://theksra.co.in/topmenupage.php?pagename=9", pinned: false, publishedAt: "2025-03-05" },
  { title: "ADM Sanction", category: "Notice", body: "Information on ADM sanction for shooting events and competitions.", href: "http://theksra.co.in/topmenupage.php?pagename=7", pinned: false, publishedAt: "2025-02-18" },
  { title: "Shooting League of India", category: "League", body: "Updates and information about the Shooting League of India.", href: "http://theksra.co.in/topmenupage.php?pagename=6", pinned: false, publishedAt: "2025-01-22" },
];

export const EVENTS_SEED = [
  { title: "13th Karnataka State Shooting Competition & Championship", category: "Rifle / Pistol", level: "State", venue: "SAI Shooting Range & Bangalore University Shooting Range", description: "The flagship state championship across rifle and pistol disciplines for junior, youth and senior categories.", startDate: "2025-07-01", endDate: "2025-07-21" },
  { title: "68th National Shooting Championship (Pistol & Rifle)", category: "Rifle / Pistol", level: "National", venue: "Bengaluru", description: "India's top shooters converge in Bengaluru for the national championship in pistol and rifle events.", startDate: "2025-01-10", endDate: "2025-01-24" },
  { title: "Felicitation Ceremony — Medal Winners", category: "Ceremony", level: "State", venue: "Bengaluru", description: "An evening honouring 24 international and many national medal winners from Karnataka.", startDate: "2025-05-20", endDate: null },
  { title: "Civilian Rifle Training Course", category: "Training", level: "Open", venue: "SAI Shooting Range, Bengaluru", description: "Safe weapon-handling and marksmanship fundamentals for civilians, led by certified instructors.", startDate: "2026-06-15", endDate: "2026-06-20" },
  { title: "Junior Coaching Camp", category: "Training", level: "State", venue: "SAI Shooting Range, Bengaluru", description: "Intensive camp for rising juniors with coaching, scoring analysis and mental-skills sessions.", startDate: "2026-07-06", endDate: "2026-07-18" },
  { title: "State Trap & Skeet Selection Trials", category: "Shotgun", level: "State", venue: "SAI Trap & Skeet Range", description: "Selection trials for the Karnataka shotgun squad ahead of national championships.", startDate: "2026-08-09", endDate: "2026-08-11" },
  { title: "14th Karnataka State Shooting Competition", category: "Rifle / Pistol", level: "State", venue: "SAI Shooting Range, Bengaluru", description: "The next edition of the state championship — registrations open soon.", startDate: "2026-09-14", endDate: "2026-09-28" },
];

export const RESULTS_SEED = [
  { title: "13th Karnataka State Shooting Competition & Championship", year: 2025, discipline: "Rifle / Pistol", level: "State", summary: "Full medal tally and individual scores for all junior, youth and senior categories.", href: "http://theksra.co.in/navigationmenupage.php?pagename=31" },
  { title: "68th National Shooting Championship — Pistol & Rifle", year: 2025, discipline: "Rifle / Pistol", level: "National", summary: "National championship results from the Bengaluru edition, including Karnataka team performances.", href: "http://theksra.co.in/navigationmenupage.php?pagename=24" },
  { title: "State Competitions, Events & Medal Winners", year: 2025, discipline: "All", level: "State", summary: "A running record of Karnataka's state-level competitions and podium finishers.", href: "http://theksra.co.in/navigationmenupage.php?pagename=31" },
  { title: "International Competitions", year: 2025, discipline: "All", level: "International", summary: "Karnataka shooters on the international stage — World Cups, Asian and Commonwealth events.", href: "http://theksra.co.in/navigationmenupage.php?pagename=23" },
  { title: "Shooting Calendar", year: 2026, discipline: "All", level: "National", summary: "The annual national shooting calendar with championship dates and venues.", href: "http://theksra.co.in/navigationmenupage.php?pagename=26" },
];

export const AWARDS = [
  { title: "Jagadale Award", text: "Named after Shri. Jagdale N Radhakrishna, whose name the SAI South shooting range carries.", href: "http://theksra.co.in/navigationmenupage.php?pagename=32" },
  { title: "KOA Award", text: "Karnataka Olympic Association honours for outstanding sportspersons.", href: "http://theksra.co.in/navigationmenupage.php?pagename=33" },
  { title: "Ekalavya Award", text: "The Government of Karnataka's highest sports honour for state athletes.", href: "http://theksra.co.in/navigationmenupage.php?pagename=34" },
];

export const RESOURCES = [
  { group: "Rules & Codes", items: [
    { title: "ISSF Rule Book", href: "http://theksra.co.in/navigationmenupage.php?pagename=10" },
    { title: "ISSF Athletes Handbook", href: "http://theksra.co.in/navigationmenupage.php?pagename=11" },
    { title: "National Sports Code 2011", href: "http://theksra.co.in/navigationmenupage.php?pagename=7" },
    { title: "NRAI Match Book", href: "http://theksra.co.in/navigationmenupage.php?pagename=25" },
  ]},
  { group: "Selection Criteria", items: [
    { title: "Selection Criteria — Pistol", href: "http://theksra.co.in/navigationmenupage.php?pagename=15" },
    { title: "Selection Criteria — Rifle", href: "http://theksra.co.in/navigationmenupage.php?pagename=16" },
    { title: "Selection Criteria — Shotgun", href: "http://theksra.co.in/navigationmenupage.php?pagename=17" },
    { title: "Norms for Aspiring Shooters", href: "http://theksra.co.in/navigationmenupage.php?pagename=13" },
  ]},
  { group: "Competitions", items: [
    { title: "Shooting Events", href: "http://theksra.co.in/navigationmenupage.php?pagename=22" },
    { title: "International", href: "http://theksra.co.in/navigationmenupage.php?pagename=23" },
    { title: "National Competitions", href: "http://theksra.co.in/navigationmenupage.php?pagename=24" },
    { title: "Shooting Calendar", href: "http://theksra.co.in/navigationmenupage.php?pagename=26" },
  ]},
  { group: "Governance & Policy", items: [
    { title: "Constitution of KSRA", href: "http://theksra.co.in/constitution-of-NRAI.php" },
    { title: "Prevention of Age Fraud", href: "http://theksra.co.in/topmenupage.php?pagename=8" },
    { title: "POSH Act Complaint Committee", href: "http://theksra.co.in/topmenupage.php?pagename=9" },
    { title: "Archives", href: "http://theksra.co.in/topmenupage.php?pagename=10" },
  ]},
];

export const DISCIPLINES = [
  "10m Air Rifle",
  "10m Air Pistol",
  "50m Rifle",
  "25m Pistol",
  "Trap",
  "Skeet",
  "Civilian Rifle Training Course",
  "Not sure yet",
];
