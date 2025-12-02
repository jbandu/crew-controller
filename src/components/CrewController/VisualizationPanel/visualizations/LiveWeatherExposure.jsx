import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import Badge from '../../shared/Badge';
import { fetchNetworkWeather } from '../../../../services/weatherService';

const LiveWeatherExposure = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const loadWeather = async () => {
    setLoading(true);
    const data = await fetchNetworkWeather();
    setWeatherData(data);
    setLastUpdate(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
    // Refresh every 10 minutes
    const interval = setInterval(loadWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityBadge = (severity) => {
    const variants = {
      critical: 'error',
      severe: 'error',
      moderate: 'warning',
      light: 'info',
      clear: 'success'
    };
    return <Badge variant={variants[severity] || 'default'}>{severity?.toUpperCase()}</Badge>;
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading && !weatherData) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-blue mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading live weather data...</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load weather data</p>
          <button
            onClick={loadWeather}
            className="px-4 py-2 bg-accent-blue hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { hub, destinations, summary } = weatherData;

  return (
    <div className="p-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Live Weather Exposure</h2>
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span className="text-xs text-text-muted">
              Updated: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={loadWeather}
            disabled={loading}
            className="p-2 hover:bg-bg-elevated rounded-lg transition-colors disabled:opacity-50"
            title="Refresh weather data"
          >
            <RefreshCw size={18} className={`text-text-secondary ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Network Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className={`rounded-lg p-4 border ${summary.overallRisk === 'HIGH' ? 'bg-red-500/10 border-red-500/30' : summary.overallRisk === 'ELEVATED' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-green-500/10 border-green-500/30'}`}>
          <div className="text-3xl font-bold mb-1" style={{ color: summary.overallRisk === 'HIGH' ? '#ef4444' : summary.overallRisk === 'ELEVATED' ? '#f97316' : '#10b981' }}>
            {summary.overallRisk}
          </div>
          <div className="text-sm text-text-secondary">Network Risk Level</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-400 mb-1">{summary.estimatedImpact.affectedFlights}</div>
          <div className="text-sm text-text-secondary">Flights at Risk</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-400 mb-1">{summary.estimatedImpact.costExposure}</div>
          <div className="text-sm text-text-secondary">Cost Exposure</div>
        </div>
      </div>

      {/* Hub Weather */}
      {hub?.weather && (
        <div className="bg-bg-card border border-white/10 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">PTY Hub - {hub.city}</h3>
              {getSeverityBadge(hub.weather.severity)}
            </div>
            <img src={getWeatherIcon(hub.weather.icon)} alt="weather" className="w-16 h-16" />
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-2xl font-bold text-white">{hub.weather.temperature}°C</div>
              <div className="text-xs text-text-muted">Temperature</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{hub.weather.windSpeed} kt</div>
              <div className="text-xs text-text-muted">Wind</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{hub.weather.visibility} mi</div>
              <div className="text-xs text-text-muted">Visibility</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{hub.weather.humidity}%</div>
              <div className="text-xs text-text-muted">Humidity</div>
            </div>
          </div>
          <div className="bg-bg-elevated rounded-lg p-3">
            <div className="text-sm text-text-secondary mb-1">Operational Status</div>
            <div className="text-white font-semibold">{hub.weather.operationalStatus}</div>
            <div className="text-xs text-text-muted mt-2">{hub.weather.recommendation}</div>
          </div>
        </div>
      )}

      {/* Affected Destinations */}
      {summary.criticalStations + summary.severeStations + summary.moderateStations > 0 && (
        <div className="bg-bg-card border border-white/10 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Affected Destinations</h3>
          <div className="space-y-3">
            {destinations
              .filter(d => d.weather && ['critical', 'severe', 'moderate'].includes(d.weather.severity))
              .sort((a, b) => {
                const severityOrder = { critical: 0, severe: 1, moderate: 2 };
                return severityOrder[a.weather.severity] - severityOrder[b.weather.severity];
              })
              .map((dest) => (
                <div
                  key={dest.code}
                  className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img src={getWeatherIcon(dest.weather.icon)} alt="weather" className="w-12 h-12" />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-white">{dest.code}</span>
                        {getSeverityBadge(dest.weather.severity)}
                      </div>
                      <div className="text-sm text-text-secondary">{dest.city}</div>
                      <div className="text-xs text-text-muted capitalize">{dest.weather.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-text-muted">{dest.weather.delayProbability}% delay risk</div>
                    <div className="text-xs text-text-muted">Avg: {dest.weather.avgDelay} min</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {summary.recommendations && summary.recommendations.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">💡 Recommendations</h3>
          <div className="space-y-3">
            {summary.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Badge
                  variant={rec.priority === 'CRITICAL' ? 'error' : rec.priority === 'HIGH' ? 'warning' : 'info'}
                  size="sm"
                >
                  {rec.priority}
                </Badge>
                <div className="flex-1">
                  <div className="text-white font-semibold">{rec.action}</div>
                  <div className="text-sm text-text-muted">{rec.reason}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveWeatherExposure;
