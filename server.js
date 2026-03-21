import express from "express";
import cors from "cors";
import axios from "axios";
import ical from "node-ical";

const app = express();
app.use(cors());
app.use(express.json());

let calendars = [];

app.post("/api/add-ics", async (req, res) => {
  try {
    const { url } = req.body;
let source = "other";
if (url.includes("schoology")) source = "schoology";
if (url.includes("band")) source = "band";
if (url.includes("google")) source = "google";
    console.log("Fetching ICS from:", url);

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const data = ical.parseICS(response.data);

    const events = Object.values(data)
      .filter(event => event.type === "VEVENT")
      .map(event => ({
  title: event.summary || "No Title",
  start: new Date(event.start).toISOString(),
  end: event.end
    ? new Date(event.end).toISOString()
    : new Date(event.start).toISOString(),
  source,
}));

// Remove duplicates
const uniqueEvents = [];
const seen = new Set();

for (const ev of events) {
  const key = ev.title + ev.start;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueEvents.push(ev);
  }
}

calendars.push(...uniqueEvents);
      }));

    calendars.push(...events);

    res.json({ success: true });

  } catch (err) {
    console.error("ICS ERROR:", err.message);
    res.status(500).json({ error: "Failed to load calendar" });
  }
});