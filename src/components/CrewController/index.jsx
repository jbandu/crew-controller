import { useEffect } from 'react';
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
    demoStep
  } = useChat();

  const { current, data, isAnimating, setVisualization } = useVisualization();

  // Update visualization when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.visualization) {
        setVisualization(lastMessage.visualization, lastMessage.data);
      }
    }
  }, [messages, setVisualization]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header controller="Ilango" hub="PTY" date="December 1, 2025" />

      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel - 40% */}
        <div className="w-2/5 min-w-[380px] border-r border-white/10">
          <ChatPanel
            messages={messages}
            isTyping={isTyping}
            onSendMessage={sendMessage}
            onSelectOption={selectOption}
          />
        </div>

        {/* Visualization Panel - 60% */}
        <div className="flex-1">
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
