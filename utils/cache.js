let cache = {
  data: null,
  timestamp: null
};

const ONE_HOUR = 60 * 60 * 1000;

function getCache() {
  if (!cache.timestamp) return null;

  const now = Date.now();

  if (now - cache.timestamp < ONE_HOUR) {
    return cache.data;
  }

  return null;
}

function setCache(data) {
  cache.data = data;
  cache.timestamp = Date.now();
}

module.exports = { getCache, setCache };