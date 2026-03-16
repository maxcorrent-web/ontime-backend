import express from "express";
import axios from "axios";
import cors from "cors";
import ical from "ical";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
import axios from "axios";

const fetchMergedCalendar = async () => {
  const res = await axios.post("http://localhost:5000/events", {
    icsUrl: "https://calendar.google.com/calendar/ical/YOURCALENDAR.ics",
    manualEventsInput: [
      { title: "My Event", start: "2026-03-16T14:00:00" },
    ],
  });

  console.log(res.data); // merged events
};
import path from "path";

// Serve frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});