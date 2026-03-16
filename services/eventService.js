const fetchICS = require("./icsService");
const fetchSchoologyEvents = require("./schoologyService");

async function getAllEvents() {

  const bandICS = process.env.BAND_ICS;
  const remindICS = process.env.REMIND_ICS;

  const bandEvents = bandICS ? await fetchICS(bandICS, "band") : [];
  const remindEvents = remindICS ? await fetchICS(remindICS, "remind") : [];
  const schoologyEvents = await fetchSchoologyEvents();

  const allEvents = [
    ...bandEvents,
    ...remindEvents,
    ...schoologyEvents
  ];

  return allEvents;
}

module.exports = getAllEvents;