function sortEvents(events) {
  return events.sort((a, b) => {
    return new Date(a.start) - new Date(b.start);
  });
}

module.exports = sortEvents;