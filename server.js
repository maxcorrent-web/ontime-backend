const express = require("express");
const cors = require("cors");
const ical = require("node-ical");

const app = express();
app.use(cors());
app.use(express.json());

let events = [];

// Clear events
app.post("/api/clear", (req, res) => {
  events = [];
  res.json({ success: true });
});

// Add ICS
app.post("/api/add-ics", async (req, res) => {
  const { url, source } = req.body;

  try {
    const data = await ical.async.fromURL(url);

    for (const key in data) {
      const ev = data[key];
      if (ev.type === "VEVENT") {
        events.push({
  title: ev.summary || "No Title",
  start: new Date(ev.start).toISOString(),
  end: ev.end
    ? new Date(ev.end).toISOString()
    : new Date(ev.start).toISOString(),
  source: source,
});
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load ICS" });
  }
});

// Get events
app.get("/api/events", (req, res) => {
  res.json(events);
});

app.listen(3001, () => console.log("Server running"));