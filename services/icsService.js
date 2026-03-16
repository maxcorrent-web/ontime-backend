const ical = require("node-ical");
const axios = require("axios");

async function fetchICS(url, sourceName) {

  const response = await axios.get(url);

  const data = ical.sync.parseICS(response.data);

  const events = [];

  for (let key in data) {

    const event = data[key];

    if (event.type === "VEVENT") {

      events.push({
        id: key,
        title: event.summary,
        start: event.start,
        end: event.end,
        source: sourceName
      });

    }

  }

  return events;
}

module.exports = fetchICS;