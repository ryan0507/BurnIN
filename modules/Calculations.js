// Function to calculate Distance
export const calDistance = (lat1, lon1, lat2, lon2) => {
  console.log(lat1, lon1, lat2, lon2);
  const toRadian = angle => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (a - b);

  const RADIUS_OF_EARTH_IN_KM = 6371;
  const dLat = distance(lat2, lat1);
  const dLon = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.asin(Math.sqrt(a));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

  return finalDistance.toFixed(2);
};

export const calCalories = (weight, sec) => {
  let min = parseInt(sec / 60, 10);
  let cal = ((10 * 3.5 * weight * min) / 1000) * 5;
  return cal.toFixed(0);
};

export const calPace = (dist, time_seconds) => {
  if (dist <= 0) {
    return 0;
  }
  dist = parseFloat(dist);
  const time = secondsToHm(time_seconds);
  const mins = parseInt(time.substring(1, 3));
  const secs = parseInt(time.substring(3, 5));

  var timeElapsed = 0;
  timeElapsed += mins;
  timeElapsed += secs / 60;
  const pace = timeElapsed / dist;
  return pace;
};

export const secondsToHm = seconds => {
  var minutes = Math.floor((seconds % 3600) / 60);
  var second = Math.floor((seconds % 3600) % 60);

  return ('0' + minutes).slice(-2) + ':' + ('0' + second).slice(-2);
};

export const secondsToHourMinute = seconds => {
  const hour = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = Math.floor((seconds % 3600) % 60);
  return (
    ('0' + hour).slice(-2) +
    ':' +
    ('0' + minutes).slice(-2) +
    ':' +
    ('0' + second).slice(-2)
  );
};

export const secondsToPace = seconds => {
  var minutes = Math.floor((seconds % 3600) / 60);
  var second = Math.floor((seconds % 3600) % 60);
  const pace = minutes + "'" + second + '"';
  return pace;
};

export const pacePresentation = pace => {
  if (pace === 0) {
    return '0\'0" ';
  }
  const paceMins = Math.floor(pace);
  const paceSecs = (pace % 1).toFixed(1) * 60;
  pace = paceMins + "'" + paceSecs + '"';
  return pace;
};

export const getTimeOfDay = () => {
  var currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'Morning';
  } else if (currentHour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};
