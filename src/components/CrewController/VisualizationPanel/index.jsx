import { motion, AnimatePresence } from 'framer-motion';
import VisualizationRouter from './VisualizationRouter';

const VisualizationPanel = ({ current, data, isAnimating }) => {
  // PTY coordinates: 9.0714, -79.3835
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // Mapbox static map centered on PTY (Panama City) - very subtle, zoomed out
  const mapBackground = mapboxToken
    ? `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-79.3835,9.0714,8,0/1200x800@2x?access_token=${mapboxToken}`
    : null;

  return (
    <div className="flex flex-col h-full bg-bg-primary overflow-hidden relative">
      {/* Subtle PTY map background - almost invisible */}
      {mapBackground && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url(${mapBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(1px)'
          }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 h-full min-h-0 overflow-y-auto relative z-10"
        >
          <VisualizationRouter type={current} data={data} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default VisualizationPanel;
