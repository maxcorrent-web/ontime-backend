import express from "express";
import axios from "axios";
import cors from "cors";
import ical from "ical";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let calendars = [];

// Add a new ICS calendar
app.post("/api/add-ics", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  calendars.push(url);

  res.json({ message: "Calendar added", calendars });
});

// Get merged events
app.get("/api/events", async (req, res) => {
  try {
    let allEvents = [];

    for (const url of calendars) {
      const response = await axios.get(url);
      const parsed = ical.parseICS(response.data);

      for (const k in parsed) {
        const event = parsed[k];

        if (event.type === "VEVENT") {
          allEvents.push({
            title: event.summary,
            start: event.start,
            end: event.end
          });
        }
      }
    }

    res.json(allEvents);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.get("/", (req, res) => {
  res.send("On Time Backend Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});