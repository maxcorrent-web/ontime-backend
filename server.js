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
const path = require('path');

// Serve frontend build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});