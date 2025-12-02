import { copaNetwork } from '../data/copaData';

const OPENWEATHER_API_KEY = '02b6b544113d2f4eb5bc0e2ee8b5a4c4';
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Weather condition severity levels
const SEVERITY = {
  CLEAR: 'clear',
  LIGHT: 'light',
  MODERATE: 'moderate',
  SEVERE: 'severe',
  CRITICAL: 'critical'
};

// Determine severity based on weather conditions
const analyzeSeverity = (weather) => {
  const condition = weather.weather[0].main.toLowerCase();
  const windSpeed = weather.wind?.speed || 0;
  const visibility = weather.visibility || 10000;
  const rain = weather.rain?.['1h'] || 0;

  // Critical conditions
  if (condition.includes('thunderstorm') || windSpeed > 15 || visibility < 1000) {
    return SEVERITY.CRITICAL;
  }

  // Severe conditions
  if (condition.includes('storm') || rain > 10 || windSpeed > 12) {
    return SEVERITY.SEVERE;
  }

  // Moderate conditions
  if (condition.includes('rain') || condition.includes('snow') || windSpeed > 8) {
    return SEVERITY.MODERATE;
  }

  // Light conditions
  if (condition.includes('clouds') || condition.includes('drizzle')) {
    return SEVERITY.LIGHT;
  }

  return SEVERITY.CLEAR;
};

// Get operational impact based on weather
const getOperationalImpact = (severity, weather) => {
  const impacts = {
    [SEVERITY.CRITICAL]: {
      delayProbability: 95,
      avgDelay: 90,
      operationalStatus: 'High Risk',
      recommendation: 'Consider pre-positioning reserves and alternative routing'
    },
    [SEVERITY.SEVERE]: {
      delayProbability: 75,
      avgDelay: 60,
      operationalStatus: 'Elevated Risk',
      recommendation: 'Monitor closely, prepare contingency plans'
    },
    [SEVERITY.MODERATE]: {
      delayProbability: 45,
      avgDelay: 30,
      operationalStatus: 'Moderate Risk',
      recommendation: 'Watch for deterioration'
    },
    [SEVERITY.LIGHT]: {
      delayProbability: 15,
      avgDelay: 10,
      operationalStatus: 'Low Risk',
      recommendation: 'Normal operations'
    },
    [SEVERITY.CLEAR]: {
      delayProbability: 5,
      avgDelay: 0,
      operationalStatus: 'Normal',
      recommendation: 'No action needed'
    }
  };

  return impacts[severity];
};

// Fetch weather for a specific location
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();

    const severity = analyzeSeverity(data);
    const impact = getOperationalImpact(severity, data);

    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: Math.round(data.wind?.speed * 1.94384), // Convert m/s to knots
      windDirection: data.wind?.deg,
      visibility: Math.round(data.visibility / 1609), // Convert m to miles
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      clouds: data.clouds?.all || 0,
      rain: data.rain?.['1h'] || 0,
      severity,
      ...impact,
      timestamp: new Date(data.dt * 1000)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return null;
  }
};

// Fetch weather for all Copa destinations
export const fetchNetworkWeather = async () => {
  try {
    // Fetch weather for hub
    const hubWeather = await fetchWeather(
      copaNetwork.hub.coords[1],
      copaNetwork.hub.coords[0]
    );

    // Fetch weather for all destinations
    const destinationWeather = await Promise.all(
      copaNetwork.destinations.map(async (dest) => {
        const weather = await fetchWeather(dest.coords[1], dest.coords[0]);
        return {
          code: dest.code,
          city: dest.city,
          weather
        };
      })
    );

    return {
      hub: {
        code: copaNetwork.hub.code,
        city: copaNetwork.hub.city,
        weather: hubWeather
      },
      destinations: destinationWeather,
      summary: generateNetworkSummary(hubWeather, destinationWeather)
    };
  } catch (error) {
    console.error('Error fetching network weather:', error);
    return null;
  }
};

// Generate summary of weather impact across network
const generateNetworkSummary = (hubWeather, destinationWeather) => {
  const allWeather = [hubWeather, ...destinationWeather.map(d => d.weather)].filter(Boolean);

  const criticalCount = allWeather.filter(w => w.severity === SEVERITY.CRITICAL).length;
  const severeCount = allWeather.filter(w => w.severity === SEVERITY.SEVERE).length;
  const moderateCount = allWeather.filter(w => w.severity === SEVERITY.MODERATE).length;

  const totalRisk = criticalCount + severeCount + moderateCount;
  const affectedStations = allWeather.filter(w =>
    [SEVERITY.CRITICAL, SEVERITY.SEVERE, SEVERITY.MODERATE].includes(w.severity)
  );

  // Estimate operational impact
  const estimatedDelays = affectedStations.reduce((sum, w) => sum + w.avgDelay, 0);
  const affectedFlights = totalRisk * 3; // Rough estimate: 3 flights per affected station
  const affectedCrew = affectedFlights * 8; // Average 8 crew per flight
  const costExposure = estimatedDelays * 2000; // $2K per delay minute (rough estimate)

  return {
    totalStations: allWeather.length,
    criticalStations: criticalCount,
    severeStations: severeCount,
    moderateStations: moderateCount,
    overallRisk: totalRisk > 3 ? 'HIGH' : totalRisk > 1 ? 'ELEVATED' : 'LOW',
    estimatedImpact: {
      affectedFlights,
      affectedCrew,
      totalDelayMinutes: estimatedDelays,
      costExposure: `$${Math.round(costExposure / 1000)}K`
    },
    recommendations: generateRecommendations(criticalCount, severeCount, hubWeather)
  };
};

// Generate operational recommendations based on weather
const generateRecommendations = (criticalCount, severeCount, hubWeather) => {
  const recommendations = [];

  if (hubWeather?.severity === SEVERITY.CRITICAL) {
    recommendations.push({
      priority: 'CRITICAL',
      action: 'Activate full reserve pool',
      reason: 'Hub experiencing critical weather conditions'
    });
  }

  if (criticalCount > 2) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Consider strategic flight cancellations',
      reason: `${criticalCount} stations with critical weather`
    });
  }

  if (severeCount > 3) {
    recommendations.push({
      priority: 'MEDIUM',
      action: 'Pre-position reserves at affected stations',
      reason: `${severeCount} stations with severe weather`
    });
  }

  if (hubWeather?.severity === SEVERITY.SEVERE || hubWeather?.severity === SEVERITY.CRITICAL) {
    recommendations.push({
      priority: 'HIGH',
      action: 'Review crew duty times for weather buffer',
      reason: 'Hub delays likely to cause crew legality issues'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      priority: 'INFO',
      action: 'Continue normal operations',
      reason: 'Weather conditions within normal parameters'
    });
  }

  return recommendations;
};

// Get weather forecast (5-day/3-hour)
export const fetchForecast = async (lat, lon) => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Forecast API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.list.slice(0, 8).map(item => ({ // Next 24 hours (8 x 3-hour periods)
      time: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].main,
      description: item.weather[0].description,
      windSpeed: Math.round(item.wind?.speed * 1.94384),
      rain: item.rain?.['3h'] || 0,
      severity: analyzeSeverity(item)
    }));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};
