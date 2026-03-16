function filterEvents(events, query) {

  let filtered = events;

  if (query.source) {
    filtered = filtered.filter(e => e.source === query.source);
  }

  if (query.start) {
    filtered = filtered.filter(e =>
      new Date(e.start) >= new Date(query.start)
    );
  }

  if (query.end) {
    filtered = filtered.filter(e =>
      new Date(e.end) <= new Date(query.end)
    );
  }

  return filtered;
}

module.exports = filterEvents;