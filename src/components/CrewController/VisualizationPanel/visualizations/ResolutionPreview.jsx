import { motion } from 'framer-motion';
import Badge from '../../shared/Badge';

const ResolutionPreview = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Resolution Applied</h2>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Before */}
        <div className="bg-bg-card border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="error">Before</Badge>
            <span className="text-text-secondary text-sm">08:45</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-500/10 rounded">
              <div className="font-semibold text-white mb-1">CM 208 - PTY → GRU</div>
              <div className="text-sm text-text-secondary">F/O Alejandra Vega</div>
              <div className="text-xs text-red-400 mt-2">⚠️ Duty expires 14:30 - ILLEGAL</div>
            </div>
            <div className="text-xs text-text-muted">
              3 downstream flights at risk
            </div>
          </div>
        </div>

        {/* After */}
        <div className="bg-bg-card border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="success">After</Badge>
            <span className="text-text-secondary text-sm">09:02</span>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-500/10 rounded">
              <div className="font-semibold text-white mb-1">CM 208 - PTY → GRU</div>
              <div className="text-sm text-text-secondary">F/O Ricardo Santos</div>
              <div className="text-xs text-green-400 mt-2">✓ 10h duty remaining - LEGAL</div>
            </div>
            <div className="text-xs text-green-400">
              ✓ All downstream risks cleared
            </div>
          </div>
        </div>
      </div>

      {/* Cascade Impact */}
      <motion.div
        className="bg-green-500/10 border border-green-500/30 rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Cascade Impact</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <div className="text-white text-sm font-semibold">CM 892 buffer restored</div>
              <div className="text-text-muted text-xs">Connection time increased to 45 min</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <div className="text-white text-sm font-semibold">CM 156 connection secured</div>
              <div className="text-text-muted text-xs">Crew swap no longer needed</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400">✓</span>
            <div>
              <div className="text-white text-sm font-semibold">CM 801 crew swap avoided</div>
              <div className="text-text-muted text-xs">Saved $2.1K in operational costs</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Resolution Details */}
      <div className="mt-6 bg-bg-card border border-white/10 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-3">Resolution Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-text-muted">Response Time:</span>
            <span className="text-white ml-2 font-semibold">17 minutes</span>
          </div>
          <div>
            <span className="text-text-muted">Cost Impact:</span>
            <span className="text-white ml-2 font-semibold">$0</span>
          </div>
          <div>
            <span className="text-text-muted">Compliance:</span>
            <span className="text-green-400 ml-2 font-semibold">SIELAS §14.3</span>
          </div>
          <div>
            <span className="text-text-muted">Notifications:</span>
            <span className="text-white ml-2 font-semibold">3 sent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionPreview;
