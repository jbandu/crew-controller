import { motion, AnimatePresence } from 'framer-motion';
import VisualizationRouter from './VisualizationRouter';

const VisualizationPanel = ({ current, data, isAnimating }) => {
  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto"
        >
          <VisualizationRouter type={current} data={data} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VisualizationPanel;
