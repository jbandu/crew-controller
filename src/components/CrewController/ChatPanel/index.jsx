import { useRef, useEffect } from 'react';
import UserMessage from './messages/UserMessage';
import AIGreeting from './messages/AIGreeting';
import AIAlert from './messages/AIAlert';
import AIAnalysis from './messages/AIAnalysis';
import AIOptions from './messages/AIOptions';
import AIConfirmation from './messages/AIConfirmation';
import SuggestedQuestions from './SuggestedQuestions';
import InputBar from './InputBar';

const MessageRenderer = ({ message, onSelectOption }) => {
  switch (message.type) {
    case 'user':
      return <UserMessage content={message.content} timestamp={message.timestamp} />;
    case 'ai-greeting':
      return <AIGreeting content={message.content} timestamp={message.timestamp} />;
    case 'ai-alert':
      return (
        <>
          <AIAlert
            title={message.title}
            severity={message.severity}
            content={message.content}
            timestamp={message.timestamp}
          />
          {message.options && (
            <AIOptions options={message.options} onSelectOption={onSelectOption} />
          )}
        </>
      );
    case 'ai-analysis':
      return (
        <AIAnalysis
          content={message.content}
          timestamp={message.timestamp}
          actions={message.actions}
        />
      );
    case 'ai-confirmation':
      return (
        <AIConfirmation
          content={message.content}
          timestamp={message.timestamp}
          actions={message.actions}
        />
      );
    default:
      return null;
  }
};

const ChatPanel = ({ messages, isTyping, onSendMessage, onSelectOption }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionSelect = (question) => {
    onSendMessage(question.full);
  };

  return (
    <div className="flex flex-col h-full bg-bg-secondary">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-text-muted text-center">
            <div>
              <p className="mb-2">Welcome to Crew Controller 4.0</p>
              <p className="text-sm">Press <kbd className="px-2 py-1 bg-bg-elevated rounded">Ctrl+D</kbd> to open demo controls</p>
            </div>
          </div>
        )}
        {messages.map((message) => (
          <MessageRenderer
            key={message.id}
            message={message}
            onSelectOption={onSelectOption}
          />
        ))}
        {isTyping && (
          <div className="flex gap-3 mb-6">
            <div className="w-10 h-10 bg-accent-blue rounded-full flex items-center justify-center">
              🤖
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <SuggestedQuestions onSelect={handleQuestionSelect} />
      <InputBar onSend={onSendMessage} disabled={isTyping} />
    </div>
  );
};

export default ChatPanel;
