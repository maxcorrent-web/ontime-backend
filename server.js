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
        start: event.start,
        end: event.end,
      }));

    calendars.push(...events);

    res.json({ success: true });

  } catch (err) {
    console.error("ICS ERROR:", err.message);
    res.status(500).json({ error: "Failed to load calendar" });
  }
});