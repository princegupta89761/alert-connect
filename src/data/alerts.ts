export type Severity = "high" | "medium" | "low";
export type AlertSource = "Government" | "Police" | "Weather Dept." | "Health Ministry" | "Disaster Mgmt.";
export type AlertStatus = "verified" | "pending";

export type EmergencyAlert = {
  id: string;
  title: string;
  description: string;
  location: string;
  coords: { x: number; y: number }; // 0-100 % on stylized map
  timestamp: string; // ISO
  severity: Severity;
  sources: AlertSource[];
  status: AlertStatus;
  category: "Cyclone" | "Flood" | "Fire" | "Earthquake" | "Heatwave" | "Chemical" | "Traffic" | "Health";
};

const now = Date.now();
const m = (mins: number) => new Date(now - mins * 60_000).toISOString();

export const mockAlerts: EmergencyAlert[] = [
  {
    id: "ALT-2049",
    title: "Cyclone ARNAV — Landfall imminent",
    description:
      "Severe cyclonic storm expected to make landfall within 6 hours. Wind speeds 130-150 km/h. Coastal residents must evacuate to designated shelters immediately.",
    location: "Mumbai Coastal Belt, MH",
    coords: { x: 28, y: 58 },
    timestamp: m(4),
    severity: "high",
    sources: ["Weather Dept.", "Disaster Mgmt.", "Government"],
    status: "verified",
    category: "Cyclone",
  },
  {
    id: "ALT-2048",
    title: "Flash Flood Warning — Yamuna basin",
    description:
      "Water levels rising 0.4m/hr. Low-lying areas in sectors 12-18 to be cleared. Avoid underpasses and riverbank roads.",
    location: "Delhi NCR",
    coords: { x: 48, y: 30 },
    timestamp: m(11),
    severity: "high",
    sources: ["Government", "Disaster Mgmt."],
    status: "verified",
    category: "Flood",
  },
  {
    id: "ALT-2047",
    title: "Industrial fire — Sector 9",
    description:
      "Chemical warehouse blaze. Plume drifting NE. Residents within 2km radius advised to shelter in place and seal windows.",
    location: "Pune Industrial Area",
    coords: { x: 35, y: 65 },
    timestamp: m(22),
    severity: "high",
    sources: ["Police", "Disaster Mgmt."],
    status: "verified",
    category: "Fire",
  },
  {
    id: "ALT-2046",
    title: "Heatwave advisory — IMD Orange",
    description:
      "Temperatures expected 44-46°C through Friday. Avoid outdoor activity 11:00-16:00. Hydrate frequently.",
    location: "Nagpur & surrounding districts",
    coords: { x: 55, y: 55 },
    timestamp: m(45),
    severity: "medium",
    sources: ["Weather Dept.", "Health Ministry"],
    status: "verified",
    category: "Heatwave",
  },
  {
    id: "ALT-2045",
    title: "Possible tremor reported — verifying",
    description:
      "Multiple unconfirmed reports of light tremors. Seismology center analyzing readings. Do not panic.",
    location: "Shillong, ML",
    coords: { x: 78, y: 38 },
    timestamp: m(7),
    severity: "medium",
    sources: ["Government"],
    status: "pending",
    category: "Earthquake",
  },
  {
    id: "ALT-2044",
    title: "Traffic accident — NH-48 km 142",
    description:
      "Multi-vehicle pileup, lane 1 & 2 blocked. Diversions in effect. Expect 40-60 min delays.",
    location: "NH-48, Gurugram",
    coords: { x: 46, y: 33 },
    timestamp: m(62),
    severity: "low",
    sources: ["Police"],
    status: "verified",
    category: "Traffic",
  },
  {
    id: "ALT-2043",
    title: "Air quality — hazardous (AQI 412)",
    description:
      "Severe pollution episode. Vulnerable groups to remain indoors. N95 masks recommended outdoors.",
    location: "Delhi NCR",
    coords: { x: 49, y: 31 },
    timestamp: m(95),
    severity: "medium",
    sources: ["Health Ministry", "Government"],
    status: "verified",
    category: "Health",
  },
  {
    id: "ALT-2042",
    title: "All-clear — coastal advisory lifted",
    description: "Sea conditions normalized. Fishermen may resume operations with caution.",
    location: "Goa coast",
    coords: { x: 30, y: 72 },
    timestamp: m(180),
    severity: "low",
    sources: ["Weather Dept.", "Government"],
    status: "verified",
    category: "Cyclone",
  },
];

export type SafePoint = {
  id: string;
  name: string;
  type: "Hospital" | "Police" | "Shelter";
  coords: { x: number; y: number };
};

export const safePoints: SafePoint[] = [
  { id: "h1", name: "City General Hospital", type: "Hospital", coords: { x: 32, y: 54 } },
  { id: "h2", name: "AIIMS Trauma Center", type: "Hospital", coords: { x: 50, y: 34 } },
  { id: "p1", name: "Central Police HQ", type: "Police", coords: { x: 45, y: 40 } },
  { id: "p2", name: "Coastal Police Stn.", type: "Police", coords: { x: 27, y: 60 } },
  { id: "s1", name: "Govt. Relief Shelter", type: "Shelter", coords: { x: 33, y: 50 } },
  { id: "s2", name: "Community Shelter NE", type: "Shelter", coords: { x: 75, y: 40 } },
];
