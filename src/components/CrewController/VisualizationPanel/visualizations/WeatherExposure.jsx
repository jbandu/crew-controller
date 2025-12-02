import Badge from '../../shared/Badge';

const WeatherExposure = () => {
  const exposedFlights = [
    { flight: 'CM 208', route: 'PTY → GRU', crew: 8, risk: 'High', delay: '45+ min' },
    { flight: 'CM 487', route: 'PTY → BOG', crew: 8, risk: 'Medium', delay: '30+ min' },
    { flight: 'CM 156', route: 'PTY → MIA', crew: 6, risk: 'Medium', delay: '20+ min' },
    { flight: 'CM 892', route: 'MIA → PTY', crew: 8, risk: 'Low', delay: '15+ min' }
  ];

  const getRiskBadge = (risk) => {
    const variants = {
      High: 'error',
      Medium: 'warning',
      Low: 'info'
    };
    return <Badge variant={variants[risk]}>{risk}</Badge>;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Weather Exposure Analysis</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="text-3xl font-bold text-red-400 mb-1">23</div>
          <div className="text-sm text-text-secondary">Flights at Risk</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-400 mb-1">67</div>
          <div className="text-sm text-text-secondary">Crew Affected</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-400 mb-1">$340K</div>
          <div className="text-sm text-text-secondary">Potential Exposure</div>
        </div>
      </div>

      <div className="bg-bg-card border border-white/10 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Most Vulnerable Flights</h3>
        <div className="space-y-3">
          {exposedFlights.map((flight) => (
            <div
              key={flight.flight}
              className="flex items-center justify-between p-3 bg-bg-elevated rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-white">{flight.flight}</span>
                  {getRiskBadge(flight.risk)}
                </div>
                <div className="text-sm text-text-secondary">{flight.route}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-muted">{flight.crew} crew</div>
                <div className="text-xs text-text-muted">{flight.delay}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="text-white font-semibold mb-1">Recommendation</h4>
            <p className="text-text-secondary text-sm">
              Pre-position F/O Santos (Reserve) at PTY now. CM 208 has highest risk of crew legality issue if delayed &gt;45 min.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherExposure;
