import { useEffect, useState, useRef, useCallback } from 'react';
import { useChat } from '../../hooks/useChat';
import { useVisualization } from '../../hooks/useVisualization';
import Header from './Header';
import ChatPanel from './ChatPanel';
import VisualizationPanel from './VisualizationPanel';
import DemoControls from './DemoControls';

const CrewController = () => {
  const {
    messages,
    isTyping,
    sendMessage,
    triggerGreeting,
    triggerDisruption,
    selectOption,
    triggerShiftEnd,
    clearMessages,
    demoStep
  } = useChat();

  const { current, data, isAnimating, setVisualization } = useVisualization();

  // Resizable split pane state - load from localStorage or default to 50%
  const [splitPosition, setSplitPosition] = useState(() => {
    const saved = localStorage.getItem('crew-controller-split');
    return saved ? parseFloat(saved) : 50;
  });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Clear both messages and reset visualization to default
  const handleClear = () => {
    clearMessages();
    setVisualization('OperationsOverview', null);
  };

  // Update visualization when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.visualization) {
        setVisualization(lastMessage.visualization, lastMessage.data);
      }
    }
  }, [messages, setVisualization]);

  // Save split position to localStorage
  useEffect(() => {
    localStorage.setItem('crew-controller-split', splitPosition.toString());
  }, [splitPosition]);

  // Handle divider drag
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;

    // Constrain between 20% and 80% for usability
    const constrainedPosition = Math.max(20, Math.min(80, newPosition));
    setSplitPosition(constrainedPosition);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header controller="Ilango" hub="PTY" date="December 1, 2025" />

      <div ref={containerRef} className="flex-1 flex overflow-hidden relative">
        {/* Chat Panel - Resizable */}
        <div
          className="h-full border-r border-white/10 transition-none"
          style={{
            width: `${splitPosition}%`,
            minWidth: '300px',
            maxWidth: '80%'
          }}
        >
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            onSendMessage={sendMessage}
            onSelectOption={selectOption}
            onClear={handleClear}
          />
        </div>

        {/* Draggable Divider */}
        <div
          className={`
            relative w-1 cursor-col-resize group flex-shrink-0
            ${isDragging ? 'bg-accent-blue' : 'hover:bg-accent-blue/50'}
            transition-colors
          `}
          onMouseDown={handleMouseDown}
        >
          {/* Larger hit area for easier grabbing */}
          <div className="absolute inset-y-0 -left-2 -right-2 z-10" />

          {/* Visual indicator */}
          <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            flex flex-col gap-1 pointer-events-none
            opacity-0 group-hover:opacity-100 transition-opacity
            ${isDragging ? 'opacity-100' : ''}
          `}>
            <div className="w-1 h-8 bg-accent-blue rounded-full shadow-lg" />
            <div className="w-1 h-1 bg-accent-blue rounded-full" />
            <div className="w-1 h-1 bg-accent-blue rounded-full" />
            <div className="w-1 h-1 bg-accent-blue rounded-full" />
            <div className="w-1 h-8 bg-accent-blue rounded-full shadow-lg" />
          </div>

          {/* Split position indicator tooltip */}
          {isDragging && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-accent-blue text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">
              {Math.round(splitPosition)}% / {Math.round(100 - splitPosition)}%
            </div>
          )}
        </div>

        {/* Visualization Panel - Takes remaining space */}
        <div className="flex-1 h-full overflow-hidden" style={{ minWidth: '300px' }}>
          <VisualizationPanel
            current={current}
            data={data}
            isAnimating={isAnimating}
          />
        </div>
      </div>

      <DemoControls
        onTriggerGreeting={triggerGreeting}
        onTriggerDisruption={triggerDisruption}
        onTriggerShiftEnd={triggerShiftEnd}
      />
    </div>
  );
};

export default CrewController;
