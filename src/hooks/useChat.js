import { useState, useCallback } from 'react';
import { demoMessages } from '../data/demoScenarios';
import { sounds } from '../utils/sounds';

const getResponseForInput = (content, demoStep) => {
  const lowerContent = content.toLowerCase();

  // Handle live weather question
  if (lowerContent.includes('real-time weather') || lowerContent.includes('live weather')) {
    return {
      type: 'ai-analysis',
      content: `Fetching live weather data from OpenWeather API across Copa Airlines network...

This includes real-time conditions for PTY hub and all destinations, with operational impact analysis and recommendations.`,
      visualization: 'LiveWeatherExposure'
    };
  }

  // Handle weather exposure question
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
    sounds.notification();
    addMessage(demoMessages.greeting);
    setDemoStep('greeting');
  }, [addMessage]);

  const triggerDisruption = useCallback(() => {
    sounds.alert();
    addMessage(demoMessages.disruptionAlert);
    setDemoStep('disruption');
  }, [addMessage]);

  const selectOption = useCallback((option) => {
    sounds.message();
    addMessage({ type: 'user', content: `[Selected: ${option.label}]` });
    setIsTyping(true);

    setTimeout(() => {
      sounds.success();
      addMessage(demoMessages.resolution);
      setIsTyping(false);
      setDemoStep('resolved');
    }, 1500);
  }, [addMessage]);

  const triggerShiftEnd = useCallback(() => {
    sounds.notification();
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
