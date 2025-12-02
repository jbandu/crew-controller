import { motion } from 'framer-motion';

const LearningMoment = ({ flight, humanAction, result, aiFeedback }) => {
  return (
    <motion.div
      className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.8 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">💡</span>
        <h3 className="text-lg font-semibold text-white">Learning Moment</h3>
      </div>
      <div className="space-y-3">
        <p className="text-text-primary">
          On <strong className="text-white">{flight}</strong>, you {humanAction}.
        </p>
        <p className="text-green-400 font-semibold">
          Good call — {result}.
        </p>
        <div className="bg-bg-elevated rounded-lg p-4 flex items-start gap-3">
          <span className="text-green-400 text-xl">✓</span>
          <p className="text-text-secondary text-sm flex-1">
            {aiFeedback}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LearningMoment;
