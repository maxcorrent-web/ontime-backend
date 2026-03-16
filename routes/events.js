const express = require('express');
const router = express.Router();
const axios = require('axios');
const ical = require('node-ical');

// Temporary in-memory personal events
let personalEvents = [
  { id: 1, title: "Personal Event Example", start: "2026-03-16T14:00:00", end: "2026-03-16T15:00:00", calendarType: "personal" }
];

// Example: Google Calendar public ICS link (replace with actual)
const googleCalendarURL = 'YOUR_GOOGLE_CALENDAR_PUBLIC_ICS_URL.ics';

// Fetch ICS events
async function fetchICSEvents(url, type) {
  try {
    const data = await ical.fromURL(url);
    const events = [];
    for (let k in data) {
      if (data[k].type === 'VEVENT') {
        events.push({
          title: data[k].summary,
          start: data[k].start,
          end: data[k].end,
          calendarType: type
        });
      }
    }
    return events;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// GET all events
router.get('/', async (req, res) => {
  const googleEvents = await fetchICSEvents(googleCalendarURL, 'google');
  const allEvents = [...personalEvents, ...googleEvents];
  res.json(allEvents);
});

// POST new personal event
router.post('/', (req, res) => {
  const newEvent = { ...req.body, id: personalEvents.length + 1 };
  personalEvents.push(newEvent);
  res.json(newEvent);
});

module.exports = router;
const ical = require('node-ical');

// POST /api/add-ics
router.post('/add-ics', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });
  try {
    const data = await ical.fromURL(url);
    const events = Object.values(data)
      .filter(e => e.type === 'VEVENT')
      .map(e => ({
        title: e.summary,
        start: e.start,
        end: e.end,
        calendarType: 'google'
      }));
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ICS URL" });
  }
});