import { useState, useCallback } from 'react';
import { demoMessages } from '../data/demoScenarios';

const getResponseForInput = (content, demoStep) => {
  const lowerContent = content.toLowerCase();

  // Handle weather question
  if (lowerContent.includes('weather') || lowerContent.includes('exposure')) {
    return demoMessages.weatherResponse;
  }

  // Handle other questions with generic response
  return {
    type: 'ai-analysis',
    content: `Analyzing your request...

This is a demo response. In production, I would provide real-time analysis based on current operations data.`,
    visualization: 'OperationsOverview'
  };
};

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState('init');

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random(), timestamp: new Date() }]);
  }, []);

  const sendMessage = useCallback(async (content) => {
    // Add user message
    addMessage({ type: 'user', content });
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Get pre-scripted response based on demo flow
    const response = getResponseForInput(content, demoStep);
    addMessage(response);
    setIsTyping(false);

    return response;
  }, [addMessage, demoStep]);

  const triggerGreeting = useCallback(() => {
    addMessage(demoMessages.greeting);
    setDemoStep('greeting');
  }, [addMessage]);

  const triggerDisruption = useCallback(() => {
    addMessage(demoMessages.disruptionAlert);
    setDemoStep('disruption');
  }, [addMessage]);

  const selectOption = useCallback((option) => {
    addMessage({ type: 'user', content: `[Selected: ${option.label}]` });
    setIsTyping(true);

    setTimeout(() => {
      addMessage(demoMessages.resolution);
      setIsTyping(false);
      setDemoStep('resolved');
    }, 1500);
  }, [addMessage]);

  const triggerShiftEnd = useCallback(() => {
    addMessage(demoMessages.shiftEnd);
    setDemoStep('shiftEnd');
  }, [addMessage]);

  return {
    messages,
    isTyping,
    sendMessage,
    triggerGreeting,
    triggerDisruption,
    selectOption,
    triggerShiftEnd,
    demoStep
  };
};
