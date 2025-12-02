import { motion } from 'framer-motion';

const MetricCard = ({ icon, value, label, subtext, trend, index }) => {
  return (
    <motion.div
      className="bg-bg-card border border-white/10 rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-xs font-semibold ${trend < 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend < 0 ? '↓' : '↑'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-text-secondary">{label}</div>
      {subtext && <div className="text-xs text-text-muted mt-1">{subtext}</div>}
    </motion.div>
  );
};

export default MetricCard;
