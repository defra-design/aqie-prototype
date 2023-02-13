module.exports = {
  // Area with low pollution
  moderate: {
    air_quality: {
      index: 4,
      pm2_5: 42.79,
      pm10: 14.50,
      o3: 35.80,
      no2: 27.10,
      so2: 5.23
    },
    monitor: {
      name: 'Preston Park, Brighton'
    },
    trend: 'above average'
  },

  // Area with high pollution
  high: {
    alerts: [{
      published: new Date().toISOString(),
      message: 'Air pollution is expected to reach high levels in parts of the South East, East, and in areas of the South West of England.'
    }],
    air_quality: {
      index: 7,
      pm2_5: 56.79,
      pm10: 61.50,
      o3: 101.80,
      no2: 27.10,
      so2: 5.23
    },
    monitor: {
      name: 'North end, Portsmouth'
    },
    trend: 'above average'
  },

  // Area with very high pollution
  'very-high': {
    alerts: [{
      published: new Date().toISOString(),
      message: 'Air pollution is expected to reach very high levels across London.'
    }],
    air_quality: {
      index: 10,
      pm2_5: 72.79,
      pm10: 51.50,
      o3: 89.80,
      no2: 17.10,
      so2: 5.23
    },
    monitor: {
      name: 'Horseguards parade'
    },
    trend: 'above average'
  }
}
